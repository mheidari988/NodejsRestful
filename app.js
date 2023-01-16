const express = require('express');
const assert = require('assert');

const port = process.env.PORT;
assert(port, 'Port is not defined.');

const app = express();

app.get('/', (req, res) => {
    res.send('hello from express');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})