# Uppy-Cloudinary
This is a plugin for uploading files to [Cloudinary](https://cloudinary.com/) via [Uppy](https://uppy.io/).

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
There are a lot of things I didn’t include, since this plugin was largely made
to help with a specific project. If you would like to improve this plugin and/or add
more features, please submit a pull request.