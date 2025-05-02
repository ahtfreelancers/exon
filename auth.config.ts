import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

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
            let role_permissions: any
            await jwt.verify(`${response?.data?.data?.token}`, 'this is a secret key and needs to be at least 12 characters', { clockTolerance: 5 }, (err, decoded) => {
              if (err && err.name === 'NotBeforeError') {
                console.error('Token is not yet valid');
              } else if (!err) {
                role_permissions = decoded
                console.log(decoded);
              }
            });
            const user: any = {
              email: email,
              access_token: response?.data?.data?.token,
              role_permissions: role_permissions?.Permission,
              role_id: role_permissions.RoleId,
              role: role_permissions.role
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
