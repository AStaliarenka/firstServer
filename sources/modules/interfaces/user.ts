interface userInfo {
	id_user: number,
	first_name: string,
	third_name: string | null,
	last_name: string,
	passport_number: number,
	birthday: string,
	adress: string,
	card_id: number | null,
	phone_1: string | null,
	phone_2: string | null,
	phone_3: string | null,
	phone_4: string | null,
}

interface userInfoWithCreds extends userInfo {
	login: string,
	password: string,
}

export {
	userInfo,
	userInfoWithCreds
};
