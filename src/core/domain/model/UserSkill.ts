import { Skill } from "./Skill";

export type UserSkill = {
    id: number;
    personnalNote: string;
    skillLevel: SkillLevel;
    skill: Skill;
}

export enum SkillLevel{
    Begginer = "Débutant",
    Intermediate = "Intermédiaire",
    Experimented = "Experimenté",
    Expert = "Expert"
}