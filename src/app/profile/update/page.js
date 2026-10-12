import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট করুন" };
export default async function UpdateProfilePage() {
  const { user } = await requireSession();
  return <UpdateProfileForm name={user.name} />;
}
