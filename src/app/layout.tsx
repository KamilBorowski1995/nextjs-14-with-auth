// src/app/layout.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Navigation from "@/components/server/Navigation";
import Providers from "@/components/Providers";
import "@/style/globals.css";
import Header from "@/components/server/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pl">
      <body>
        <Providers session={session}>
          <Header session={session} />
          <main className="container mx-auto mt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
