import type {Actions} from "./$types"
import type {ActionResponse} from "$utils"
import {createUser} from "$server/auth"

export const actions = {
    default: async ({request, cookies}): Promise<ActionResponse> => {
        try {
            const data = await request.formData()
            let username: FormDataEntryValue | null = data.get("username")
            let forename: FormDataEntryValue | null = data.get("forename")
            let surname: FormDataEntryValue | null = data.get("surname")
            let email: FormDataEntryValue | null = data.get("email")
            let password: FormDataEntryValue | null = data.get("password")

            if ((username === null) || (forename === null) || (surname === null) || (email === null) || (password === null)) {
                return {
                    success: false,
                    message: "Error: username, forename, surname, email or password is empty."
                }
            }

            if ((username === "") || (forename === "") || (surname === "") || (email === "") || (password === "")) {
                return {
                    success: false,
                    message: "Error: username, forename, surname, email or password is empty."
                }
            }

            username = username.toString()
            forename = forename.toString()
            surname = surname.toString()
            email = email.toString()
            password = password.toString()

            const user_identifier: string = username
            return await createUser(username, forename, surname, email, password, cookies)
        } catch (error: any) {
            console.log(error)

            return {
                success: false,
                message: "Error: internal error."
            }
        }
    }
} satisfies Actions
