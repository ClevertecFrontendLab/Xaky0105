import sort from './assets/sort.svg'

import styles from './custom-input.module.scss'

interface ICustomSelect {
  placeholder: string
}

export const CustomSelect = ({ placeholder }: ICustomSelect) => (
  <button type='button' className={styles.select}>
    <div className={styles.imgWrap}>
      <img src={sort} alt={placeholder} />
    </div>
    {placeholder}
  </button>
)
