import mysql from "mysql2";

const port = 3306;

const poolConfig = {
	connectionLimit : 10,
	// host: "127.0.0.1",
	host: "localhost",
	// localhost - default, можно не указывать
	// localhost = 127.0.0.1
	port,
	//3306 - default, можно не указывать
	// port: "",
	user: "root",
	password: "",
	database: "booksdb",
	// connectTimeout: 5000
};

const pool  = mysql.createPool(poolConfig);

const promisePool = pool.promise();

export default promisePool;
