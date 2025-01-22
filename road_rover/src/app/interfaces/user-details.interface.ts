import { CardDetails } from "./card-details.interface";

export interface UserDetails{
    name : string,
    email : string,
    phone : string,
    address : string;
    driversLicense : string,
    cardDetails : CardDetails,
}