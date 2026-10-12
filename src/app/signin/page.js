import AuthForm from "@/components/AuthForm";
import { enabledProviders } from "@/lib/auth";

export const metadata = { title: "সাইন ইন" };
export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const notice =
    params.reason === "protected"
      ? "এই পেজটি দেখতে আগে সাইন ইন করুন।"
      : params.reason === "social-error" || params.error
        ? "সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।"
        : "";
  return (
    <AuthForm
      mode="signin"
      enabledProviders={enabledProviders}
      notice={notice}
    />
  );
}
