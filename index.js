const express = require("express");
const SelectSheet = require("./src/SelectSheet");
const cors = require("cors");

const path = require('path');
const app = express();

app.use(cors());

const port = process.env.PORT || 9009;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api conectada");
})

app.get("/:ano/:municipio", async (req, res) => {
    const { ano, municipio } = req.params;

    const result = await SelectSheet({ ano: ano, municipio: municipio });
    res.json(result);
})


app.listen(port, () => { console.log("API rodando") })