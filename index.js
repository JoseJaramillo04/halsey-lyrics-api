const PORT = 8000;
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const connectDB = require("./actions/dbConn");
const { default: mongoose } = require("mongoose");

dotenv.config();
const app = express();

Array.prototype.randomSong = function () {
	return this[Math.floor(Math.random() * this.length)];
};

//connect to MongoDB
connectDB();

const Song = require("./models/song");
const Album = require("./models/album");

app.get("/", async (req, res) => {
	try {
		const songs = await Song.find();
		console.log(songs);
		res.json(songs);
	} catch (error) {
		console.log(error);
	}
});

//GET all albums of $ARTIST
app.get("/:artist/album", async (req, res) => {
	const { artist } = req.params;
	try {
		const albums = await Album.find({ artist: artist });

		res.json(albums);
	} catch (error) {
		console.log(error);
	}
});

//GET $ALBUM of $ARTIST
app.get("/:artist/album/:album", async (req, res) => {
	const { artist, album } = req.params;

	try {
		const albums = await Album.find({ artist: artist, name: album });
		res.json(albums);
	} catch (error) {
		console.log(error);
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
		res.json(songs);
	} catch (error) {
		console.log(error);
	}
});

//GET random out of all songs of $ALBUM of $ARTIST
app.get("/:artist/album/:album/song/random", async (req, res) => {
	const { artist, album } = req.params;

	try {
		const songList = await Album.find({ artist: artist, name: album });
		const songs = await Song.find({
			_id: { $in: songList[0].songs },
		});
		res.json(songs.randomSong());
	} catch (error) {
		console.log(error);
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
		res.json(songs);
	} catch (error) {
		console.log(error);
	}
});

//GET $SONG by name
app.get("/song/:song", async (req, res) => {
	const { song } = req.params;

	try {
		const songRes = await Song.find({
			name: song,
		});
		res.json(songRes);
	} catch (error) {
		console.log(error);
	}
});

//GET random out of all songs of $ARTIST
app.get("/:artist/song/random", async (req, res) => {
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
		res.json(songs.randomSong());
	} catch (error) {
		console.log(error);
	}
});

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
});
