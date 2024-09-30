import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { IoMail } from "@react-icons/all-files/io5/IoMail";
import React from "react";

import AuthWithProvider from "@/components/business/auth/authWithProvider";

export default function FormSignUp() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[700px] space-y-6">
        <h1 className="text-2xl font-bold">Enter your work email</h1>
        <Input
          size="md"
          isRequired
          placeholder="name@work.com"
          type="email"
          startContent={
            <IoMail className="pointer-events-none shrink-0 text-2xl text-default-400" />
          }
        />
        <Button size="md" className="w-full" color="primary">
          Sign Up for Free
        </Button>
        <AuthWithProvider />
        <div className="text-sm text-default-500">
          <span>If you already have an account, </span>
          <Link size="sm" href="/">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
