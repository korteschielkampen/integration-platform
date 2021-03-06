import React from 'react'
import classNames from 'classnames'

import styles from './index.module.css'

const Breadcrumb = props => {
  return (
    <div className={styles.crumb}>
      <div
        style={{ borderBottomColor: props.data.color }}
        className={styles.leftArrow}
      />
      <div
        className={styles.crumbContent}
        style={{ backgroundColor: props.data.color }}
      >
        {props.data.name || 'Geen Naam'}
      </div>
      <div
        style={{ borderTopColor: props.data.color }}
        className={styles.rightArrow}
      />
    </div>
  )
}

const generateCrumbs = current => {
  return [
    current.parent && generateCrumbs(current.parent),
    (current.data && (
      <Breadcrumb
        data={current.data}
        key={current.data.categoryID || Math.random()}
      />
    )) || (
      <Breadcrumb
        data={{ color: 'lightgrey', name: 'Geen Hover' }}
        key="leeg"
      />
    ),
  ]
}

export default props => {
  return <div className={styles.crumbs}>{generateCrumbs(props.selected)}</div>
}
