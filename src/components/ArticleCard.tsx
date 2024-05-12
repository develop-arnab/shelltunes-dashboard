//@ts-nocheck
import {useState} from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import styled from 'styled-components';
import { media } from '../utils/media'
import ReactPlayer from 'react-player'

export interface ArticleCardProps {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
}

export default function ArticleCard({ title, slug, imageUrl,thumbnailUrl, description }: ArticleCardProps) {
    const [imageBase64, setImageBase64] = useState('');
  return (
    <NextLink href={'/search-animations/' + slug} passHref>
      <ArticleCardWrapper className='article-card-wrapper'>
        <HoverEffectContainer>
          {/* <ImageContainer> */}
          {/* <NextImage src={imageUrl} layout="fill" objectFit="cover" alt={title} /> */}
          {/* <video width='300' height='100' autoPlay={true} controls>
              <source src={imageUrl} type='video/mp4' />
            </video> */}
          <ReactPlayer
            width='350px'
            height='250px'
            style={{ top: -26 }}
            url={imageUrl}
            // controls={true}
            autoPlay={true}
            playing
            muted={true}
            // light is usefull incase of dark mode
            // light={true}
            light={thumbnailUrl}
            // picture in picture
            // pip={true}
          />
          {/* <video width='350' height='250' style={{position:"absolute",top:"-26px"}} autoPlay={true}>
              <source src={imageUrl} type='video/mp4' />
            </video> */}
          {/* <source src={imageUrl} type='video/mp4' /> */}
          {/* </ImageContainer> */}
          <Content>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Content>
        </HoverEffectContainer>
      </ArticleCardWrapper>
    </NextLink>
  )
}

const ArticleCardWrapper = styled.a`
  display: flex;
  flex-direction: column;
  height: 42rem;
  max-width: 35rem;
  overflow: hidden;
  text-decoration: none;
  border-radius: 0.6rem;
  background: rgb(var(--cardBackground));
  cursor: pointer;
  color: rgb(var(--text));
`;

const HoverEffectContainer = styled.div`
  transition: transform 0.3s;
  backface-visibility: hidden;
  will-change: transform;

  &:hover {
    border-radius: 0.6rem;
    overflow: hidden;
    transform: scale(1.025);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 20rem;

  &:before {
    display: block;
    content: '';
    width: 100%;
    // padding-top: calc((9 / 16) * 100%);
  }

  & > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${media('<=desktop')} {
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 0 2rem;

  & > * {
    margin-top: 2rem;
  }
`;

const Title = styled.h4`
  font-size: 1.8rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Description = styled.p`
  font-size: 1.6rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  opacity: 0.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;
