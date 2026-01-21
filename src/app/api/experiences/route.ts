import experienceController from "@/domain/experience/experienceController"
import { withErrorHandling } from "@/lib/apiWrapper"

export const GET = withErrorHandling(experienceController.getExperience, "experiences GET")
export const POST = withErrorHandling(experienceController.createExperience, "experiences POST")