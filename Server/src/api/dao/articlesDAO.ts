let articles: any;

export default class ArticlesDAO {
	static async injectDB(conn: any) {
		if (articles) {
			return articles;
		}
		try {
			articles = await conn.db(process.env.ARTICLES_NS).collection("Articles");
		} catch (e) {
			throw e;
		}
	}

	static async getArticles({
		filters = null,
		page = 0,
		articlesPerPage = 10,
	}: any) {
		let query;
		if (filters) {
			if ("category" in filters) {
				query = { category: filters.category };
			}
		}

		let cursor: any;

		try {
			// cursor = await articles
			// 	.find(query)
			// 	.skip(page * articlesPerPage)
			// 	.limit(articlesPerPage);
			cursor = await articles.find(query);
		} catch (e) {
			console.error(`Unable to query articles: ${e}`);
			return { articlesList: [], totalArticles: 0 };
		}

		try {
			const totalArticles = page === (await articles.countDocuments(query));
			const articlesList = await cursor.toArray();
			return { articlesList, totalArticles };
		} catch (e) {
			console.error(`Unable to get articles: ${e}`);
			return { articlesList: [], totalArticles: 0 };
		}
	}
}
