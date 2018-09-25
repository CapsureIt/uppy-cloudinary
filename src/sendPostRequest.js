/**
 * Send a POST request to the specified URL.
 *
 * @param {String}    url
 * @param {Object}    params                      Body parameters
 * @param {Object}    options
 * @param {Function}  [options.onUploadProgress]  Accepts one ProgressEvent argument
 * @return {Promise<String>}
 */
export default function sendPostRequest(url, params = {}, { onUploadProgress }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    Object.keys(params).forEach(key => {
      fd.append(key, params[key]);
    });

    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (onUploadProgress) {
      xhr.upload.addEventListener('progress', onUploadProgress);
    }

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // File uploaded successfully
          resolve(xhr.responseText);
        } else {
          reject();
        }
      }
    });

    xhr.addEventListener('error', () => reject());

    xhr.send(fd);
  });
}
