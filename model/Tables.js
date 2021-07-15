const { model, Schema } = require('mongoose');

const tables = {
	name: String,
	size: String,
	createdAt: String
}
const TableSchema = new Schema(tables);

module.exports = model('Tables',TableSchema,'tables');