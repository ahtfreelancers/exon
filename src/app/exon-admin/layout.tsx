import Wrapper from "@/components/wrapper";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import { LoadingProvider } from "@/components/loading-context";
// import GlobalSpinner from "@/components/global-spinner";
// import GlobalSpinner from "@/components/global-spinner";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Wrapper>
        {/* <LoadingProvider> */}
       
          {children}
        {/* </LoadingProvider> */}
      </Wrapper>
    </SessionProvider>
  );
}

export default AuthLayout