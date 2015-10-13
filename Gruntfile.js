'use strict';

module.exports = function(grunt) {
  var loadGruntConfig = require('load-grunt-config');
  var pkg = grunt.file.readJSON('package.json');

  /**
   * Random bits of crap to send to the Grunt templates
   * @type {{pkg: Object, bower: ?Object, min: Function, author: *}}
   */
  var data = {
    pkg: pkg,
    author: typeof pkg.author === 'string' ? pkg.author :
      [pkg.author.name, pkg.author.email].join(' ')
  };

  Object.defineProperty(data, 'author', {

    /**
     * Normalizes `author` field of `package.json`.
     * @returns {string} Author name(s) and email(s)
     */
    get: function author() {
      function _author(auth) {
        var format;
        if (typeof auth === 'string') {
          return auth;
        }
        format = require('util').format;
        return format('%s <%s>', auth.name, auth.email);
      }

      if (Array.isArray(pkg.author)) {
        return pkg.author.map(function(auth) {
          return _author(auth);
        }).join(', ');
      }
      return _author(pkg.author);
    }
  });

  if (grunt.option('time')) {
    require('time-grunt')(grunt);
  }

  loadGruntConfig(grunt, {
    jitGrunt: {
      staticMappings: {
        devUpdate: 'grunt-dev-update',
        'bump-only': 'grunt-bump',
        'bump-commit': 'grunt-bump',
        'mochify': 'tasks/mochify.js'
      }
    },
    data: data
  });
};
