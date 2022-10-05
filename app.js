const express = require('express');
const router = require('./routes/index');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: false })); //POST Query Parameter
app.use(express.json());
app.set('view engine', 'pug');
app.use(router);

app.listen(port, () => {
    console.log('server is listening on port', port);
});

