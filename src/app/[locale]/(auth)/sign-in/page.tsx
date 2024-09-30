import React from "react";

import FormSignUp from "./components/formSignUp";
import IntroSection from "./components/introSection";

export default function SignIn() {
  return (
    <section className="flex h-screen text-sm">
      <IntroSection />
      <FormSignUp />
    </section>
  );
}
