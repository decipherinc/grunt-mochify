'use strict';

var spawn = require('child-process-promise').spawn;
var unparseArgs = require('unparse-args');

function mochifyTask(grunt) {

  grunt.registerMultiTask('mochify', 'Run Mochify', function (target) {
    var done = this.async();
    var options = this.options();
    var args;
    var mochifyPath;

    if (process.stdout.isTTY) {
      options.colors = true;
    }

    if (target === 'debug') {
      options.debug = true;
    }

    args = unparseArgs(options).concat(this.filesSrc);

    mochifyPath = require.resolve('mochify/bin/cmd');

    grunt.verbose.writeln('Spawning Mochify with command %s\n\tand ' +
      'arguments: %s', mochifyPath, grunt.log.wordlist(args));

    spawn(mochifyPath, args)
      .progress(function (childProcess) {
        childProcess.stdout.on('data', function (data) {
          process.stdout.write(String(data));
        });
        childProcess.stderr.on('data', function (data) {
          process.stderr.write(String(data));
        });
      })
      .then(done)
      .fail(function (err) {
        grunt.fail.warn(err);
      });
  });

}

module.exports = mochifyTask;
