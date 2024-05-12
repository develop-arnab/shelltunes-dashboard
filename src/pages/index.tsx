// import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import BasicSection from 'src/components/BasicSection'
import Link from 'src/components/Link'
// import { EnvVars } from 'env';
// import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'src/views/HomePage/Cta';
import Features from 'src/views/HomePage/Features';
import FeaturesGallery from 'src/views/HomePage/FeaturesGallery';
import Hero from 'src/views/HomePage/Hero';
import Partners from 'src/views/HomePage/Partners';
import ScrollableBlogPosts from 'src/views/HomePage/ScrollableBlogPosts';
import Testimonials from 'src/views/HomePage/Testimonials';
import {postarray} from '../posts/posts'
import Head from 'next/head'

export default function Homepage({ posts } : any) {
  return (
    <>
      <Head>
        <title>Design Your Own Animated Graphics & Text Effects </title>
        <meta
          name='description'
          content='Design your own engaging animated graphics and text effects effortlessly with the Shelltunes editor and extensive template collection.'
        />
        <meta name='og:title' content='Create your own Text Animations' />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <ScrollableBlogPosts posts={postarray} />
          {/* <Partners /> */}
          <BasicSection
            imageUrl='/demo-illustration-1.svg'
            title='Customizable Text Animations'
            overTitle='Customizable Text Animations'
            reversed
          >
            <p>
              One of Shelltunes' standout features is the ability to create mesmerizing text animations with ease.
              Simply enter your desired text, and our AI-powered platform will generate a range of captivating animation
              options, allowing you to choose the perfect style to bring your message to life. From kinetic typography
              to dynamic text effects, our free text animation tools ensure your content stands out and leaves a lasting
              impression.
            </p>
          </BasicSection>
          <BasicSection
            imageUrl='/demo-illustration-2.svg'
            title='Animated Templates Library'
            overTitle='Social Media'
            // reversed
          >
            <p>
              Shelltunes offers an extensive library of pre-designed templates and resources, catering to various design
              needs and for every occasion and purpose. Whether you're looking to create a viral social media post, an
              eye-catching advertisement, a stunning wedding invitation, or an engaging presentation, our platform has
              you covered.Design your own engaging animated graphics and text effects effortlessly with the Shelltunes
              editor and extensive template collection.
            </p>
            <ul>
              <li>Social Media and Marketing Templates</li>
              <li>Advertisements and Promotions</li>
              <li>Presentation and Creative Templates</li>
              <li>Wedding and Event Design Templates</li>
              <li>YouTube Banners and Flyers</li>
              <li>Export in Multiple Formats</li>
            </ul>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          {/* <FeaturesGallery />
          <Features />
          <Testimonials /> */}
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  )
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;
// export async function getStaticProps(context) {
//     // const res = await axios.get(...);

//     return {
//       // will be passed to the page component as props
//       props: {
//         posts: 'hello'
//       }
//     }
// }
