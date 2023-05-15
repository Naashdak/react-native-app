import { City } from "./City";
import { UserPicture } from "./UserPicture";

export type UserDTO = {
    id: number;
    username: string;
    email: string;
    city: City;
    picture: UserPicture;
}