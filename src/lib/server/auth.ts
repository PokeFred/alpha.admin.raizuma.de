import type {Auth, User} from "@prisma/client"
import type {Cookies} from "@sveltejs/kit"
import db from "$server/database"
import type {ActionResponse, LayoutLoadResponse} from "$utils"

const ACCESS_TOKEN_COOKIE_NAME: string = "access_token"

export async function createUser(username: string, forename: string, surname: string, email: string, password: string, userCookies: Cookies): Promise<ActionResponse> {
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

    return createAuth(user.username, user.password, userCookies)
}

export async function createAuth(username: string, password: string, userCookies: Cookies): Promise<ActionResponse> {
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

    userCookies.set(ACCESS_TOKEN_COOKIE_NAME, auth.access_token, {
        path: "/"
    })

    return {
        success: true,
        message: ""
    }
}

export async function isValidAuth(userCookies: Cookies): Promise<LayoutLoadResponse> {
    const access_token: string | undefined = userCookies.get(ACCESS_TOKEN_COOKIE_NAME)
    if (access_token === undefined) {
        return {
            success: false,
            message: "Error: no valid auth."
        }
    }
    return {
        success: true,
        message: ""
    }
}
