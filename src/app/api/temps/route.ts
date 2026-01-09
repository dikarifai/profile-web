import tempService from "@/domain/temp/tempService";
import { withErrorHandling } from "@/lib/apiWrapper";

export const POST = withErrorHandling(tempService.createTemps, "temps POST")