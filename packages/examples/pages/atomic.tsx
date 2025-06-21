import React from "react";
import {
  Container,
  Hero,
  // Atomic components are currently disabled
  // SectionAtomicTextColors,
  // SectionAtomicBackgroundColors,
  // SectionAtomicBorderColors,
  // SectionAtomicSizes,
  // SectionAtomicPadding,
  // SectionAtomicMargins,
  // SectionAtomicCombinations,
  // SectionAtomicAdvantages,
} from "../components";

const AtomicPage: React.FC = () => {
  return (
    <Container>
      <Hero
        title="Atomic CSS Utilities"
        description="Single-purpose utility classes for rapid prototyping and consistent spacing."
      />

      {/* Atomic components are currently disabled */}
      <div>
        <p>
          Atomic CSS utilities are currently being updated for the new design
          token system.
        </p>
      </div>

      {/* 
      <SectionAtomicTextColors />

      <SectionAtomicBackgroundColors />

      <SectionAtomicBorderColors />

      <SectionAtomicSizes />

      <SectionAtomicPadding />

      <SectionAtomicMargins />

      <SectionAtomicCombinations />

      <SectionAtomicAdvantages />
      */}
    </Container>
  );
};

export default AtomicPage;
