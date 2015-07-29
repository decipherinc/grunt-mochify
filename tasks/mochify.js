'use strict';

var spawn = require('child-process-promise').spawn;
var map = require('lodash.map');

function mochifyTask(grunt) {

  grunt.registerMultiTask('mochify', 'Run Mochify', function (target) {
    var done = this.async();

    var options = this.options({
      reporter: 'spec',
      colors: !!process.stdout.isTTY,
      debug: target === 'debug'
    });

    var args = map(options, function (value, name) {
      return '--' + name + '=' + value;
    }).concat(this.filesSrc);

    var mochifyPath = require.resolve('mochify/bin/cmd');

    grunt.verbose.writeln('Spawning Mochify with command %s\n\tand ' +
      'arguments: %s', mochifyPath, grunt.log.wordlist(args));

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
