import { auth } from "@/auth";
import ScheduleEditPane from "@/components/schedule-edit-pane";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function ScheduleEditPage() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <SessionProvider>
      <ScheduleEditPane />
    </SessionProvider>
  );
}
