import app from "./server";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import ArticlesDAO from "./api/dao/articlesDAO";

dotenv.config();

const port = process.env.PORT || 8000;
// Create a new MongoDB client
const client = new MongoClient(process.env.ARTICLES_DB_URI || "", {
	wtimeoutMS: 2500,
	maxPoolSize: 10,
});

async function run() {
	try {
		// Connect the client to the server
		await ArticlesDAO.injectDB(client);
		// Establish and verify connection
		await client.db(process.env.ARTICLES_NZ).command({ ping: 1 });
		console.log("Connected successfully to server");
		// Start the server
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (e) {
		console.error(`Unable to connect to server: ${e}`);
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

run().catch(console.dir);
