import { WithId } from "mongodb";
import { TFilters } from "./dao/DAO";
import { IDAOGet } from "./dao/DAO";

type callback = ({ filters, page, resultsPerPage }: IDAOGet) => Promise<{
	resultsList: WithId<Document>[];
	totalArticles: number;
}>;

type ICotrollerGet = {
	req: any;
	DAO: any;
};

export default class Controller {
	// gets the results from the database and returns them
	static async apiGetResults({ req, DAO }: ICotrollerGet) {
		const resultsPerPage = req.query.resultsPerPage
			? parseInt(req.query.resultsPerPage)
			: 10;
		const page = req.query.page ? parseInt(req.query.page) : 1;

		let filters = {} as TFilters;
		if (req.query.category) {
			filters.category = req.query.category;
		}

		const { resultsList, totalResults } = await DAO({
			filters,
			page,
			resultsPerPage,
		});

		const response = {
			results: resultsList,
			page: page,
			filters: filters,
			results_per_page: resultsPerPage,
			total_results: totalResults,
		};

		return response;
	}
}
