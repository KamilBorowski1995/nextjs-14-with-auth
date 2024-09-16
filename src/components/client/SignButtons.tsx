"use client";

import { signIn, signOut } from "next-auth/react";

export default function SignButton({
  isLoggedUser,
}: {
  isLoggedUser: boolean;
}) {
  return (
    <button
      onClick={() => (isLoggedUser ? signOut() : signIn())}
      className="bg-blue-700 hover:bg-blue-600 transition-all text-white font-bold py-2 px-4 rounded"
    >
      {isLoggedUser ? "Wyloguj" : "Zaloguj"}
    </button>
  );
}
