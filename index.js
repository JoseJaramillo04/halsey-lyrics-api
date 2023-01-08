const PORT = 8000;
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
	res.json("Hello world");
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
