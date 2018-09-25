import { Plugin } from '@uppy/core';

import CloudinaryApiClient from './CloudinaryApiClient';

/**
 * Uppy plugin that uploads selected files to Cloudinary.
 */
export default class CloudinaryPlugin extends Plugin {
  /**
   * @param {Uppy}      uppy
   * @param {Object}    options
   * @param {String}    [options.id]
   * @param {String}    [options.cloudName]
   * @param {String}    [options.uploadPreset]
   * @param {String}    [options.apiKey]
   * @param {String}    [options.folder]
   * @param {String}    [options.cloudName]
   * @param {String[]}  [options.tags]
   * @param {Function}  [options.generateSignature]
   */
  constructor(uppy, options) {
    super(uppy, options);

    const {
      id,
      apiKey,
      cloudName,
      folder,
      tags,
      uploadPreset,
      generateSignature
    } = options;

    this.id = id || 'CloudinaryPlugin';
    this.type = 'uploader';

    this.apiClient = new CloudinaryApiClient({
      apiKey: apiKey,
      cloudName: cloudName,
      folder: folder,
      tags: tags,
      uploadPreset: uploadPreset,
      generateSignature: generateSignature
    });
  }

  /**
   * @param {String} fileId
   * @returns {Promise<Object>}
   */
  uploadFile = async fileId => {
    const file = this.uppy.getFile(fileId);

    return this.apiClient.upload(file.data, {
      onUploadProgress: event => {
        if (!event.lengthComputable) {
          return;
        }

        // Inform Uppy instance of the current progress
        this.uppy.emit('upload-progress', file, {
          id: fileId,
          uploader: this,
          bytesUploaded: event.loaded,
          bytesTotal: event.total
        });
      }
    });
  };

  /**
   * @param {String[]} fileIDs
   * @returns {Promise}
   */
  uploadFiles = fileIDs => {
    return Promise.all(
      fileIDs
        .map(async id => {
          const response = await this.uploadFile(id);

          this.uppy.setFileState(id, {
            response
          });
        })
        .map(promise =>
          promise.finally(() => {
            // Do nothing
          })
        )
    );
  };

  install() {
    this.uppy.addUploader(this.uploadFiles);
  }
}
