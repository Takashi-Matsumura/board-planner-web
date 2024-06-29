import { auth } from "@/auth";
import ScheduleCreatePane from "@/components/schedule-create-pane";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SchedulePage() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <SessionProvider>
      <ScheduleCreatePane />
    </SessionProvider>
  );
}
