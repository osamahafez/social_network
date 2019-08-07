const express = require('express');
const app = express();
const keys = require('./config/keys');
const path = require('path');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');

// mongoose connection
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
// test mongoose connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// used in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server Started on port ' + port);
});

