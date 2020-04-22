require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json);

app.set('view engine', 'hbs');
app.set('views',path.join(__dirname , '/views/'));

app.listen(3000, () => {
    console.log('Listening to port: 3000');
});

app.use('/addPost',noteRoutes);