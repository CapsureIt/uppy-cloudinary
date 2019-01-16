import sendPostRequest from "./sendPostRequest";

const baseUrl = "https://api.cloudinary.com/v1_1";

/**
 * @param {File|Blob} file
 * @returns {String}
 */
function getResourceType(file) {
  if (file instanceof File) {
    if (file.type.match(/^image\//)) {
      return "image";
    } else if (file.type.match(/^video\//)) {
      return "video";
    }
  }

  return "auto";
}

/**
 * @param {String}    cloudName
 * @param {File|Blob} file
 * @returns {String}
 */
function getUploadUrl(cloudName, file) {
  const type = getResourceType(file);

  return `${baseUrl}/${cloudName}/${type}/upload`;
}

/**
 * Client for communicating with the Cloudinary API.
 */
export default class CloudinaryApiClient {
  /**
   * @param {Object}    params
   * @param {String}    [params.cloudName]
   * @param {Object}    [params.context]
   * @param {String}    [params.uploadPreset]
   * @param {String}    [params.apiKey]
   * @param {String}    [params.folder]
   * @param {String}    [params.cloudName]
   * @param {String[]}  [params.tags]
   * @param {Function}  [params.generateSignature]
   */
  constructor({
    cloudName,
    context,
    uploadPreset,
    apiKey,
    folder,
    tags,
    generateSignature
  }) {
    this.cloudName = cloudName;
    this.context = context;
    this.uploadPreset = uploadPreset;
    this.apiKey = apiKey;
    this.folder = folder;
    this.tags = tags;
    this.generateSignature = generateSignature;
  }

  /**
   * Uploads a file to Cloudinary.
   *
   * @param {File|Blob} file
   * @param {Object}    options
   * @param {Function}  [options.onUploadProgress] Accepts one ProgressEvent argument
   * @returns {Promise<Object>} JSON response data
   */
  async upload(file, { onUploadProgress = undefined }) {
    const params = {
      upload_preset: this.uploadPreset,
      context: this.context,
      folder: this.folder,
      tags: this.tags.join(","),
      timestamp: new Date().getTime()
    };

    const signature = await this.generateSignature(params);

    if (!signature) {
      throw new Error("Could not generate signature");
    }

    params.signature = signature;
    params.api_key = this.apiKey;
    params.file = file;

    const responseText = await sendPostRequest(
      getUploadUrl(this.cloudName, file),
      params,
      {
        onUploadProgress
      }
    );

    return JSON.parse(responseText);
  }
}
