export type Session = {
    isLogged: boolean;
    userProfile: {
        username: string;
        role: string;
        department: string;
    };
}

export type DataTableHeader = {
    key: string,
    value: string
}
export type UserInfo = {
    id: string
    username: string,
    password: string,
    roleId: string,
    departmentId: string,
}