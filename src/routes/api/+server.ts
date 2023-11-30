import {json} from "@sveltejs/kit"

export function GET(): Response {
    const number: number = Math.floor(Math.random() * 6) + 1

    return json(number)
}
