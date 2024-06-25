const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors())

app.use('/',require('./routes'))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
