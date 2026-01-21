import { ExperienceResponse } from "@/dtos/experience.dto";

export interface ExperienceDetailCreateProps {
    defaultValue?: ExperienceResponse
    mode: "create" | "edit"
}