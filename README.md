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
