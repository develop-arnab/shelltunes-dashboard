import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = props => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        {/* <div className='embla__container'>
          {slides.map(index => (
            <div className='embla__slide' key={index}>
              <div className='embla__slide__number'>
                <video width='750' height='500' autoPlay={true} controls>
                  <source src={`/featured/c${index + 1}.mp4`} type='video/mp4' />
                </video>
              </div>
            </div>
          ))}
        </div> */}
        <div className='embla__container'>
          <div className='embla__slide'>
            <div className='embla__slide__number'>
              <video width='750' height='500' autoPlay={true} controls>
                <source src={`/featured/shelltunes_promo.mp4`} type='video/mp4' />
              </video>
              {/* {index + 1} */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div> */}
    </section>
  )
}

export default EmblaCarousel
