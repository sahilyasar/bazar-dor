import AuthForm from "@/components/AuthForm";
import { enabledProviders } from "@/lib/auth";

export const metadata = { title: "অ্যাকাউন্ট তৈরি করুন" };
export default function SignUpPage() {
  return <AuthForm mode="signup" enabledProviders={enabledProviders} />;
}
