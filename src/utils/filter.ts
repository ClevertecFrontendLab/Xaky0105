import { ICardData } from '@/types/books'

export const getFilterCardsByName = (data: ICardData[], filter: string) =>
  data.filter(elem => elem.name.toLowerCase().includes(filter.toLowerCase()))
