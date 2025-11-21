import blogService from "@/domain/blog/blogService";
import { withErrorHandling } from "@/lib/apiWrapper";

export const GET = withErrorHandling(blogService.getBlogs, "blogs GET")