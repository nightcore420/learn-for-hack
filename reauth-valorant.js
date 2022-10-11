const HttpsProxyAgent = require("https-proxy-agent");
const { createInterface } = require("readline");
const axios = require("axios").default;

// login credentials
const USERNAME = "Testing123";
const PASSWORD = "Testing123";

let tokens = new Object();
// built headers
let headers = new Object();

let ssidCookie = new String();
let clientVersion = new String();
let region = new String();

// standard input
let _stdin;
// initializes it if it's undefined
const stdin = () => {
  if (typeof _stdin === "undefined")
    _stdin = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  return _stdin;
};

// custom cipher suites for bypassing cloudflare

// custom signature algorithms is a better alternative but axios
// does not expose https options, it can still be achieved with
// custom adapter but it's overkill for this script
const ciphers = [
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_AES_128_GCM_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
];
// agent with custom cipher suites
const agent = new HttpsProxyAgent({
  ciphers: ciphers.join(":"),
  honorCipherOrder: true,
  minVersion: "TLSv1.2",
  host: "107.152.159.86",
  port: "3128",
});

// 2fa logic -> fetch from standard input aka console
const input2faCode = (login) =>
  new Promise((resolve) =>
    stdin().question(
      `You have 2fa enabled, please input the 2fa code (sent to ${login.multifactor.email}):`,
      (code) => resolve(code)
    )
  );

// parses the response url and returns the values we want
const parseUrl = (uri) => {
  const loginResponseURI = new URL(uri);
  const accessToken = loginResponseURI.searchParams.get("access_token");
  const idToken = loginResponseURI.searchParams.get("id_token");
  const expiresIn = parseInt(loginResponseURI.searchParams.get("expires_in"));

  return { accessToken, idToken, expiresIn };
};

// this object -> to json -> to base64 is the
// X-Riot-ClientPlatform header
const clientPlatform = {
  platformType: "PC",
  platformOS: "Windows",
  platformOSVersion: "10.0.19043.1.256.64bit",
  platformChipset: "Unknown",
};

// builds headers used by pvp endpoints
const makeHeaders = () => {
  headers = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "X-Riot-Entitlements-JWT": tokens.entitlementsToken,
    "X-Riot-ClientVersion": clientVersion,
    "X-Riot-ClientPlatform": Buffer.from(JSON.stringify(clientPlatform)).toString("base64"),
  };
};

// this is the first request in authflow and the endpoint
// which can be used for reauth
const createSession = (ssidCookie) =>
  axios({
    url: "https://auth.riotgames.com/api/v1/authorization",
    method: "POST",
    headers: {
      ...(typeof ssidCookie === "undefined" ? "" : { Cookie: ssidCookie }),
      "User-Agent": "RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)",
    },
    data: {
      client_id: "play-valorant-web-prod",
      nonce: 1,
      redirect_uri: "https://playvalorant.com/opt_in",
      response_type: "token id_token",
      // response params are returned as a query instead of hash
      // URL class can properly parse params this way
      response_mode: "query",
      // this gives us a bigger response on /userinfo + required
      // for auto detecting region
      scope: "account openid",
    },
    httpsAgent: agent,
  });

// either returns access token or sends out a 2fa email
const login = (cookie, username, password) =>
  axios({
    url: "https://auth.riotgames.com/api/v1/authorization",
    method: "PUT",
    headers: {
      Cookie: cookie,
      "User-Agent": "RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)",
    },
    data: {
      type: "auth",
      username,
      password,
    },
    httpsAgent: agent,
  });

// if 2fa is enabled, we can send the code this way
const send2faCode = (cookie, code, rememberDevice = true) =>
  axios({
    url: "https://auth.riotgames.com/api/v1/authorization",
    method: "PUT",
    headers: {
      Cookie: cookie,
      "User-Agent": "RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)",
    },
    data: {
      type: "multifactor",
      code,
      rememberDevice,
    },
    httpsAgent: agent,
  });

const fetchEntitlements = (accessToken) =>
  axios({
    url: "https://entitlements.auth.riotgames.com/api/token/v1",
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {},
  });

// pas token can be used for getting the account
// region automatically
const fetchPas = (accessToken, idToken) =>
  axios({
    url: "https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      id_token: idToken,
    },
  });

