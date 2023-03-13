import classNames from 'classnames'

import { DataTestId } from '../../../types/other'

import sort from './assets/sort.svg'

import styles from './custom-input.module.scss'

type CustomSelectProps = {
  placeholder: string
  dataTestId: DataTestId
  handler: () => void
  shouldRotateImage?: boolean
}

export const CustomSelect = ({
  placeholder,
  dataTestId,
  handler,
  shouldRotateImage,
}: CustomSelectProps) => (
  <button type='button' className={styles.select} data-test-id={dataTestId} onClick={handler}>
    <div
      className={classNames(styles.imgWrap, {
        [styles.rotate]: shouldRotateImage && shouldRotateImage === true,
      })}
    >
      <img src={sort} alt={placeholder} />
    </div>
    {placeholder}
  </button>
)
