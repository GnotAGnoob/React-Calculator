import ArticlesDAO from "./dao/articlesDAO";

export default class ArticlesController {
	static async apiGetArticles(req: any, res: any) {
		const articlesPerPage = req.query.articlesPerPage
			? parseInt(req.query.articlesPerPage)
			: 10;
		const page = req.query.page ? parseInt(req.query.page) : 0;
		const filters = req.query.category ? req.query.category : {};

		const { articlesList, totalArticles } = await ArticlesDAO.getArticles({
			filters,
			page,
			articlesPerPage,
		});

		const response = {
			articles: articlesList,
			page: page,
			filters: filters,
			results_per_page: articlesPerPage,
			total_results: totalArticles,
		};

		res.json(response);
	}
}
