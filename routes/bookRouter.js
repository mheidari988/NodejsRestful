const express = require("express");
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require("http-status-codes");

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

    bookRouter.route("/books/:bookId")
        .get(async (req, res) => {
            res.status(StatusCodes.OK).json(await booksRepo.getById(req.params.bookId));
        })
        .put(async (req, res) => {
            if (req.params.bookId) {
                const book = await booksRepo.getById(req.params.bookId);
                if (!book) {
                    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
                }
                book.title = req.body.title;
                book.genre = req.body.genre;
                book.author = req.body.author;
                book.read = req.body.read;
                const result = await booksRepo.update(book._id, book);
                console.log(result);
                res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST });
            }
        })

    return bookRouter;
}

module.exports = routes;