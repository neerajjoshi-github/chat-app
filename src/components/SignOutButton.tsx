"use client";
import React, { useState } from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

const SignOutButton = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error("There was a problem signing out");
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? <Loader2 className="animate-spin h-4 w-4" /> : <LogOut />}
    </Button>
  );
};

export default SignOutButton;
