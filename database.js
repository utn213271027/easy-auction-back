const mongoose = require('mongoose');
const URI = 'mongodb://localhost/ares-shop';

mongoose.connect(URI)
  .then(db => console.log('BD Conectada'))
  .catch(error => console.error(error));

module.exports = mongoose;