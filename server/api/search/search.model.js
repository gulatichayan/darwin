'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchSchema = new Schema({
  searchKeyword: String,
  updated: Date
});

module.exports = mongoose.model('Search', SearchSchema);