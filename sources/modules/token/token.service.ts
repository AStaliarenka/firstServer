import jwt from "jsonwebtoken";
import config from "../../config";

interface myJwtPayload extends jwt.JwtPayload {
	id: number,
	role: number
}

export default class TokenService {
	static generateAccessToken(id: number, role: number) {
		const payload = {
			id,
			role, /* 1 role */
		};
		return jwt.sign(payload, config.SECRET, { expiresIn: "24h" });
	}

	static getInfoFromToken(token: string) {
		try {
			const tokenInfo = jwt.verify(token, config.SECRET) as myJwtPayload;
			return tokenInfo;
		}
		catch(e: any | jwt.VerifyErrors) {
			if (e.expiredAt | e.inner | e.date) {
				throw({isTokenError: true, message: e.message});
			}
			
			throw(e);
		}
	}
}
