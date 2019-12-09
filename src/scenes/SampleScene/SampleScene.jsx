import React from 'react'
import PropTypes from 'prop-types'
import SampleStore from "stores/SampleStore"
import { withTranslation } from 'react-i18next'
import styles from './sampleScene.scss'
import SamplePresentation from "presentation/SamplePresentation"

class SampleScene extends React.Component {
    constructor(props) {
        super(props)

        this.sampleStore = new SampleStore()
    }

    randomizeSampleVariable = () => {
        this.sampleStore.changeSampleVariable(Math.random())
    }

    render() {
      const { t } = this.props

      return (
        <>
          <div className={styles.sampleClass}>
            <SamplePresentation sampleStore={this.sampleStore} />
            <button onClick={this.randomizeSampleVariable}>{t('sampleText')}</button>
          </div>
        </>
      )
    }
}

SampleScene.propTypes = {}

export default withTranslation('common')(SampleScene)