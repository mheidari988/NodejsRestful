/* eslint-disable no-undef */

const express = require("express");
const bodyParser = require("body-parser");
const booksRepo = require("./repo/booksRepo");

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello from express");
});

bookRouter.route("/books")
    .post(async (req, res) => {
        res.status(200).json({ id: await booksRepo.add(req.body) });
    })
    .get(async (req, res) => {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        res.status(200).json(await booksRepo.getAll(query));
    });

bookRouter.route("/books/:bookId")
    .get(async (req, res) => {
        res.status(200).json(await booksRepo.getById(req.params.bookId));
    })

app.use("/api", bookRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});