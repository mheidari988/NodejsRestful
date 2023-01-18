const { StatusCodes } = require("http-status-codes");

function booksController(booksRepo) {

    async function post(req, res) {
        if (!req.body.title) {
            res.status(StatusCodes.BAD_REQUEST);
        }
        return res.status(StatusCodes.OK).json({ id: await booksRepo.add(req.body) });
    }

    async function get(req, res) {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        const books = await booksRepo.getAll(query);
        // Add hypermedia
        const booksWithHypermedia = books.map((book) => {
            const newBook = book;
            newBook.links = {};
            newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
            return newBook;
        });
        res.status(StatusCodes.OK).json(booksWithHypermedia);
    }

    return { post, get };
}

module.exports = booksController;