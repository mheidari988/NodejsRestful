const express = require("express");

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

bookRouter.route("/books")
    .get((req, res) => {
        res.json({
            title: "hello"
        });
    });

app.use("/api", bookRouter);

app.get("/", (req, res) => {
    res.send("hello from express");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});