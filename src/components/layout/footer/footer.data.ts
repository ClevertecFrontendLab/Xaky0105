import facebook from '@/assets/images/social/facebook.svg'
import instagram from '@/assets/images/social/instagram.svg'
import linkedin from '@/assets/images/social/linkedin.svg'
import vk from '@/assets/images/social/vk.svg'

interface IFooterLink {
  img: string
  alt: string
  to: string
}

export const footerLinks: IFooterLink[] = [
  {
    img: facebook,
    alt: 'facebook',
    to: 'https://www.facebook.com/',
  },
  {
    img: instagram,
    alt: 'instagram',
    to: 'https://www.instagram.com/',
  },
  {
    img: vk,
    alt: 'vk',
    to: 'https://vk.com/',
  },
  {
    img: linkedin,
    alt: 'linkedin',
    to: 'https://www.linkedin.com/',
  },
]
