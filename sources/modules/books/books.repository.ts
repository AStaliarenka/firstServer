import promisePool from "../../settings/db";
import constants from "../../constants";
const dbNames = constants.DB;

class BooksRepository {
	async getAllBooks() {
		return promisePool.query(`
			SELECT books.*, authors.*, GROUP_CONCAT(genre.${dbNames.BOOKS_GENRE.COLUMNS.ID_GENRE}) AS 'genres'
			FROM ${dbNames.BOOKS.NAME} AS books
			LEFT JOIN ${dbNames.AUTHORS.NAME} AS authors
			ON books.${dbNames.BOOKS.COLUMNS.ID_AUTHOR} = authors.${dbNames.AUTHORS.COLUMNS.ID}
			LEFT JOIN ${dbNames.BOOKS_GENRE.NAME} AS genre
			ON books.${dbNames.BOOKS.COLUMNS.ID} = genre.id_book
			GROUP BY books.${dbNames.BOOKS.COLUMNS.ID}
		`);
	}

	async getBookGenres() {
		return promisePool.query(`
			SELECT *
			FROM ${dbNames.GENRES.NAME}
		`);
	}
}

export default new BooksRepository();