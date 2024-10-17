import Wrapper from "@/components/wrapper";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Wrapper>
        {children}
      </Wrapper>
    </SessionProvider>
  );
}

export default AuthLayout