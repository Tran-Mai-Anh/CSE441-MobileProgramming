export interface Service{
    _id:string,
    name:string,
    price:number,
    createdBy:string,
    createdAt:string,
    updatedAt:string,
}

export interface Customer{
    _id:string,
    phone:string,
    name:string,
    loyalty:string,
    totalSpent:number,
    status:string,
    createdBy:string,
    __v:number,
}