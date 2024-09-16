"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // Domyślnie "/test"

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signAction = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });
    if (signAction.ok) {
      let redurectUrl = callbackUrl;
      if (callbackUrl?.startsWith(window.location.origin)) {
        redurectUrl = redurectUrl?.slice(window.location.origin?.length);
      }

      return router.push(redurectUrl);
    }

    setError(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex flex-col w-96 border rounded bg-white shadow-md px-8 pt-6 pb-8 mb-4 divide-y gap-2"
    >
      <div className="flex flex-col">
        <h2>Zaloguj</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            onChange={() => setError(false)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Hasło
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="password"
            onChange={() => setError(false)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          type="submit"
        >
          Zaloguj
        </button>
        {error ? (
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-4"
            role="alert"
          >
            <p>Wystąpił błąd</p>
          </div>
        ) : null}
      </div>
      <div className="mt-2 py-4 gap-2 divide-y flex flex-col">
        <a
          className="inline-block align-baseline font-bold text-sm   text-blue-500 hover:text-blue-800"
          type=""
        >
          Zapomniałeś hasła? Przypomnij
        </a>

        <Link
          href="/auth/register"
          className="bg-blue-500 text-center  hover:bg-blue-700 text-white font-bold py-2 px-4   rounded cursor-pointer focus:outline-none focus:shadow-outline transition-colors"
        >
          Zarejestruj
        </Link>
      </div>
    </form>
  );
}
