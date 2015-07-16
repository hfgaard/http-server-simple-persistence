'use strict';

var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.route('/:file')
   .get(function(req, res, next) {
      var file = req.params.file;
      fs.open('./data/' + file + '.json', 'r', function(err, fd) {
        if (err) {
          res.status(404).send('The file you have requested cannot be found.');
        } else {
          fs.readFile('./data/' + file + '.json', function(err, data) {
            res.status(200).send(data.toString());
          });
        }
      });
   })
   .post(function(req, res, next) {
      var file = req.params.file;
      fs.open('./data/' + file + '.json', 'wx', function(err, fd) {
        if (err) {
          res.status(409).send('There is already a file in this location. Please try again');
        } else {
          fs.writeFile('./data/' + file + '.json', JSON.stringify(req.body), function(err) {
            res.status(201).send('File has been uploaded.');
          });
        }
      });
   })
   .put(function(req, res, next) {
      var file = req.params.file;
      fs.open('./data/' + file + '.json', 'r+', function(err, fd) {
        if (err) {
          res.status(404).send('The file you have requested cannot be found.');
        } else {
          fs.writeFile('./data/' + file + '.json', JSON.stringify(req.body), function(err) {
            res.status(200).send('File has been updated.');
          });
        }
      });
   })
   .delete(function(req, res) {
      var file = req.params.file;
      fs.unlink('./data/' + file + '.json', function(err) {
        if (err) {
          res.status(404).send('File not found.');
        } else {
          res.status(204).send('This file has been removed.');  
        }
      });
   });


app.listen(3000, function() {
  console.log('App is running on port 3000');
});
