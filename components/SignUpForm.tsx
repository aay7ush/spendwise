"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import addUserToDb from "@/actions/addUserToDb";

export default function SignUpForm() {
  const router = useRouter();

  const signUpUser = async (formData: FormData) => {
    const { success, message } = await addUserToDb(formData);
    if (success) {
      toast.success(message);
      router.push("/sign-in");
    } else {
      toast.error(message);
    }
  };

  return (
    <form className="space-y-4" action={signUpUser}>
      <div>
        <Label htmlFor="name" className="text-neutral-400">
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className="mt-1 bg-black border border-neutral-700"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-neutral-400">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="mt-1 bg-black border border-neutral-700"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-neutral-400">
            Password
          </Label>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          className="mt-1 bg-black border border-neutral-700"
        />
      </div>
      <Button variant="secondary" type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
