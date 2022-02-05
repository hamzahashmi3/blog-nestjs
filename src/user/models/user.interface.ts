export interface User{
    id?:number,
    userName?:string,
    email?:string,
    password?:string,
    role?:userRoles
}

export enum userRoles {
    ADMIN = 'admin',
    CHEIFEDITR = 'cheifeditor',
    EDITOR = 'editor',
    USER = 'user'
}