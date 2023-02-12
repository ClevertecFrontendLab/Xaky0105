import classNames from 'classnames'

import { Card } from '@/components/card/card'

import { BookType } from '@/types/books'
import { TypeSortMainPage } from '@/types/other'

import styles from './card-list.module.scss'

type CardListProps = {
  selectSorting: TypeSortMainPage
  cardsData: BookType[]
  inputText: string
}

export const CardList = ({ selectSorting, cardsData, inputText }: CardListProps) => (
  <ul className={classNames(styles.cardList, selectSorting === 'list' && styles.cardListLine)}>
    {cardsData.map(cardData => (
      <Card
        cardData={cardData}
        selectSorting={selectSorting}
        key={cardData.id}
        inputText={inputText}
      />
    ))}
  </ul>
)
