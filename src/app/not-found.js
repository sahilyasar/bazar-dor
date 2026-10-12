import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)]">
      <EmptyState />
    </div>
  );
}
