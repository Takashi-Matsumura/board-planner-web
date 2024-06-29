import { auth } from "@/auth";
import SettingsPane from "@/components/settings-pane";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <SessionProvider>
      <SettingsPane />
    </SessionProvider>
  );
}
