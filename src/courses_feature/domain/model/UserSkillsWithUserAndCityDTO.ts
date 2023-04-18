import { Skill } from "../../../core/domain/model/Skill";
import { UserDTO } from "../../../core/domain/model/UserDTO";

export type UserSkillsWithUserAndCityDTO = {
    id: number;
    personnalNote: string;
    skillLevel: string;
    skill: Skill;
    user: UserDTO;
}