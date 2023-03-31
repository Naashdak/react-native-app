import { City } from "./City";
import { UserSkill } from "./UserSkill";

export type UserWithSkillsDTO = {
    id: number;
    username: string;
    email: string;
    city: City;
    userSkills: UserSkill[];
}