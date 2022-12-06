import { Subscription } from "rxjs"

export interface Customer{
    id:string
    name:string
    phoneNumber:string
    email:string
    subscriptions:Array<CustomerSubscription>
}

export interface CustomerSubscription{
    id:string
    subscriptionId:string
    customerId:string
    startDate:Date
    endDate:Date
    status:string
    // frequency:string // for end date calculation purposes
}