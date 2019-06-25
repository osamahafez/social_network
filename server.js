const express = require('express');
const app = express();
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// mongoose connection
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
// test mongoose connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});


app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server Started on port ' + port);
});

