
import experienceController from "@/domain/experience/experienceController";
import { withErrorHandling } from "@/lib/apiWrapper";

export const GET = withErrorHandling(experienceController.getExperienceById, "Experience GET")
export const PATCH = withErrorHandling(experienceController.updateExperience, "Experience PATCH")
export const DELETE = withErrorHandling(experienceController.deleteExperience, "Experience DELETE")