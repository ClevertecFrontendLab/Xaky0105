import classNames from 'classnames'

import { Card } from '@/components/card/card'

import { IBook } from '@/types/books'
import { TypeSortMainPage } from '@/types/other'

import styles from './card-list.module.scss'

interface ICardList {
  selectSorting: TypeSortMainPage
  cardsData: IBook[]
  inputText: string
}

export const CardList = ({ selectSorting, cardsData, inputText }: ICardList) => (
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
