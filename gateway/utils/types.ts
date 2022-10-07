import { User } from "@prisma/client";

export interface UserLogin {
    token?: string;
    userInfo?: User;
}