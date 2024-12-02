//@ts-nocheck
import NextLink from 'next/link'
import styled from 'styled-components'
import Button from 'src/components/Button'
import ButtonGroup from 'src/components/ButtonGroup'
import Container from 'src/components/Container'
import HeroIllustration from 'src/components/HeroIllustation'
import OverTitle from 'src/components/OverTitle'
import Lottie from 'react-lottie'
// import * as animationData from '../../../public/Line_Connect_Divider_Slanted_Angle_Rotate_Color_Reveal_Stripe_Slide_Text_Animation.json'
// import { useNewsletterModalContext } from 'src/contexts/newsletter-modal.context';
import { media } from '../../utils/media'
import { useRouter } from 'next/router'
import EmblaCarousel from 'src/components/carousel/EmblaCarousel'
import { useEffect } from 'react'
import axios from 'axios'
// import AwesomeSlider from 'react-awesome-slider'
// import AwesomeSliderStyles from 'react-awesome-slider/src/styles'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export default function Hero() {
  // const { setIsModalOpened } = useNewsletterModalContext();
  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const router = useRouter()
  const { query } = router
  const registering = false
  // useEffect(() => {
  //   console.log('query ', query)
  //   console.log('router ', router.asPath)
  //   if (router.asPath.split('&')[0].split('=')[1]) {
  //     const router_path = router.asPath
  //     const accessToken = router.asPath.split('&')[0].split('=')[1]
  //     localStorage.setItem('accessToken', accessToken)
  //   }
  //   console.log('accessToken ', accessToken)
  // }, [router])

    useEffect(() => {

      if(registering) return
      if (router.asPath.includes('#')) {
        const hash = router.asPath.split('#')[1] // Get the part after '#'
        const params = new URLSearchParams(hash) // Parse it using URLSearchParams

        const accessToken = params.get('access_token') // Extract access_token
        const idToken = params.get('id_token') // Extract id_token

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          console.log('Access Token:', accessToken)
        }

        if (idToken) {
          localStorage.setItem('idToken', idToken)
          console.log('ID Token:', idToken)
          registering = true
          registerLoginSSOUser(idToken)
        }
      }
    }, [router])

    const registerLoginSSOUser = async (idToken) => {
      const headers = {
        Authorization: idToken,
        'Content-Type': 'application/json'
      }
 
      try {
        const response = await axios.post(BASE_URL + '/api/authenticate-sso',{}, { headers })
        const data = response?.data
        console.log('DATA ', data)
        // setSavedProjects(data)
        console.log(data)
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
          router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/studio?token=${accessToken}`)
          registering = false
        }
      } catch (error) {
        console.error(error)
        registering = false
      }
    }

  return (
    <HeroWrapper>
      <ImageContainer>
        {/* <HeroIllustration /> */}
        {/* <Lottie
          options={{
            speed: 10,
            renderer: 'html',
            animationData: animationData,
            loop: true,
            autoplay: true
            // path: file.url.split('?')[0]
            // rendererSettings: {
            //   preserveAspectRatio: 'xMidYMid slice'
            // }
          }}
          height={600}
          width={600}
        /> */}
        {/* <AwesomeSlider cssModule={AwesomeSliderStyles}>
          <div data-src='/demo-illustration-1.svg' />
          <div data-src='/demo-illustration-1.svg' />
          <div data-src='/demo-illustration-1.svg' />
        </AwesomeSlider> */}
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </ImageContainer>
      <Contents>
        {/* <CustomOverTitle>the coolest, saas product you have ever seen</CustomOverTitle> */}
        <Heading>Bring your design ideas to life</Heading>
        <Description>
          Our cutting-edge online design software combines the power of AI technology with an extensive library of
          customizable templates, empowering you to express your brand's voice and style through dynamic motion graphics
          and kinetic typography.
        </Description>
        <CustomButtonGroup>
          <Button
            onClick={() => {
              window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/studio?token=${localStorage.getItem('accessToken')}`)
            }}
          >
            Start Designing <span>&rarr;</span>
          </Button>
          <NextLink href='' passHref>
            <OutlinedButton
              transparent
              onClick={() => {
                router.push('/search-animations')
              }}
            >
              Browse Templates <span>&rarr;</span>
            </OutlinedButton>
          </NextLink>
        </CustomButtonGroup>
      </Contents>
    </HeroWrapper>
  )
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 5rem;

  ${media('<=desktop')} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`

const OutlinedButton = styled(Button)`
  border: 1px solid rgb(var(--textSecondary));
  color: rgb(var(--textSecondary));
`

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    max-width: 45rem;
  }

  ${media('<=desktop')} {
    margin-top: 2rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  }
`

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media('<=desktop')} {
    font-size: 1.5rem;
  }
`

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`

const Heading = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`
