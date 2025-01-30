const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());  // Ensure JSON parsing works

app.use(cors({
    origin: process.env.MODE === "development"
        ? "*"
        : "https://people.arcada.fi"
}));

app.get("/", (req, res) => {
    res.send("<h1>Hello Product Service Fam!!!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
