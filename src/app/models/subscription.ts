import { Service } from "./service"

export interface Subscription{
    id:string,
    name:string
    fee:number
    frequency:string
    services:Array<Service>
}