import express from "express";
import ArticlesController from "./articles.controller";

const router = express.Router();

router.route("/").get(ArticlesController.apiGetArticles);

export default router;
