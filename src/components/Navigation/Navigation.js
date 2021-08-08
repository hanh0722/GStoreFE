import React from "react";
import Container from "../../layout/container/container";
import ParticleComponent from "../Particle/Particle";
import Section from "../Section/Section";
import Wave from "./Wave";
const Navigation = () => {
  return (
    <Container>
      <Section />
      <Wave/>
      <ParticleComponent/>
    </Container>
  );
};

export default Navigation;
