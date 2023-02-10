import { FC } from 'react'
import clsx from 'clsx'

import { Card } from '@/components/card/card'

import { ICardData } from '@/types/books'
import { TypeSortMainPage } from '@/types/other'

import styles from './card-list.module.scss'

interface ICardList {
  selectSorting: TypeSortMainPage
  cardsData: ICardData[]
  inputText: string
}

export const CardList: FC<ICardList> = ({ selectSorting, cardsData, inputText }) => (
  <ul className={clsx(styles.cardList, selectSorting === 'list' && styles.cardListLine)}>
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
