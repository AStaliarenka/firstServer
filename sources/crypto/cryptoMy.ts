const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

const cipherData = fs.readFileSync(`${__dirname}/key.json`);
const { key, algorithm } = JSON.parse(cipherData);

async function scryptHash(str, salt) {
	const saltInUse = salt || crypto.randomBytes(16).toString("hex");

	// promisify превращает функцию исп колбеки в функ на промисах
	const hashBuffer = await util.promisify(crypto.scrypt)(str, saltInUse, 32);

	// return `${hashBuffer.toString("hex")}:${saltInUse}`;
	return `${hashBuffer.toString("hex")}`;
}

async function scryptVerify(testString, hashAndSalt) {
	const [, salt] = hashAndSalt.split(":");

	return (await scryptHash(testString, salt)) === hashAndSalt;
}

export { scryptHash, key, scryptVerify };
