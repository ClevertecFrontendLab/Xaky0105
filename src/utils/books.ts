import { cardsData } from '@/data/cards'

export const getBookById = (id: string) => cardsData.find(card => card.id === id)
