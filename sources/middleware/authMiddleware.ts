import TokenService from "../modules/token/token.service";
import getCookie from "../helpers/usefulFunctions";
import constants from "../constants";

export default function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		const reqCookies = req.headers.cookie;

		if (!reqCookies) {
			res.status(400).json(false);
		}
		else {
			const token = getCookie(reqCookies, constants.TOKEN_NAMES.ACCESS_TOKEN);

			if (!token) {
				return res.status(403).json({ message: "Access denied" });
			}
	
			TokenService.getInfoFromToken(token);
	
			next();
		}	
	} catch (e) {
		console.log(e);
		return res.status(403).json({ message: "Access denied" });
	}
};
