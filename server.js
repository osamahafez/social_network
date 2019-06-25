const express = require('express');
const app = express();

// mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://osama:osama123@ds243317.mlab.com:43317/devconnector', {useNewUrlParser: true});


app.get('/', (req, res) => {
    res.send('Hello');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server Started on port ' + port);
});

// test mongoose connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected')
});