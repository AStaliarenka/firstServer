import { Router } from "express";
const router = Router();
import booksController from "./books.controller";

router.post("/addBook", booksController.addNewBook);
router.get("/books", booksController.getBooks);
router.get("/genres", booksController.getBookGenres);

export default router;