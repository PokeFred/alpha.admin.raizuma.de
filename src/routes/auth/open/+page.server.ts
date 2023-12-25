import type {Actions} from "./$types"
import type {Auth, User} from "@prisma/client"
import type {ActionResponse} from "$utils"
import db from "$server/database";

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
            //return await createUser(username, forename, surname, email, password, cookies)

            const userAlreadyExists: User[] = await db.user.findMany({
                where: {
                    OR: [
                        {
                            username: username
                        },
                        {
                            email: email
                        }
                    ]
                }
            })

            if (userAlreadyExists.length !== 0) {
                if (userAlreadyExists[0].username === username) {
                    return {
                        success: false,
                        message: "Error: username already exists."
                    }
                }
                else if (userAlreadyExists[0].email === email) {
                    return {
                        success: false,
                        message: "Error: email already exists."
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Error: internal error."
                    }
                }
            }

            const user: User = await db.user.create({
                data: {
                    user_identifier: username,
                    username: username,
                    forename: "",
                    surname: "",
                    email: email,
                    password: password,
                    created_at: Date.now()
                }
            })

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

            const user_identifier_two: string = foundUsers[0].user_identifier
            const foundAuths: Auth[] = await db.auth.findMany({
                where: {
                    user_identifier: user_identifier_two
                }
            })

            let auth: Auth
            if (foundAuths.length === 0) {
                auth = await db.auth.create({
                    data: {
                        user_identifier: user_identifier_two,
                        access_token: password,
                        expires_at: Date.now() + 3600
                    }
                })
            } else if (foundAuths.length === 1) {
                auth = await db.auth.update({
                    where: {
                        user_identifier: user_identifier_two
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
