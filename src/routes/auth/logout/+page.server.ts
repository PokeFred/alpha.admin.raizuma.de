import type {PageServerLoad} from "./$types"

export const load: PageServerLoad = ({cookies}): any => {
    cookies.delete("access_token", { path: "/" })
    return
}