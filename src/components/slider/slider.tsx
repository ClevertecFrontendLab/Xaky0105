import { FC, Fragment, useState } from 'react'
import clsx from 'clsx'
import SwiperCore, { EffectFade, FreeMode, Pagination, Scrollbar, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useWindowSize } from '@/hooks/use-window-size'

import 'swiper/css/free-mode'
import 'swiper/css/effect-fade'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'

import 'swiper/css'
import './slider.css'

const getSpaceBetween = (windowSizeX: number) => {
  if (windowSizeX < 500) {
    return 10
  }
  if (windowSizeX >= 500 && windowSizeX <= 768) {
    return 8
  }

  return 25
}

interface ISlider {
  images: string[]
}

export const Slider: FC<ISlider> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>()
  const { x: windowSizeX } = useWindowSize()

  return (
    <div
      className={clsx(
        'slider',
        !images.length && 'not-found-image',
        images.length === 1 && 'one-image'
      )}
    >
      {images.length === 1 && <img src={images[0]} alt='img' />}
      {images.length > 1 && (
        <Fragment>
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs, EffectFade, Pagination]}
            className='main-swiper'
            effect='fade'
            data-test-id='slide-big'
            pagination={{ clickable: true }}
          >
            {images.map(image => (
              <SwiperSlide key={image}>
                <img src={image} alt='img' />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={getSpaceBetween(windowSizeX)}
            slidesPerView={5}
            scrollbar={{ draggable: true }}
            modules={[Thumbs, Scrollbar]}
            watchSlidesProgress={true}
            className={clsx('second-swiper', images.length < 5 && 'second-swiper-center')}
          >
            {images.map(image => (
              <SwiperSlide key={image} data-test-id='slide-mini'>
                <img src={image} alt='img' />
              </SwiperSlide>
            ))}
          </Swiper>
        </Fragment>
      )}
    </div>
  )
}
