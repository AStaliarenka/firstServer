import booksRepository from "./books.repository";

const modifyBooksData = (books) => {
	if (books.length) {
		return books.map((book) => {
			return {
				...book,
				author: `${book.first_name} ${book.last_name}`
			};
		});
	}
	else {
		return [];
	}	
};

class booksController {
	async addNewBook(req, res) {
		try {
			// TODO
		} catch (e) {
			console.log(e);
			res.status(400).json({message: "add new book error"});
		}
	}

	async getBooks(req, res) {
		try {
			const books = await booksRepository.getAllBooks();

			if (books[0].length) {
				res.json(modifyBooksData(books[0]));
			}
			else {
				res.status(400).json({
					message: "get books error",
				});
			}		
		} catch (e) {
			console.log(e);

			res.status(400).json({
				message: "get books error",
			});
		}
	}

	async getBookGenres(req, res) {
		try {
			const bookGenres = await booksRepository.getBookGenres();

			if (bookGenres[0].length) {
				res.json(bookGenres[0]);
			}
			else {
				res.status(400).json({
					message: "get genres error",
				});
			}		
		} catch (e) {
			console.log(e);

			res.status(400).json({
				message: "get genres error",
			});
		}
	}
}

export default new booksController();