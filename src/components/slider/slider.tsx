import { Fragment, useState } from 'react'
import classNames from 'classnames'
import SwiperCore, { EffectFade, FreeMode, Pagination, Scrollbar, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { BASE_URL } from '../../api/api'
import { BookImageType } from '../../types/books'
import { DataTestId } from '../../types/other'

import './slider.css'

import 'swiper/css/free-mode'
import 'swiper/css/effect-fade'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css'

type SliderProps = {
  images: BookImageType[]
}

export const Slider = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>()

  return (
    <div
      className={classNames(
        'slider',
        !images?.length && 'not-found-image',
        images?.length === 1 && 'one-image'
      )}
    >
      {images?.length === 1 && <img src={`${BASE_URL}${images[0].url}`} alt='img' />}
      {images?.length > 1 && (
        <Fragment>
          <Swiper
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs, EffectFade, Pagination]}
            className='main-swiper'
            effect='fade'
            data-test-id={DataTestId['slide-big']}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 9,
            }}
          >
            {images.map(image => (
              <SwiperSlide key={image.url}>
                <img src={`${BASE_URL}${image.url}`} alt='img' />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={25}
            slidesPerView={5}
            scrollbar={{ draggable: true }}
            modules={[Thumbs, Scrollbar]}
            watchSlidesProgress={true}
            className={classNames('second-swiper', images?.length < 5 && 'second-swiper-center')}
          >
            {images.map(image => (
              <SwiperSlide key={image.url} data-test-id={DataTestId['slide-mini']}>
                <img src={`${BASE_URL}${image.url}`} alt='img' />
              </SwiperSlide>
            ))}
          </Swiper>
        </Fragment>
      )}
    </div>
  )
}