// the easiest way of getting the current client version
// apparently higher uptime than official api
const fetchValorantVersion = () =>
  axios({
    url: "https://valorant-api.com/v1/version",
    method: "GET",
  });

// actual reauth part
const setupReauth = async () => {
  // access token -> every 1h | id token -> every 24h
  setInterval(async () => {
    try {
      const response = await createSession(ssidCookie);

      ssidCookie = response.headers["set-cookie"].find((elem) => /^ssid/.test(elem));

      tokens = { ...tokens, ...parseUrl(response.data.response.parameters.uri) };
      makeHeaders();
    } catch (err) {
      console.trace(err);
    }
    // reauth 5 min early as then there is no downtime
  }, (tokens.expiresIn - 300) * 1000);
};

class ValReauthScriptError extends Error {
  data;

  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

(async function () {
  try {
    const session = await createSession();
    let asidCookie = session.headers["set-cookie"].find((cookie) => /^asid/.test(cookie));
    console.log("cookie", typeof asidCookie);
    // attempt to exchange username and password for an access token
    const loginResponse = await login(asidCookie, USERNAME, PASSWORD).catch((err) => {
      if (typeof err.response.data === "undefined")
        throw new ValReauthScriptError("unknown error", err.response);
      if (err.response.data.error === "rate_limited")
        throw new ValReauthScriptError("too many login attempts");
      throw new ValReauthScriptError("unknown error", err.response.data);
    });

    // auth failed - most likely incorrect login info
    if (typeof loginResponse.data.error !== "undefined") {
      console.dir(loginResponse.data);
      if (loginResponse.data.error === "auth_failure")
        throw new ValReauthScriptError("invalid login credentials");
      throw new ValReauthScriptError("unknown error", loginResponse.data);
    }

    asidCookie = loginResponse.headers["set-cookie"].find((cookie) => /^asid/.test(cookie));

    let response;

    // check if 2fa is enabled
    if (loginResponse.data.type === "response") response = loginResponse;

    // if it is ask for code
    while (typeof response === "undefined") {
      const inputCode = await input2faCode(loginResponse.data);
      const response2fa = await send2faCode(asidCookie, inputCode).catch((err) => {
        if (typeof err.response.data === "undefined")
          throw new ValReauthScriptError("unknown error", err.response);
        if (err.response.data.error === "rate_limited")
          throw new ValReauthScriptError("too many 2fa requests");
        throw new ValReauthScriptError("unknown error", err.response.data);
      });

      asidCookie = response2fa.headers["set-cookie"].find((cookie) => /^asid/.test(cookie));

      if (response2fa.data.type === "response") {
        response = response2fa;
        break;
      }
      // check response
      if (typeof response2fa.data.error !== "undefined") {
        if (response2fa.data.error === "multifactor_attempt_failed") continue;
        if (response2fa.data.error === "rate_limited")
          throw new ValReauthScriptError("too many 2fa requests");
        throw new ValReauthScriptError("unknown error", response2fa.data);
      }
    }

    // close handle
    stdin().close();

    // extract ssid cookie
    ssidCookie = response.headers["set-cookie"].find((cookie) => /^ssid/.test(cookie));

    // extract tokens from the url
    tokens = parseUrl(response.data.response.parameters.uri);

    tokens.entitlementsToken = (
      await fetchEntitlements(tokens.accessToken)
    ).data.entitlements_token;

    // parse access token and extract puuid
    const puuid = JSON.parse(
      Buffer.from(tokens.accessToken.split(".")[1], "base64").toString()
    ).sub;

    // fetch pas token - not required, instead we only want the region
    // since we already fetched it let's save it, because why not
    const pasTokenResponse = await fetchPas(tokens.accessToken, tokens.idToken);
    tokens.pasToken = pasTokenResponse.data.token;

    region = pasTokenResponse.data.affinities.live;

    clientVersion = (await fetchValorantVersion()).data.data.riotClientVersion;

    makeHeaders();
    setupReauth();

    console.log({ ...headers, puuid, region });
  } catch (err) {
    // close handle
    stdin().close();
    throw err;
  }
})();
