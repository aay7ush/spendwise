import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8 text-white">
      <div className="space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="hover:underline" prefetch={false}>
              Sign up
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          <Button variant="secondary" className="w-full">
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
          <Button className="w-full border border-neutral-700">
            <FaGithub className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="w-32 h-[1px] bg-neutral-800" />
          <p className="text-center text-sm text-neutral-400">
            Or continue with
          </p>
          <span className="w-32 h-[1px] bg-neutral-800" />
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-neutral-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
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
              placeholder="••••••••"
              className="mt-1 bg-black border border-neutral-700"
            />
          </div>
          <Button variant="secondary" type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
