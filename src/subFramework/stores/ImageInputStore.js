import { action, observable, makeObservable } from 'mobx'
import Resizer from 'react-image-file-resizer'

class ImageInputStore {
  id = null
  image = null
  imageBase64 = null
  urlImage = null
  savedImage = false
  loadingSaveImage = false
  imageTypeError = { error: false, message: '' }
  maxWidth = 300
  maxHeight = 300
  quality = 100
  compressFormat = 'PNG'
  invalidErrorMessage = 'Invalid File Type'

  constructor() {
    makeObservable(this, {
      // observables
      id: observable,
      image: observable,
      imageBase64: observable,
      urlImage: observable,
      savedImage: observable,
      loadingSaveImage: observable,
      imageTypeError: observable,
      // actions
      setUrlImage: action,
      handleFileRead: action,
      setImageTypeError: action,
      clearImageTypeError: action,
      selectImage: action,
      setImage: action,
    })

    this.fileReader = null
  }

  setUrlImage(value) {
    this.urlImage = value
  }

  setMaxWidth(value) {
    this.maxWidth = value
  }

  setMaxHeight(value) {
    this.maxHeight = value
  }

  setQuality(value) {
    this.quality = value
  }

  setCompressFormat(value) {
    this.compressFormat = value
  }

  setInvalidErrorMessage(value) {
    this.invalidErrorMessage = value
  }

  handleFileRead() {
    Resizer.imageFileResizer(
      this.image, // is the file of the new image that can now be uploaded...
      this.maxWidth, // is the maxWidth of the  new image
      this.maxHeight, // is the maxHeight of the  new image
      this.compressFormat, // is the compressFormat of the  new image
      this.quality, // is the quality of the  new image
      0, // is the ROTATION of the  new image
      (uri) => {
        this.loadingSaveImage = false
        this.imageBase64 = uri
      } // is the callBack function of the new image URI
    )
  }

  setImageTypeError(message) {
    this.imageTypeError = { error: true, message }
  }

  clearImageTypeError() {
    this.imageTypeError = { error: false, message: '' }
  }

  validateImage(file) {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

    if (allowedTypes.indexOf(file.type) === -1) {
      this.setImageTypeError(this.invalidErrorMessage)

      return false
    }

    return true
  }

  selectImage(file) {
    if (this.validateImage(file)) {
      this.clearImageTypeError()

      this.loadingSaveImage = true
      this.image = file
      this.fileReader = new FileReader()
      this.fileReader.onloadend = this.handleFileRead()

      this.fileReader.readAsDataURL(this.image)
    }
  }

  setImage(image) {
    this.image = image
  }

  static convertBase64ToFile(image) {
    const byteString = atob(image.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i)
    }

    const newBlob = new Blob([ab], {
      type: 'image/jpeg',
    })

    return newBlob
  }
}

export default ImageInputStore
