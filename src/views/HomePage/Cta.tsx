//@ts-nocheck
import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';
import ButtonGroup from 'src/components/ButtonGroup';
import Container from 'src/components/Container';
import OverTitle from 'src/components/OverTitle';
import SectionTitle from 'src/components/SectionTitle';
import { media } from '../../utils/media'

export default function Cta() {
  return (
    <CtaWrapper>
      <Container>
        <Stack>
          <OverTitle>Why Choose Shelltunes?</OverTitle>
          <SectionTitle>The AI-Powered Online Graphic Editor</SectionTitle>
          <Description>
            In the fast-paced digital world, captivating visuals are the key to success. Introducing Shelltunes, the
            revolutionary online design software that harnesses the power of AI to create stunning animated graphics,
            custom text animations, and motion graphic templates tailored to your needs. Say goodbye to static, lifeless
            designs, and hello to dynamic, eye-catching content that leaves a lasting impression.
            <br></br> <br></br>
            Whether you're a marketer, small business owner, event planner, or a creative soul, Shelltunes is your go-to
            platform for bringing your designs to life with dynamic animated templates and AI-powered tools. Join the
            thousands of satisfied users who have already discovered the power of Shelltunes and elevate your content to
            new heights. <br></br> <br></br>
            Explore our extensive library of templates, tools, and resources today! Create your own animation, design
            your dream wedding invitation, craft a viral meme, or develop an engaging presentation that leaves a lasting
            impression. With Shelltunes, the possibilities are endless. Experience the future of design and let your
            creativity soar!
          </Description>
          <ButtonGroup>
            <NextLink href='#early-access' passHref>
              <Button
                onClick={() => {
                  window.open('https://canvas.shelltunes.com/studio')
                }}
              >
                Start Creating Today <span>&rarr;</span>
              </Button>
            </NextLink>
            <NextLink href='#whitepaper' passHref>
              <OutlinedButton transparent>
                Features <span>&rarr;</span>
              </OutlinedButton>
            </NextLink>
          </ButtonGroup>
        </Stack>
      </Container>
    </CtaWrapper>
  )
}

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--textSecondary), 0.8);
  text-align: left;
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12.5rem 0;
  color: rgb(var(--textSecondary));
  text-align: center;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    max-width: 80%;
    margin-top: 4rem;
  }

  ${media('<=tablet')} {
    text-align: center;

    & > *:not(:first-child) {
      max-width: 100%;
      margin-top: 2rem;
    }
  }
`;

const OutlinedButton = styled(Button)`
  border: 1px solid rgb(var(--textSecondary));
  color: rgb(var(--textSecondary));
`;

const CtaWrapper = styled.div`
  background: rgb(var(--secondary));
`;
