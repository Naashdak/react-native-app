import { City } from "./City";

export type UserDTO = {
    id: number;
    username: string;
    email: string;
    city: City;
}