const Mycrypto = require("crypto");
const Myfs = require("fs");

const myKey = Mycrypto.randomBytes(16).toString("hex");
const algorithm = "aes256";

Myfs.writeFileSync(`${__dirname}/key.json`, JSON.stringify({myKey, algorithm}));
