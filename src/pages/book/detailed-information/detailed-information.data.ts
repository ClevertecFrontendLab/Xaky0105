import { IBookDetailed } from '@/types/books'

export const detailInfoData = (book: IBookDetailed) => [
  {
    type: 'Издательство',
    value: book.publish,
  },
  {
    type: 'Год издания',
    value: book.issueYear,
  },
  {
    type: 'Страниц',
    value: book.pages,
  },
  {
    type: 'Переплет',
    value: book.cover,
  },
  {
    type: 'Формат',
    value: book.format,
  },
  {
    type: 'Жанр',
    value: book.categories,
  },
  {
    type: 'Вес',
    value: book.weight,
  },
  {
    type: 'ISBN',
    value: book.ISBN,
  },
  {
    type: 'Изготовитель',
    value: book.producer,
  },
]
