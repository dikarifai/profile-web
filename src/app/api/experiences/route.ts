import experienceService from "@/domain/experience/experienceService"
import { withErrorHandling } from "@/lib/apiWrapper"

export const GET = withErrorHandling(experienceService.getExperience, "experiences GET")
export const POST = withErrorHandling(experienceService.createExperience, "experiences POST")