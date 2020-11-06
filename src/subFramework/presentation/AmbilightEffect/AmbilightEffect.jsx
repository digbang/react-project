import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const injectStyle = (style) => {
  const styleElement = document.createElement('style')

  styleElement.appendChild(document.createTextNode(style))

  document.head.appendChild(styleElement)
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const AmbilightEffect = ({ colorHex, animationDuration, fadeInDuration, animated, zIndex }) => {
  const baseStyles = {
    height: '100%',
    left: '0',
    pointerEvents: 'none',
    position: 'fixed',
    top: '0',
    transition: `box-shadow ${fadeInDuration} ease-in-out`,
    width: '100%',
    zIndex,
  }
  const colorRGB = hexToRgb(colorHex)
  const usableColorRBG = `${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}`
  const [styles, setStyles] = useState({
    boxShadow: `box-shadow: inset 0px 0px 110px -51px rgba(${usableColorRBG}, 0)`,
    ...baseStyles,
  })

  useEffect(() => {
    if (animated) {
      injectStyle(`
      @keyframes pulseAmbilight {
        0%   { box-shadow: inset 0px 0px 110px -51px rgba(${usableColorRBG}, 0.5); }
        50%  { box-shadow: inset 0px 0px 110px -20px rgba(${usableColorRBG}, 1); }
        100% { box-shadow: inset 0px 0px 110px -51px rgba(${usableColorRBG}, 0.5); }
      }
    `)
    }

    setTimeout(() => {
      const newStyles = {
        boxShadow: `inset 0px 0px 110px -51px rgba(${usableColorRBG}, 0.5)`,
        ...baseStyles,
      }

      if (animated) {
        newStyles.animation = `pulseAmbilight ${animationDuration} linear infinite`
        newStyles.animationDelay = fadeInDuration
      }

      setStyles(newStyles)
    }, 500)
  })

  return ReactDOM.createPortal(<div style={styles} />, document.body)
}

AmbilightEffect.propTypes = {
  animationDuration: PropTypes.string,
  fadeInDuration: PropTypes.string,
  colorHex: PropTypes.string,
  animated: PropTypes.bool,
  zIndex: PropTypes.string,
}

AmbilightEffect.defaultProps = {
  animationDuration: '10s',
  colorHex: '#ff0000',
  fadeInDuration: '5s',
  animated: true,
  zIndex: '1000',
}

export default AmbilightEffect
