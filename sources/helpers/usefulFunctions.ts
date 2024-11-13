function getCookie(cookieObj: string, name: string): string | undefined {
	let cookie = {};

	cookieObj.split(";").forEach((el) => {
		let [k, v] = el.split("=");

		cookie[k.trim()] = v;
	});

	return cookie[name];
}

export default getCookie;
