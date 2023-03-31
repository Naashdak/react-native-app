export type UserSkill = {
    id: number;
    personnalNote: string;
    skillLevel: SkillLevel;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export enum SkillLevel{
    Begginer = "Débutant",
    Intermediate = "Intermédiaire",
    Experimented = "Experimenté",
    Expert = "Expert"
}