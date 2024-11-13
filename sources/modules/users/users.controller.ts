import getCookie from "../../helpers/usefulFunctions";
import constants from "../../constants";
import TokenService from "../token/token.service";
import usersRepository from "./users.repository";

class UsersController {
	async getUserInfo(req, res): Promise<void> {
		try {
			const reqCookies = req.headers.cookie;

			if (!reqCookies) {
				res.status(400);
			}
			else {
				const token = getCookie(reqCookies, constants.TOKEN_NAMES.ACCESS_TOKEN);
	
				if (token) {
					const tokenInfo = TokenService.getInfoFromToken(token);

					const [rows, fields] = await usersRepository.getUserInfoById(tokenInfo.id);
					
					if (rows.length) {
						res.status(200).json(rows[0]);
					}
				}
				else res.status(400);
			}
		}
		catch(e) {
			console.log(e);
		}
	}

	async updateUserInfo(req, res): Promise<void>  {
		try {
			const reqCookies = req.headers.cookie;

			if (!reqCookies) {
				res.status(400);
			}
			else {
				const token = getCookie(reqCookies, constants.TOKEN_NAMES.ACCESS_TOKEN);
	
				if (token) {
					const tokenInfo = TokenService.getInfoFromToken(token);
					const userInfo = req.body;

					const [resultSetHeader, fields] = await usersRepository.updateUserInfo(userInfo, tokenInfo.id);
					
					if (resultSetHeader.changedRows > 0) {
						res.status(200).send();
					}
				}
				else res.status(400);
			}
		}
		catch(e) {
			console.log(e);
			res.status(400);
		}
	}

	async getAllUsers(req, res): Promise<void>  {
		try {
			const [usersRows, fields] = await usersRepository.getUsers();

			if (usersRows.length) { /* TODO: change condition*/
				res.status(200).json(usersRows);
			}
		}
		catch(e) {
			console.log(e);
			res.status(400);
		}
	}

	async addNewUser(req, res): Promise<void>  {
		try {
			// TODO
		}
		catch(e) {
			console.log(e);
			res.status(500);
		}
	}
}

export default new UsersController();
