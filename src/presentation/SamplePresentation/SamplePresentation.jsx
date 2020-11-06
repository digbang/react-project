import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import SampleStore from 'stores/SampleStore'

const SamplePresentation = observer(({ sampleStore }) => <div>{sampleStore.sampleVariable}</div>)

SamplePresentation.propTypes = {
  sampleStore: PropTypes.instanceOf(SampleStore).isRequired,
}

export default SamplePresentation
