// Ultraviolet configuration for CocoX.wtf Browser.
self.__uv$config = {
  prefix: "/service/",
  bare: "/wisp/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.sw.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv.config.js",
};
