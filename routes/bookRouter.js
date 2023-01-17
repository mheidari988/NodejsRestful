const express = require("express");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

function routes(booksRepo) {
    const bookRouter = express.Router();

    bookRouter.route("/books")
        .post(async (req, res) => {
            res.status(StatusCodes.OK).json({ id: await booksRepo.add(req.body) });
        })
        .get(async (req, res) => {
            const query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            res.status(StatusCodes.OK).json(await booksRepo.getAll(query));
        });

    bookRouter.use("/books/:bookId", async (req, res, next) => {
        const book = await booksRepo.getById(req.params.bookId);
        if (!book) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        req.book = book;
        return next();
    });

    bookRouter.route("/books/:bookId")
        .get((req, res) => {
            res.status(StatusCodes.OK).json(req.book);
        })
        .put(async (req, res) => {
            const book = req.book;
            book.title = req.body.title;
            book.genre = req.body.genre;
            book.author = req.body.author;
            book.read = req.body.read;
            await booksRepo.update(book._id, book);
            res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
        })
        .delete(async (req, res) => {
            const result = await booksRepo.remove(req.params.bookId);
            console.log(result);
            res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
        });

    return bookRouter;
}

module.exports = routes;