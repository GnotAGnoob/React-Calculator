import ArticlesDAO from "./dao/articlesDAO";
import Controller from "./controller";

export default class ArticlesController {
	// gets the articles from the database and returns them
	static async apiGetArticles(req: any, res: any) {
		//send request to apiGetResults with articlesDAO as DAO
		res.json(
			await Controller.apiGetResults({ req, DAO: ArticlesDAO.getArticles })
		);
	}
}
