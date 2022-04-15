/*
    This file has interfaces to represent data fields in the input and output files
*/

export interface ICode{
    code?: number;
}

export interface IDetails {
    details: string
}

export interface IError {
    err?: string
}

export interface IItem {
    id: number;
    price: number;
}

export interface ILevel {
    loglevel: string
}

export interface IOrder {
    id: number;
    items: IItem | IItem[];
}

export interface ITimeStamp{
    timestamp:number
}

export interface ITransaction {
    transactionId: string;
}


export interface IUser {
    id: number;
    name?: string;
    orders?: IOrder [];

}

export interface IUserID {
    userId?: string;
}
