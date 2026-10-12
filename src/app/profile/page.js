import Link from "next/link";
import { requireSession } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession();
  return (
    <div className="mx-auto my-20 w-[calc(100%-2rem)] max-w-[736px]">
      <h1 className="mb-2 text-[30px] font-bold">আমার প্রোফাইল</h1>
      <p className="mb-8 text-base text-muted">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center gap-4 pt-2 pb-6 max-[600px]:flex-wrap max-[600px]:gap-3">
          <span
            className="grid size-20 shrink-0 place-items-center rounded-full bg-[#e0eee2] text-[38px] max-[600px]:size-14 max-[600px]:text-[28px]"
            aria-hidden="true"
          >
            {user.name.charAt(0)}
          </span>
          <div className="min-w-0 [overflow-wrap:anywhere] max-[600px]:min-w-[180px] max-[600px]:flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted">{user.email}</p>
          </div>
          <LogoutButton className="btn disabled:opacity-50 focus-visible:outline-brand ml-auto h-auto min-h-10 shrink-0 rounded-lg border border-line bg-transparent px-[18px] py-[9px] text-sm font-semibold text-ink shadow-none hover:border-[#c6d4c6] hover:bg-[#e6ede6] motion-reduce:transition-none max-[600px]:m-0" />
        </div>
        <div className="rounded-xl border border-line bg-page p-5">
          <h2 className="mb-5 text-lg font-semibold">তথ্য</h2>
          <dl className="mb-6">
            <div className="flex justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">নাম</dt>
              <dd className="text-right [overflow-wrap:anywhere]">
                {user.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">ইমেইল</dt>
              <dd className="text-right [overflow-wrap:anywhere]">
                {user.email}
              </dd>
            </div>
          </dl>
          <Link
            href="/profile/update"
            className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334] w-full"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
