
export interface IUser {
    id: string,
    name: string,
    phone: string,
    email: string,
    properties: Array<number>
}

export interface IUserSales {
    id: string,
    brokerId: string,
    createdAt: string,
    propertyId: number,
    type: string
}

export interface IUserRequest {
    id: string,
    brokerId: string,
    clientName: string
}

export interface IPropertyUser {
    property_direct: Array<number>
}