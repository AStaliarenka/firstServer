export default {
	DB: {
		USERS: {
			NAME: "users",
			COLUMNS: {
				ROLE_ID: "id_role",
				PASSWORD: "password",
				LOGIN: "login",
				USER_ID: "id_user"
			},
			ROLES: {
				READER: 2,
				LIBRARIAN: 3,
				ADMIN: 1,
			},
		},
		BOOKS: {
			NAME: "books",
			COLUMNS: {
				ID: "id_book",
				ID_AUTHOR: "id_author"
			}
		},
		BOOKS_GENRE: {
			NAME: "books_genre",
			COLUMNS: {
				ID_GENRE: "id_genre"
			}
		},
		GENRES: {
			NAME: "genres"
		},
		USERS_INFO: {
			NAME: "users_info",
			COLUMNS: {
				USER_ID: "id_user",
				FIRST_NAME: "first_name",
				LAST_NAME: "last_name",
				THIRD_NAME: "third_name",
				PASSPORT: "passport_number",
				BIRTH_DAY: "birthday",
				ADRESS: "address",
				CARD_ID: "card_id",
				PHONE_1: "phone_1",
				PHONE_2: "phone_2",
				PHONE_3: "phone_3",
				PHONE_4: "phone_4"		
			}
		},
		AUTHORS: {
			NAME: "authors",
			COLUMNS: {
				ID: "id_author",
				FIRST_NAME: "first_name",
				LAST_NAME: "last_name"
			}
		}
	},
	TOKEN_NAMES: {
		ACCESS_TOKEN: "access_token"
	},
	serverMessages: {
		401: "Unauthorized",
		403: "Access denied"
	}
};
