import { Collection, Document, FindCursor, MongoClient, WithId } from "mongodb";

export type TFilters = { category?: string };

export interface IDAOGet {
	filters: TFilters | null;
	page: number;
	resultsPerPage: number;
}

export default class DAO {
	// connects to the database
	static async injectDB(conn: MongoClient, collectionDB: string) {
		let collection: Collection<Document>;

		try {
			collection = conn.db(process.env.ARTICLES_NS).collection(collectionDB);
		} catch (e) {
			throw e;
		}
		return collection;
	}

	// gets the articles from the database and returns them
	static async getArticles(
		{ filters = null, page = 0, resultsPerPage = 10 }: IDAOGet,
		collection: Collection<Document>
	) {
		let query = {};

		if (filters) {
			if ("category" in filters) {
				query = { category: filters.category };
			}
		}

		let cursor: FindCursor<WithId<Document>>;

		try {
			page = page > 0 ? page - 1 : 0;
			cursor = collection
				.find(query)
				.skip(page * resultsPerPage)
				.limit(resultsPerPage);
		} catch (e) {
			throw e;
		}

		try {
			const totalResults = page === 0 ? await collection.countDocuments(query) : 0;
			const resultsList = await cursor.toArray();
			return { resultsList, totalResults };
		} catch (e) {
			throw e;
		}
	}
}
