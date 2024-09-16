import Link from "next/link";

export default function Navigation({ session }: { session: any }) {
  return (
    <nav className="flex justify-between">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className=" hover:text-gray-400">
            Strona główna
          </Link>
        </li>
        {session?.data?.user ? (
          <li>
            <Link href="/posts" className="hover:text-gray-400">
              Posty
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
