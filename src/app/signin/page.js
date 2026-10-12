import AuthForm from "@/components/AuthForm";

export const metadata = { title: "সাইন ইন" };
export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
