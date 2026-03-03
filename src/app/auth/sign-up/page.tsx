import { SignUpForm } from "@/components/sign-up-form";
import Header from "@/components/public/header";

export default function Page() {
  return (
    <div className="min-h-svh w-full">
      <Header />
      <div className="w-full max-w-2xl mx-auto py-10">
        <SignUpForm />
      </div>
    </div>
  );
}
