const express = require("express");
const assert = require("assert");

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
assert(port, "Port is not defined.");

const app = express();
const bookRouter = express.Router();

bookRouter.route("/books")
    .get((req, res) => {
        const response = {
            hello: "This is my API"
        };
        res.json(response);
    });

app.use("/api", bookRouter);

app.get("/", (req, res) => {
    res.send("hello from express");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});