import sendPostRequest from './sendPostRequest';

/**
 * Client for communicating with the Cloudinary API.
 */
export default class CloudinaryApiClient {
  /**
   * @param {Object}    params
   * @param {String}    [params.cloudName]
   * @param {String}    [params.uploadPreset]
   * @param {String}    [params.apiKey]
   * @param {String}    [params.folder]
   * @param {String}    [params.cloudName]
   * @param {String[]}  [params.tags]
   * @param {Function}  [params.generateSignature]
   */
  constructor({
    cloudName,
    uploadPreset,
    apiKey,
    folder,
    tags,
    generateSignature
  }) {
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
    this.apiKey = apiKey;
    this.folder = folder;
    this.tags = tags;
    this.generateSignature = generateSignature;
  }

  /**
   * @param {File|Blob} file
   * @returns {String}
   */
  getResourceType(file) {
    if (file instanceof File) {
      if (file.type.match(/^image\//)) {
        return 'image';
      } else if (file.type.match(/^video\//)) {
        return 'video';
      }
    }

    return 'auto';
  }

  /**
   * @param {File|Blob} file
   * @returns {String}
   */
  getUploadUrl(file) {
    const type = this.getResourceType(file);

    return `https://api.cloudinary.com/v1_1/${this.cloudName}/${type}/upload`;
  }

  /**
   * Uploads a file to Cloudinary.
   *
   * @param {File|Blob} file
   * @param {Object}    options
   * @param {Function}  [options.onUploadProgress] Accepts one ProgressEvent argument
   */
  async upload(file, { onUploadProgress = undefined }) {
    const params = {
      upload_preset: this.uploadPreset,
      folder: this.folder,
      tags: this.tags.join(','),
      timestamp: new Date().getTime()
    };

    const signature = await this.generateSignature(params);

    if (!signature) {
      throw Error('Could not generate signature');
    }

    params.signature = signature;
    params.api_key = this.apiKey;
    params.file = file;

    const responseText = await sendPostRequest(
      this.getUploadUrl(file),
      params,
      {
        onUploadProgress
      }
    );

    return JSON.parse(responseText);
  }
}
