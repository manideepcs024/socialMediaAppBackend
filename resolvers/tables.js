const Tables = require("./../model/Tables.js");

const Tablesresolvers = {
	Query: {
		async getTables() {
			try {
				const table = await Tables.find();
				return table;
			} catch (err) {
				throw new Error(err);
			}
		}
	}
}

module.exports = Tablesresolvers;