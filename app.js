/* eslint-disable no-undef */

const express = require("express");
const booksRepo = require("./repo/booksRepo");

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello from express");
});

bookRouter.route("/books")
    .post(async (req, res) => {
        res.json({ result: "OK" });
    })
    .get(async (req, res) => {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        res.json(await booksRepo.getAll(query));
    });

bookRouter.route("/books/:bookId")
    .get(async (req, res) => {
        res.json(await booksRepo.getById(req.params.bookId));
    })

app.use("/api", bookRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});