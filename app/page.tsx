'use client';
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <p className="text-red-600 font-bold"> Only Authenciated Users can see it</p>
      <UserButton
        afterSignOutUrl="/"
      />
    </>
  );
}
