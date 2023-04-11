/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "<@>/components/Button";
import React, { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while signing in with Google!!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg p-5 flex flex-col items-center gap-10 border border-gray-500 rounded-lg shadow-2xl">
        <div className="w-40 h-40">
          <img
            className="object-cover w-full h-auto"
            src="/logo/WebWhishper.png"
            alt="Web Wishper Logo Image"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold">
            Sign up with Google
          </h1>
          <Button
            onClick={signInWithGoogle}
            isLoading={isLoading}
            className="w-full mt-8 text-xl"
          >
            {!isLoading && <FcGoogle size={30} className="mr-2" />}
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
