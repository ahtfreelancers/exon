import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="h-full flex items-center justify-center bg-[#f7f7f7]">
        {children}
      </div>
    </SessionProvider>
  );
}

export default AuthLayout