import styles from './checkbox.module.scss'

type CheckboxProps = {
  text?: string
}

export const Checkbox = ({ text }: CheckboxProps) => (
  <label htmlFor='checkbox' className={styles.checkbox}>
    <input type='checkbox' id='checkbox' name='' />
    <span>{text}</span>
  </label>
)
