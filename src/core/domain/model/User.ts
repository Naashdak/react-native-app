import { UserSkill } from "./UserSkill";

export type User = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: string;
    blocked: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    credits: string;
    userSkills: Array<UserSkill>
}