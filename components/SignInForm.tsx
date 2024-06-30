import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

export default function SignInForm() {
  return (
    <form
      className="space-y-4"
      action={async (formData: FormData) => {
        "use server";

        const email = formData.get("email");
        const password = formData.get("password");

        await signIn("credentials", {
          email,
          password,
          redirectTo: "/dashboard",
        });
      }}
    >
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
            className="text-sm font-medium text-primary-foreground hover:underline"
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
        Sign In
      </Button>
    </form>
  );
}
