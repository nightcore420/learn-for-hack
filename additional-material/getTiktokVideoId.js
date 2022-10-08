const { default: axios } = require('axios')

/**
 * is tiktok video url?
 * @param {string} link 
 * @returns 
 */
async function isTiktokVideo(link) {
    const a = await axios.get(link)
    let url = new URL(a.request.res.responseUrl)
    return {
        isVideo: !isNaN(path.basename(url.pathname)),
        isUser: path.basename(url.pathname).startsWith('@'),
        url: url.origin + url.pathname,
        pathname: url.pathname
    }
}