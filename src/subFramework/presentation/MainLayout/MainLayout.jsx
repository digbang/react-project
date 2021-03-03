import { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './mainLayout.module.scss'

const MainLayout = ({ sidebar: Sidebar, header: Header, mainContent: MainContent, children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Header />
      </header>
      <nav className={styles.sidebar}>
        <Sidebar />
      </nav>
      <main className={styles.main}>
        <MainContent>{children}</MainContent>
      </main>
    </div>
  )
}

MainLayout.propTypes = {
  sidebar: PropTypes.oneOfType([PropTypes.object]).isRequired,
  header: PropTypes.oneOfType([PropTypes.object]).isRequired,
  mainContent: PropTypes.oneOfType([PropTypes.any]).isRequired,
  children: PropTypes.node.isRequired,
}

export default memo(MainLayout)
