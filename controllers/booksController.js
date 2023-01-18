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
        res.status(StatusCodes.OK).json(await booksRepo.getAll(query));
    }

    return { post, get };
}

module.exports = booksController;