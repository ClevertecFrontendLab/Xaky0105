import styles from './sub-title.module.scss'

export const SubTitle = ({ text }: { text: string }) => <h3 className={styles.subTitle}>{text}</h3>
