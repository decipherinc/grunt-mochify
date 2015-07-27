'use strict';

var mochify = require('mochify');
var spawn = require('child-process-promise').spawn;
var map = require('lodash.map');
var path = require('path');

function mochifyTask(grunt) {

  grunt.registerMultiTask('mochify', 'Run Mochify', function (target) {
    var done = this.async();

    var options = this.options({
      reporter: 'spec',
      colors: true,
      debug: target === 'debug',
      phantomjs: path.join(__dirname, '..', 'node_modules', '.bin', 'phantomjs')
    });

    var args = map(options, function (value, name) {
      return '--' + name + '=' + value;
    }).concat(this.filesSrc);

    var mochifyPath = require.resolve('mochify/bin/cmd');

    spawn(mochifyPath, args)
      .progress(function (childProcess) {
        childProcess.stdout.on('data', function (data) {
          console.log(String(data));
        });
        childProcess.stderr.on('data', function (data) {
          console.error(String(data));
        });
      })
      .then(done)
      .fail(function (err) {
        grunt.fail.warn(err);
      });
  });

}

module.exports = mochifyTask;