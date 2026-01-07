import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";


export function withAuth<P extends object>(
	Component: React.ComponentType<P>,
) {
	const AuthProtectedPage = async (props: P) => {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			redirect("/login");
		}

		return <Component {...props} session={session} />;
	};

	return AuthProtectedPage;
}
