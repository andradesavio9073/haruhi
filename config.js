const isProd = process.env.NODE_ENV === "production" ? true : false;
export const AnilistClientID = 9465;
export const SERVER = isProd ? "http://haruhi.flamindemigod.com:3000" : "http://haruhi.flamindemigod.com:8080" 