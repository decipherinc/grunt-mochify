# grunt-mochify

Run Mochify with Grunt

## Usage

Refer to [the Mochify Docs](https://github.com/mantoni/mochify.js/blob/master/README.md) for information about options.

This is a multi-task, so:

```js
gruntInitConfig({
  mochify: {
    options: {
      reporter: 'spec'
    },
    myTarget: {
      src: [
        'test/file.js', 
        'test/anotherFile.js', 
        'test/more-tests/**.js'
      ],
      options: {
        require: './test/fixture.js'
      }
    }
});
```

### Defaults

The default reporter is `spec`, like in Mocha.  Mochify's default reporter is `dot`.

`color` is on by default.

### Debug Mode

Even if `debug` is `false` or unspecified in the Grunt config, you can start any target in "debug" mode via:

```shell
$ grunt mochify:myTarget:debug
```

### PhantomJS

PhantomJS is a dependency of this module, so you don't have to worry about specifying its path or installing globally or whatever.

## Installation

```shell
$ npm install --save-dev grunt grunt-mochify
```

## Fair Warning

I haven't tested this much.

## Author

[Christopher Hiller](https://github.com/boneskull)

## License

Copyright 2015, [FocusVision Worldwide](http://www.focusvision.com).  Licensed MIT.
