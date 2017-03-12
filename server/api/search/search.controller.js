'use strict';

var _ = require('lodash');
var Search = require('./search.model');
var request = require('request');
var jimp = require('jimp');
var path = require('path');
var async = require('async');
var fs = require('fs');

console.log("------------" + process.cwd() + "-----------------");

// Get list of searchs
exports.index = function(req, res) {
  Search.find(function (err, searchs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(searchs);
  });
};

// Get a single search
exports.show = function(req, res) {
  Search.findById(req.params.id, function (err, search) {
    if(err) { return handleError(res, err); }
    if(!search) { return res.status(404).send('Not Found'); }
    return res.json(search);
  });
};

// Creates a new search in the DB.
exports.create = function(req, res) {
  Search.create(req.body, function(err, search) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(search);
  });
};

// Updates an existing search in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Search.findById(req.params.id, function (err, search) {
    if (err) { return handleError(res, err); }
    if(!search) { return res.status(404).send('Not Found'); }
    var updated = _.merge(search, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(search);
    });
  });
};

// Deletes a search from the DB.
exports.destroy = function(req, res) {
  Search.findById(req.params.id, function (err, search) {
    if(err) { return handleError(res, err); }
    if(!search) { return res.status(404).send('Not Found'); }
    search.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.googleImageSearch = function(req, res) {
  var queryStringObject = {
    key: 'AIzaSyCWQXciUvx3bsBsCKq5fL2ehHkE_01aQGQ',
    cx: '001958243306478510160:vnayt135nti',
    searchType: 'image',
    fileType: 'jpg',
    q: req.query.searchKeyword
  };
  var options = {
    url: 'https://www.googleapis.com/customsearch/v1',
    method: 'GET',
    qs: queryStringObject
  };
  Search.update({searchKeyword: req.query.searchKeyword}, {$set: {updated: Date()}}, {upsert: true}, function(error, search) {
    if(error) { console.log(error); }
  });
  request(options, function(err, response, body) {
    if(err) {
      console.log(err);
    }
    body = JSON.parse(body);
    async.forEachOf(body.items, function(item, index, callback) {
      var outputImageName = '/assets/images/' + req.query.searchKeyword + '_img_' + index + path.extname(item.link);
      if(process.env.NODE_ENV === 'development') {
        outputImageName = 'client' + outputImageName;
      } else if(process.env.NODE_ENV === 'production') {
        outputImageName = 'public' + outputImageName;
      }
      jimp.read(item.link).then(function(imgObj) {
        imgObj.resize(200, 200)
        .greyscale()
        .write(outputImageName, function(error, saved) {
          if(error) {
            console.log(error);
            return callback(error);
          }
          console.log(saved);
          callback();
        });
      }).catch(function(error) {
        console.log(error);
        return callback(error);
      });
    }, function(error) {
      if(error) console.log(error);
      console.log("All files written");
    });
    return res.status(200).json(body);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}