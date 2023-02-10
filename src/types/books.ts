export interface ICardData {
  name: string
  rating: number | null
  images: string[]
  authors: string[]
  year: number
  isBusy: boolean
  id: string
  booked: boolean
  category: string
  reviews: IReview[]
}
export interface IReview {
  text: string
  userName: string
  avatar: string
  rating: number
  date: string
  id: number
}

export interface IBook {
  issueYear: string
  rating: number
  title: string
  authors: string[]
  image: {
    url: string
  }
  categories: string[]
  id: number
  booking: {
    id: number
    order: boolean
    dateOrder: string
    customerId: number
    customerFirstName: string
    customerLastName: string
  }
  delivery: {
    id: number
    handed: boolean
    dateHandedFrom: string
    dateHandedTo: string
    recipientId: number
    recipientFirstName: string
    recipientLastName: string
  }
  histories: [
    {
      id: number
      userId: number
    }
  ]
}
