const mongoose = require("mongoose");
const ObjectId = require("mongoose").ObjectId;
const Schema = mongoose.Schema;

const albumSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	releaseDate: {
		type: Date,
		default: Date.now,
	},
	songs: [
		{
			type: ObjectId,
		},
	],
	artist: { type: String, required: true },
});

module.exports = mongoose.model("Album", albumSchema);
