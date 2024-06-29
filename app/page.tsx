import UserButton from "@/components/user-button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-5xl">Hello World</h1>
        <Link
          href="/board"
          className="bg-black text-white border-2 rounded-full px-4 py-2 mt-10"
        >
          Login
        </Link>
        {/* <UserButton /> */}
      </div>
    </div>
  );
}
