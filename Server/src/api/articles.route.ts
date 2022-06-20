import express from "express";
import ArticlesController from "./articles.controller";

const router = express.Router();
// get the data based on the route
router.route("/").get(ArticlesController.apiGetArticles);

export default router;
