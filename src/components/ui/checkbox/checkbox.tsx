import React, { FC } from 'react'

import styles from './checkbox.module.scss'

interface ICheckbox {
  text?: string
}

export const Checkbox: FC<ICheckbox> = ({ text }) => (
  <label htmlFor='checkbox' className={styles.checkbox}>
    <input type='checkbox' id='checkbox' name='' />
    <span>{text}</span>
  </label>
)
