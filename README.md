# Uppy-Cloudinary
This is a plugin for uploading files to [Cloudinary](https://cloudinary.com/)
via [Uppy](https://uppy.io/).

## How to Use

Install via NPM:
```bash
npm install --save @capsureit/uppy-cloudinary
```

Use it in your project:
```javascript
// Import via ES Modules
import CloudinaryPlugin from '@capsureit/uppy-cloudinary';
// Or Common JS
const CloudinaryPlugin = require('@capsureit/uppy-cloudinary');

// Use it on your Uppy instance
uppy.use(CloudinaryPlugin, {
  cloudName: 'my-cloud',
  uploadPreset: 'my-preset',
  apiKey: '1234567890',
  generateSignature: function generateSignature(paramsToSign) {
    // Include your own signature generation logic here.
  },
  tags: ['a', 'b', 'c'],
  folder: 'prefix/for/publicId'
});
```

## Options
The plugin supports the following Cloudinary options:
* `cloudName` (*String*)
* `uploadPreset` (*String*)
* `apiKey` (*String*)
* `folder` (*String*)
* `tags` (*String[]*)

In addition, it supports the following options:

### `generateSignature`
*Function*

Accepts one argument, which is the parameters to sign, as an object.

Returns a signature string. See the [Cloudinary
docs](https://cloudinary.com/documentation/signatures) for instructions on how
to generate a signature

## Contributing
There are a lot of Cloudinary features we didn’t include, since this plugin was
largely made to serve our current needs. If you would like to improve this
plugin and/or add more features, please submit a pull request.