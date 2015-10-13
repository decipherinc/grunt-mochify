'use strict';

var unparseArgs = require('unparse-args');
var ketch = require('ketch');

function mochifyTask(grunt) {
  grunt.registerMultiTask('mochify', 'Run Mochify', function(target) {
    var done = this.async();
    var options = this.options();

    if (process.stdout.isTTY) {
      options.colors = true;
    }

    if (target === 'debug') {
      options.debug = true;
    }

    ketch(process.execPath)
      .append(require.resolve('mochify/bin/cmd'))
      .append(unparseArgs(options))
      .append(this.filesSrc)
      .tap(function(k) {
        var args = k.serialize();
        grunt.verbose.writeln('Spawning Mochify with command %s\n\tand ' +
          'arguments: %s', args[0], grunt.log.wordlist(args[1]));
      })
      .spawn()
      .progress(function(childProcess) {
        childProcess.stdout.on('data', function(data) {
          process.stdout.write(String(data));
        });
        childProcess.stderr.on('data', function(data) {
          process.stderr.write(String(data));
        });
      })
      .then(done)
      .fail(function(err) {
        grunt.fail.warn(err);
      });
  });
}

module.exports = mochifyTask;
