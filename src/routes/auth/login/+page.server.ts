import type {Actions} from "./$types"
import type {ActionResponse} from "$utils"
import {createAuth} from "$server/auth"

export const actions = {
    default: async ({request, cookies}): Promise<ActionResponse> => {
        try {
            const data = await request.formData()
            let username: FormDataEntryValue | null = data.get("username")
            let password: FormDataEntryValue | null = data.get("password")

            if ((username === null) || (password === null)) {
                return {
                    success: false,
                    message: "Error: username or password is empty."
                }
            }

            if ((username === "") || (password === "")) {
                return {
                    success: false,
                    message: "Error: username or password is empty."
                }
            }

            username = username.toString()
            password = password.toString()

            return await createAuth(username, password, cookies)
        } catch (error: any) {
            console.log(error)

            return {
                success: false,
                message: "Error: internal error."
            }
        }
    }
} satisfies Actions
