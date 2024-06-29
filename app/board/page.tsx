import { auth } from "@/auth";
import BoardPane from "@/components/board-pane";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function BoardPage() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <SessionProvider>
      <BoardPane />
    </SessionProvider>
  );
}
