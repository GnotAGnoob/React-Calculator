import { Collection, Document, FindCursor, MongoClient, WithId } from "mongodb";
import DAO, { IDAOGet } from "./DAO";

export type TFilters = { category?: string };

let articles: Collection<Document>;

export default class ArticlesDAO {
	// connects to the database
	static async injectDB(conn: MongoClient) {
		if (articles) {
			return articles;
		}
		articles = await DAO.injectDB(conn, "Articles");
	}

	// gets the articles from the database and returns them
	static async getArticles(options: IDAOGet) {
		let filter = {};
		if (options.filters?.category) {
			filter = { category: options.filters.category };
		}

		try {
			return await DAO.getArticles({ ...options, filters: filter }, articles);
		} catch (e) {
			console.error(`Unable to get articles: ${e}`);
			return { resultsList: [], totalResults: 0 };
		}
	}
}
