import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SampleStore from 'stores/SampleStore'
import SamplePresentation from 'presentation/SamplePresentation'
import styles from './sampleScene.module.scss'

const SampleScene = () => {
  const { t } = useTranslation()
  const [sampleStore] = useState(() => new SampleStore())

  const randomizeSampleVariable = () => {
    sampleStore.changeSampleVariable(Math.random())
  }

  return (
    <div className={styles.sampleClass}>
      <SamplePresentation sampleStore={sampleStore} />
      <button type="button" onClick={randomizeSampleVariable}>
        {t('sampleText')}
      </button>
    </div>
  )
}

export default SampleScene
