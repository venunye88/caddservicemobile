export interface Sale{
    id:string
customerSubscriptionId?:string
name?:string
phoneNumber?:string
total:number
discount:number
grandTotal:number
amountPaid:number
saleType:string
saleDetails:Array<SaleDetail>
}

export interface SaleDetail{
    serviceId:string
    cost:number
}
