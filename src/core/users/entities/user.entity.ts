import { Role, Status } from "@prisma/client";

export class User {
    username: string;
    password: string;
    first_name: string;
    last_name?: string;
    role?: Role
    profile_image?: string
    status?: Status
    created_at?: Date
    updated_at?: Date
}
