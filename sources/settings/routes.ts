import authRouter from "../modules/authorization/auth.router";
import booksRouter from "../modules/books/books.router";
import usersRouter from "../modules/users/users.router";
import { Express } from "express";
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");
// const { DB } = require("../constants");
// const roles = DB.USERS.ROLES;

export default (app: Express) => {
	// Метод app.route() позволяет создавать обработчики маршрутов, образующие цепочки,
	// для пути маршрута. Поскольку путь указан в одном расположении, удобно создавать
	// модульные маршруты, чтобы минимизировать избыточность и количество опечаток

	// app.route("/auth/user").post(authController.getUserFromToken);
	// app.route("/auth/users").get(
	// 	roleMiddleware([roles.ADMIN, roles.LIBRARIAN]),
	// 	authController.getUsers
	// );
	// app.route("/auth/registration").post(authController.registration);
	// app.route("/auth/login").post(authController.login);
	// app.route("/books").get(
	// 	// admin is for test, he will be removed in feature
	// 	roleMiddleware([roles.READER, roles.LIBRARIAN, roles.ADMIN]),
	// 	booksController.getBooks
	// );
	// app.route("/auth/status").get((req: any, res: any) => {
	// 	res.send(true);
	// });

	app.use("/auth", authRouter);
	app.use("", booksRouter);
	app.use("/users", usersRouter);
};
