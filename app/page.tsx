"use client"

import { Hero, About, Pricing, Contact, Container } from "../components/index"

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
        <About />
        <Pricing />
        <Contact />
      </Container>
    </>
  );
}
