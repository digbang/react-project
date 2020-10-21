import React from 'react'
import PropTypes from 'prop-types'
import SampleStore from 'stores/SampleStore'
import { withTranslation } from 'react-i18next'
import SamplePresentation from 'presentation/SamplePresentation'
import styles from './sampleScene.module.scss'

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
          <button type="button" onClick={this.randomizeSampleVariable}>
            {t('sampleText')}
          </button>
        </div>
      </>
    )
  }
}

SampleScene.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SampleScene)
