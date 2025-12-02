import blogService from "@/domain/blog/blogService";
import { withErrorHandling } from "@/lib/apiWrapper";

export const GET = withErrorHandling(blogService.getBlogsBySlug, "blog GET")
export const PATCH = withErrorHandling(blogService.patchBlogs, "blog PATCH")