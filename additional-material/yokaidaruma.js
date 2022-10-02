var settings = {
  "url": "https://www.yokaiswap.com/subgraphs/name/yokaiswap/exchange",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({
    query: "query pools {\n  now: pairs(where: {id_in: [\"0x268aaeed47d031751db1cbba50930fe2991f0ed0\"]}, orderBy: trackedReserveNative, orderDirection: desc) {\n    id\n    reserve0\n    reserve1\n    reserveUSD\n    volumeUSD\n    token0Price\n    token1Price\n    token0 {\n      id\n      symbol\n      name\n    }\n    token1 {\n      id\n      symbol\n      name\n    }\n  }\n}",
    variables: {}
  })
};

$.ajax(settings).done(function (response) {
  console.log(response);
});