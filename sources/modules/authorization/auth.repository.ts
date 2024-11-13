import constants from "../../constants";
import promisePool from "../../settings/db";
import { ResultSetHeader } from "mysql2";

import { userInfo, userInfoWithCreds } from "../interfaces/user";

const DB = constants.DB;
interface newUserInfo {
	first_name: string,
	third_name?: string | null,
	last_name: string,
	passport_number: number,
	birthday?: string,
	adress?: string,
	phone_1?: string | null,
	phone_2?: string | null,
	phone_3?: string | null,
	phone_4?: string | null,
	login: string,
	password: string,
	id_role: number
}

interface userCredentials {
	id_user: number,
	login: string,
	password: string,
	id_role: number
}

class AuthorizationRepository {
	async getUserByLogin(login: string): Promise<[userCredentials[] | [], any[]]> {
		return promisePool.query(`
			SELECT *
			FROM ${DB.USERS.NAME}
			WHERE ${DB.USERS.COLUMNS.LOGIN} = '${login}'
		`);
	}

	async getAllUsers(): Promise<[userInfoWithCreds[] | [], any[]]> {
		return promisePool.query(`
			SELECT usersCreds.*, usersInfo.*
			FROM ${DB.USERS.NAME} AS usersCreds
			LEFT JOIN ${DB.USERS_INFO.NAME} AS usersInfo
			ON usersCreds.${DB.USERS.COLUMNS.USER_ID} = usersInfo.${DB.USERS_INFO.COLUMNS.USER_ID}
		`);
	}

	async getUserById(userId: number): Promise<[userInfo[] | [], any[]]> {
		return promisePool.query(`
			SELECT *
			FROM ${DB.USERS_INFO.NAME}
			WHERE ${DB.USERS.COLUMNS.USER_ID} = '${userId}'
		`);
	}

	async addNewUser(userData: newUserInfo): Promise<number | null> {
		const {login, password, id_role, ...restUserInfo} = userData;
		const newUser = await promisePool.query(`
			INSERT INTO ${DB.USERS.NAME}
			(${DB.USERS.COLUMNS.LOGIN}, ${DB.USERS.COLUMNS.PASSWORD}, ${DB.USERS.COLUMNS.ROLE_ID})
			VALUES('${login}', '${password}', '${id_role}')
		`) as [ResultSetHeader, any];

		const newUserId = newUser ? newUser[0]?.insertId : null;

		if (newUserId) {
			const userInfo = {...restUserInfo, id_user: newUserId};
			const keys = Object.keys(userInfo);
			const values = Object.values(userInfo);

			const colNamesStr = `${keys.join(', ')}`;
			const valuesStr = `'${values.join("', '")}'`;

			try {
				const userInfoRes = await promisePool.query(`
					INSERT INTO ${DB.USERS_INFO.NAME}
					(${colNamesStr})
					VALUES(${valuesStr})
				`);

				if (userInfoRes && Number.isInteger(userInfoRes[0]?.insertId)) {
					return newUserId;
				}
			}
			catch(e) {
				promisePool.query(`
					DELETE FROM ${DB.USERS.NAME}
					WHERE ${DB.USERS.NAME}.${DB.USERS.COLUMNS.USER_ID} = ${newUserId}
				`);
				throw(e);
			}	
		}

		return null;
	}
}

export default new AuthorizationRepository();