// eslint-disable-next-line no-unused-vars
const should = require("should");
const sinon = require("sinon");
const bookController = require("../controllers/booksController");
const { StatusCodes } = require("http-status-codes");

describe("Book Controller Tests:", () => {
    describe("POST", () => {
        it("Should not allow an empty title on POST", () => {
            const Repo = function () {
                this.add = () => { };
            };
            const req = {
                body: {
                    author: "John"
                }
            };
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = bookController(Repo);
            controller.post(req, res);

            res.status.calledWith(StatusCodes.BAD_REQUEST).should.equal(true, `Bad status ${res.status.args[0][0]}`);
        });
    });
});