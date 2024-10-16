import Wrapper from "@/components/wrapper";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { auth } from "../../../auth";

const inter = Inter({ subsets: ["latin"] });

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Wrapper>
            {children}
          </Wrapper>
        </body>
      </html>
    </SessionProvider>
  );
}

export default AuthLayout