const IMGS = {
    liked: 'https://misc.scdn.co/liked-songs/liked-songs-64.png',
}

function getImg(name) {
    return IMGS[name]
}

export const imgService = {
    getImg
}