const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	lyrics: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model("Song", songSchema);
