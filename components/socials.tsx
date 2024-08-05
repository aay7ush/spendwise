"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Chrome, ChromeIcon, GithubIcon } from "lucide-react";

export default function Socials() {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex gap-x-3">
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => handleClick("google")}
      >
        <ChromeIcon className="size-6 mr-2" />
        Google
      </Button>
      <Button className="w-full" onClick={() => handleClick("github")}>
        <GithubIcon className="size-6 mr-2" />
        GitHub
      </Button>
    </div>
  );
}
