import express from "express";
import cors from "cors";
import articles from "./api/articles.route";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// get the data based on the route
app.use("/api/v1/articles", articles);
app.use("*", (req, res) => {
	res.status(404).json({
		status: 404,
		message: "Not Found",
	});
});

export default app;
