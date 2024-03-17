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
          <SectionTitle>Bring Your Designs to Life with Dynamic Animated Templates</SectionTitle>
          <Description>
            Choose Shelltunes for an unparalleled design experience. Our platform combines ease of use with powerful,
            dynamic design capabilities, setting your content apart from the static noise. Whether you're a marketer,
            small business owner, or a creative soul, Shelltunes is designed to boost your productivity and unleash your
            creative potential.
          </Description>
          <ButtonGroup>
            <NextLink href='#early-access' passHref>
              <Button
                onClick={() => {
                  window.open('https://create.shelltunes.com/studio')
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
`;

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
