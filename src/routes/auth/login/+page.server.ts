import type {Actions} from "./$types"
import type {Auth, User} from "@prisma/client"
import type {ActionResponse} from "$utils"
import db from "$server/database"

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

            //return await createAuth(username, password, cookies)

            const foundUsers: User[] = await db.user.findMany({
                where: {
                    username: username,
                    password: password
                }
            })

            if (foundUsers.length === 0) {
                return {
                    success: false,
                    message: ""
                }
            }

            if (foundUsers.length > 1) {
                return {
                    success: false,
                    message: ""
                }
            }

            const user_identifier: string = foundUsers[0].user_identifier
            const foundAuths: Auth[] = await db.auth.findMany({
                where: {
                    user_identifier: user_identifier
                }
            })

            let auth: Auth
            if (foundAuths.length === 0) {
                auth = await db.auth.create({
                    data: {
                        user_identifier: user_identifier,
                        access_token: password,
                        expires_at: Date.now() + 3600
                    }
                })
            } else if (foundAuths.length === 1) {
                auth = await db.auth.update({
                    where: {
                        user_identifier: user_identifier
                    },
                    data: {
                        access_token: password,
                        expires_at: Date.now() + 3600
                    }
                })
            } else {
                return {
                    success: false,
                    message: ""
                }
            }

            cookies.set("access_token", auth.access_token, {
                path: "/"
            })

            return {
                success: true,
                message: ""
            }
        } catch (error: any) {
            console.log(error)

            return {
                success: false,
                message: "Error: internal error."
            }
        }
    }
} satisfies Actions
