"use client";

import Navigation from "./Navigation";
import SignButton from "../client/SignButtons";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  return (
    <header className="  bg-gray-800 p-4 text-white ">
      <div className="container mx-auto flex justify-between items-center">
        <Navigation session={session} />
        <div className="flex gap-x-4">
          {session?.data?.user ? (
            <div className="mr-4">
              <p>Zalogowany jako: </p>
              <p>{session?.data?.user?.name}</p>
            </div>
          ) : null}
          <SignButton isLoggedUser={session?.data?.user?.id} />
        </div>
      </div>
    </header>
  );
};

export default Header;
