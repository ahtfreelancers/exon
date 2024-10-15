import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import axios from "axios";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const response = await axios.post(`${process.env.API_BASE_URL}/accounts/login`, {
            email: email,
            password: password,
          })

          if (!response) return null;

          if (response && response?.data?.isSuccess) {
            const user: any = {
              email: email,
              access_token: response?.data?.data?.token
            }
            return user;
          }

          if (!response.data.isSuccess) {
            throw new Error(response.data.Message || 'Invalid credentials')
          }

          return null;
        }

        return null;
      }
    })
  ]
};

export default authConfig;
