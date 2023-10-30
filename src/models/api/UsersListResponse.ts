export interface IUserListResponse {
    data: IUserListData;
    error: string;
    message: string;
    status: number;
}

interface IUserListData {
    items: IUserListItem[];
    totalItems: number;
    pageNumber: string;
    pageSize: number;
}

export interface IUserListItem {
    _id: string;
    email: string;
    role: string;
    otp?: string;
    name: string;
    password: string;
    phoneNumber: string;
    countryCode: string;
    zipCode?: string;
    address?: string;
    country?: string;
    state?: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}
