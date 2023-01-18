/* eslint-disable no-undef */

const express = require("express");
const bodyParser = require("body-parser");
const booksRepo = require("./repo/booksRepo");

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require("./routes/bookRouter")(booksRepo);

async function main() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
        res.send("hello from express");
    });

    app.use("/api", await bookRouter);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main();