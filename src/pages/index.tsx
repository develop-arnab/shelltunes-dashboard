// import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
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
export default function Homepage({ posts } : any) {
  return (
    <>
      {/* <Head>
        <meta
          name="description"
          content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
        />
      </Head> */}
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
              Elevate your message with customizable text animations. Tailor the text to fit your brand’s voice and
              style, ensuring your message not only reaches but resonates with your audience.
            </p>
          </BasicSection>
          <BasicSection
            imageUrl='/demo-illustration-2.svg'
            title='Animated Templates Library'
            overTitle='Social Media'
            // reversed
          >
            <p>
              Explore our extensive collection of animated design templates for every occasion and purpose. From vibrant
              social media posts to engaging promotional videos, our templates are designed to make your content stand
              out.
            </p>
            <ul>
              <li>Social Media Posts</li>
              <li>Advertisements</li>
              <li>Promotions</li>
              <li>Wedding Invitations</li>
              <li>Animated Design templates</li>
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

// export async function getStaticProps() {
//   return {
//     props: {
//       posts: await getAllPosts(),
//     },
//   };
// }
