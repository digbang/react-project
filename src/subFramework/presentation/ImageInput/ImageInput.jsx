import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import c from 'classnames'
import ImageInputStore from 'subFramework/stores/ImageInputStore'
import { Button } from 'subFramework'
import styles from './imageInput.scss'

const ImageInput = ({ literal, inputStore, uploadButtonText, placeholder, round }) => {
  const { imageTypeError, imageBase64, urlImage, loadingSaveImage } = inputStore

  const refInput = useRef(null)

  const handleButtonClick = useCallback(() => {
    refInput.current.click()
    document.activeElement.blur()
  }, [])

  const onChangeFile = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()

    const file = e.target.files[0]

    inputStore.selectImage(file)

    e.target.value = null
  }, [])

  let showImage = null

  if (imageBase64) {
    showImage = imageBase64
  } else if (urlImage) {
    showImage = urlImage
  }

  return (
    <>
      {literal ? (
        <div
          className={c(styles.image, styles.literalImage, round && styles.round)}
          style={{ backgroundImage: `url(${showImage})` }}
        >
          {!showImage && placeholder}
        </div>
      ) : (
        <div className={styles.inputAndErrorContainer}>
          <div className={styles.inputContainer}>
            <div
              className={c(
                styles.image,
                loadingSaveImage && styles.loadingImage,
                round && styles.round
              )}
              onClick={handleButtonClick}
              style={
                showImage && {
                  backgroundImage: `url(${showImage})`,
                }
              }
              role="button"
              tabIndex={0}
            >
              {!showImage && placeholder}
            </div>
            <Button
              className={styles.uploadButton}
              onClick={handleButtonClick}
              label={uploadButtonText}
              secondary
              smallest
            />
          </div>
          {imageTypeError.error && <div className={styles.error}>{imageTypeError.message}</div>}
          <input
            style={{ display: 'none' }}
            onChange={onChangeFile}
            accept="image/*"
            ref={refInput}
            type="file"
          />
        </div>
      )}
    </>
  )
}

ImageInput.propTypes = {
  inputStore: PropTypes.instanceOf(ImageInputStore).isRequired,
  uploadButtonText: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  literal: PropTypes.bool,
  round: PropTypes.bool,
}

ImageInput.defaultProps = {
  placeholder: null,
  literal: false,
  round: false,
}

export default React.memo(observer(ImageInput))
