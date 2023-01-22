const serverless = require("serverless-http");
const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./actions/dbConn");
const { default: mongoose } = require("mongoose");

dotenv.config();
const app = express();

Array.prototype.chooseRandom = function () {
	return this[Math.floor(Math.random() * this.length)];
};

//connect to MongoDB
connectDB();

const Song = require("./models/song");
const Album = require("./models/album");

//gets all songs
app.get("/", async (req, res) => {
	try {
		const songs = await Song.find();
		res.json(songs);
	} catch (error) {
		console.error(error);
	}
});

//testing enpoint to make sure it works
app.get("/test", async (req, res) => {
	res.json("Hello from test!");
});

//GET all albums of $ARTIST
app.get("/:artist/album", async (req, res) => {
	const { artist } = req.params;
	try {
		const albums = await Album.find({ artist: artist });

		return res.json(albums);
	} catch (error) {
		console.error(error);
	}
});

//GET album by id
app.get("/album/id/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const album = await Album.find({ _id: id });

		return res.json(album[0]);
	} catch (error) {
		console.error(error);
	}
});

//GET $ALBUM of $ARTIST
app.get("/:artist/album/:album", async (req, res) => {
	const { artist, album } = req.params;

	try {
		const albums = await Album.find({ artist: artist, name: album });
		return res.json(albums);
	} catch (error) {
		console.error(error);
	}
});

//GET all songs of $ALBUM of $ARTIST
app.get("/:artist/album/:album/song", async (req, res) => {
	const { artist, album } = req.params;

	try {
		const songList = await Album.find({ artist: artist, name: album });
		const songs = await Song.find({
			_id: { $in: songList[0].songs },
		});
		return res.json(songs);
	} catch (error) {
		console.error(error);
	}
});

//GET random out of all songs of $ALBUM of $ARTIST
app.get("/:artist/album/:album/song/random", async (req, res) => {
	const { artist, album } = req.params;

	try {
		const songList = await Album.find({ artist: artist, name: album });
		const randomSongChosen = songList[0].songs.chooseRandom();

		const songInfo = await Song.find({
			_id: randomSongChosen,
		});
		return res.json(songInfo);
	} catch (error) {
		console.error(error);
	}
});

//GET all songs of $ARTIST
app.get("/:artist/song", async (req, res) => {
	const { artist } = req.params;
	let songList = [];

	try {
		const albums = await Album.find({ artist: artist });
		albums.forEach((thing) => {
			songList = songList.concat(thing.songs);
		});

		const songs = await Song.find({
			_id: { $in: songList },
		});
		return res.json(songs);
	} catch (error) {
		console.error(error);
	}
});

//GET $SONG by name
app.get("/song/:song", async (req, res) => {
	const { song } = req.params;

	try {
		const songRes = await Song.find({
			name: song,
		});
		return res.json(songRes);
	} catch (error) {
		console.error(error);
	}
});

//Get song by $ID
app.get("/song/id/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const songRes = await Song.find({
			_id: id,
		});
		return res.json(songRes[0]);
	} catch (error) {
		console.error(error);
	}
});

//GET random out of all songs of $ARTIST
app.get("/:artist/song/random", async (req, res) => {
	const { artist } = req.params;

	try {
		const song = await Song.aggregate([{ $sample: { size: 1 } }]);

		return res.json(song[0]);
	} catch (error) {
		console.error(error);
	}
});

//GET random out of all songs of $ARTIST with album info
app.get("/:artist/song/random/info", async (req, res) => {
	const { artist } = req.params;
	let songList = [];

	try {
		const randomAlbumChosen = await Album.aggregate([{ $sample: { size: 1 } }]);

		const randomSongChosen = randomAlbumChosen[0].songs.chooseRandom();

		const songInfo = await Song.find({
			_id: randomSongChosen,
		});

		const customJson = {
			albumId: randomAlbumChosen[0]._id,
			albumName: randomAlbumChosen[0].name,
			releaseDate: randomAlbumChosen[0].releaseDate,
			albumArtist: randomAlbumChosen[0].artist,
			song: songInfo[0],
		};
		return res.json(customJson);
	} catch (error) {
		console.error(error);
	}
});

module.exports.handler = serverless(app, {
	callbackWaitsForEmptyEventLoop: false,
});
