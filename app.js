const express = require('express');

const app = express();
const port = process.env.PORT || console.error('Undefined PORT');

app.get('/', (req, res) => {
    res.send('hello from express');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})