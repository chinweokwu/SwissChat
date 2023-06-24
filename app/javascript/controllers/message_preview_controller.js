import { Controller } from "@hotwired/stimulus";

/**
 * This controller is responsible for displaying the message preview(s).
 * @class MessagePreviewController
 */
export default class extends Controller {
  connect() {}
  /**
   * Creates the preview panel displayed above the message input.
   * This panel is used to display the file(s) that is/are being uploaded.
   */
  preview() {
    this.clearPreviews();
    for (let i = 0; i < this.targets.element.files.length; i++) {
      let fileSym = this.targets.element.files[i];
      const readerSym = new FileReader();
      this.createAndDisplayFilePreviewElements(fileSym, readerSym);
    }
    this.toggleVisiblity();
  }
  /**
   * Toggle the visibility of the preview div.
   */
  toggleVisiblity() {
    let preview = document.getElementById("attachment-previews");
    preview.classList.toggle("d-none");
  }
  /**
   * Creates and displays the preview elements for the file.
   * This is used to display the file in the message preview.
   *
   * @param {*} file - The file to be previewed
   * @param {*} reader - The FileReader object
   */
  createAndDisplayFilePreviewElements(file, reader) {
    reader.onload = () => {
      let ele = this.constructPreviews(file, reader);
      ele.src = reader.result;
      ele.setAttribute("href", reader.result);
      ele.setAttribute("target", "_blank");
      ele.classList.add("attachment-preview");

      document.getElementById("attachment-previews").appendChild(ele);
    };
    reader.readAsDataURL(file);
  }
  /**
   * Constructs the preview element for the file.
   * These elements are used to display the file in the message preview.
   * Supported file types are:
   * - Audio: mp3, wav
   * - Video: mp4, quicktime
   * - Image: jpg, png, gif
   * - Default: anything else
   * @param {*} file - The file to be previewed
   * @param {*} reader - The FileReader object
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  constructPreviews(file, reader) {
    let ele;
    let cancelFunc = (e) => this.removePreview(e);
    switch (file.type) {
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        ele = this.createImageElement(cancelFunc, reader);
        break;
      case "video/mp4":
      case "video/quicktime":
        ele = this.createVideoElement(cancelFunc);
        break;
      case "audio/mpeg":
      case "audio/mp3":
      case "audio/wav":
        ele = this.createAudioElement(cancelFunc);
        break;
      default:
        ele = this.createDefaultElement(cancelFunc);
    }
    ele.dataset.filename = file.name;
    return ele;
  }
  /**
   * Create an image preview element. This is used for images that are
   * of type: jpg, png, or gif.
   * @param {*} cancelFunc - The function to be called when the cancel button is clicked
   * @param {*} reader - The FileReader object
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createImageElement(cancelFunc, reader) {
    let cancelUploadBtn, ele;
    const image = document.createElement("img");
    image.setAttribute("style", "background-image: url(" + reader.result + ")");
    image.classList.add("preview-image");
    ele = document.createElement("div");
    ele.classList.add("attachment-image-container", "file-removal");
    ele.appendChild(image);
    cancelUploadBtn = document.createElement("i");
    cancelUploadBtn.classList.add(
      "ri-close-line",
      "cancel-upload-button"
    );
    cancelUploadBtn.onclick = cancelFunc;
    ele.appendChild(cancelUploadBtn);
    return ele;
  }
  /**
   * Creates a preview element for audio files.
   * This is used for audio files that are of type: mp3, or wav.
   * @param {*} cancelFunc - The function to be called when the cancel button is clicked
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createAudioElement(cancelFunc) {
    let cancelUploadBtn, ele;
    ele = document.createElement("i");
    ele.classList.add(
      "ri-folder-music-line",
      "audio-preview-icon",
      "file-removal"
    );
    cancelUploadBtn = document.createElement("i");
    cancelUploadBtn.classList.add(
      "ri-close-line",
      "cancel-upload-button"
    );
    cancelUploadBtn.onclick = cancelFunc;
    ele.appendChild(cancelUploadBtn);
    return ele;
  }
  /**
   * Creates a video preview element. This is used for videos that are
   * of type: mp4, or quicktime.
   * @param {*} cancelFunc - The function to be called when the cancel button is clicked
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createVideoElement(cancelFunc) {
    let cancelUploadBtn, ele;
    ele = document.createElement("i");
    ele.classList.add(
      "ri-video-chat-line",
      "video-preview-icon",
      "file-removal"
    );
    cancelUploadBtn = document.createElement("i");
    cancelUploadBtn.classList.add(
      "ri-close-line",
      "cancel-upload-button"
    );
    cancelUploadBtn.onclick = cancelFunc;
    ele.appendChild(cancelUploadBtn);
    return ele;
  }
  /**
   * Creates the element for a default file type. This is used for files that
   * are (probably) not images, videos, or audio.
   * @param {*} cancelFunc - The function to be called when the cancel button is clicked
   * @returns {HTMLElement} - The element to be added to the DOM
   */
  createDefaultElement(cancelFunc) {
    let cancelUploadBtn, ele;
    ele = document.createElement("i");
    ele.classList.add(
      "ri-file-line",
      "file-preview-icon",
      "file-removal"
    );
    cancelUploadBtn = document.createElement("i");
    cancelUploadBtn.classList.add(
      "ri-close-line",
      "cancel-upload-button"
    );
    cancelUploadBtn.onclick = cancelFunc;
    ele.appendChild(cancelUploadBtn);
    return ele;
  }
  /**
   * Remove the selected preview element.
   * Uses a dataTransfer to circumvent fileList limitations
   * @param {Event} e - The event object
   */
  removePreview(event) {
    const target = event.target.parentNode.closest(".attachment-preview");
    const dataTransfer = new DataTransfer();
    let fileInput = document.getElementById("message_attachments");
    let files = fileInput.files;
    let filesArray = Array.from(files);

    filesArray = filesArray.filter((file) => {
      let filename = target.dataset.filename;
      return file.name !== filename;
    });
    target.parentNode.removeChild(target);
    filesArray.forEach((file) => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    if (filesArray.length === 0) {
      this.toggleVisiblity();
    }
  }
  /**
   * Clear all the preview elements after submit
   */
  clearPreviews() {
    document.getElementById("attachment-previews").innerHTML = "";

    let preview = document.getElementById("attachment-previews");
    preview.classList.add("d-none");
  }
}