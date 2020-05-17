const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const graphSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Graph_DB = mongoose.model('schema', graphSchema);

module.exports = Graph_DB;