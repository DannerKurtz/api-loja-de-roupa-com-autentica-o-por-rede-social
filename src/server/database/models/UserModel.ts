export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    permissionId?: string | null;
}
