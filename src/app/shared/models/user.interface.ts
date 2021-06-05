

export type Roles = 'ADMIN | USER';

export interface User{
    username: string;
    password: string;
}

export interface UserResponse extends User{
    message: string;
    token: string;
    id: number;
    role: Roles;
}

export interface UserDetail{
    id: number,
    username: string,
    password: string,
    role: Roles,
    createAt: Date,
    updateAt: Date,
}