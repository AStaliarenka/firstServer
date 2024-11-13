const bodyParser = require("body-parser");
import express from "express";
import cors from "cors";

import routes from "./settings/routes";

const app = express();
const port = process.env.PORT || 3500;

const corsOptions = {
	origin: "http://localhost:8080",
	credentials: true,
};

app.use(cors(corsOptions));
// .urlencoded анализирует текст в виде URL-кодированных данных (как браузеры, как правило,
// 	отправляют данные формы из обычных форм, установленных в POST) и предоставляет
// 	результирующий объект (содержащий ключи и значения) для req.body.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

const start = () => {
	try {
		app.listen(port, () =>
			console.log(`App listen on port ${port}`)
		);
	} catch (e) {
		console.log(e);
	}
};

start();
