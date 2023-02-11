import styles from './checkbox.module.scss'

interface ICheckbox {
  text?: string
}

export const Checkbox = ({ text }: ICheckbox) => (
  <label htmlFor='checkbox' className={styles.checkbox}>
    <input type='checkbox' id='checkbox' name='' />
    <span>{text}</span>
  </label>
)
