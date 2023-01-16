const express = require("express");
const assert = require("assert");

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
assert(port, "Port is not defined.");

const app = express();

app.get("/", (req, res) => {
    res.send("hello from express");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});