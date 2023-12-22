import type {LayoutServerLoad} from "./$types"
import type {LayoutLoadResponse} from "$utils"
import {isValidAuth} from "$server/auth"

export const load: LayoutServerLoad = async ({cookies}): Promise<LayoutLoadResponse> => {
    return await isValidAuth(cookies)
}