import React from "react";

import VerifyCodeMail from "@/components/business/auth/verifyCodeMail";

// import FormSignUp from "./components/formSignUp";
import IntroSection from "./components/introSection";

export default function SignIn() {
  return (
    <section className="flex h-screen text-sm">
      <IntroSection />
      {/* <FormSignUp /> */}
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div>
          <VerifyCodeMail email="caonam81@gmail.com" />
        </div>
      </div>
    </section>
  );
}
