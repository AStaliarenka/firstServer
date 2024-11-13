import TokenService from "../modules/token/token.service";
import getCookie from "../helpers/usefulFunctions";
import constants from "../constants";

const serverMessages = constants.serverMessages;

export default function (roles) {
	return function(req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}
	
		try {
			const token = getCookie(req.headers.cookie, constants.TOKEN_NAMES.ACCESS_TOKEN);

			if (!token) {
				return res.status(401).json({message: serverMessages[401]})
			}
	
			const {role} = TokenService.getInfoFromToken(token);
			const hasRole = roles.includes(role);

			if (!hasRole) {
				return res.status(403).json({message: serverMessages[403]});
			}

			next();
		} catch (e) {
			console.log(e);
			return res.status(401).json({message: serverMessages[401]});
		}
	}
};