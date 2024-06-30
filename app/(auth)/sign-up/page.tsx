import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8 text-white">
      <div className="space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight">
            Create a new account
          </h2>
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="hover:underline" prefetch={false}>
              Sign in
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          <Button variant="secondary" className="w-full">
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign up with Google
          </Button>
          <Button className="w-full border border-neutral-700">
            <FaGithub className="w-5 h-5 mr-2" />
            Sign up with GitHub
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="w-32 h-[1px] bg-neutral-800" />
          <p className="text-center text-sm text-neutral-400">
            Or continue with
          </p>
          <span className="w-32 h-[1px] bg-neutral-800" />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
