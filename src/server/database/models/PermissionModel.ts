export interface IPermission {
    id: string;
    name: string;
    productCreate: boolean;
    productRead: boolean;
    productUpdate: boolean;
    productDelete: boolean;
    userCreate: boolean;
    userRead: boolean;
    userUpdate: boolean;
    userDelete: boolean;
    permissionCreate: boolean;
    permissionRead: boolean;
    permissionUpdate: boolean;
    permissionDelete: boolean;
}
