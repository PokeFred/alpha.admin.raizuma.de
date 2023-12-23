import type {Handle} from "@sveltejs/kit"

export async function handle({ event, resolve }): Promise<Handle> {
    console.log("pre-processing")
    const response = await resolve(event, {
        transformPageChunk: ({html}): string => {
            console.log("transformPageChunk")
            return html
        },
        preload: (): void => {
            console.log("preload")
        },
        filterSerializedResponseHeaders: (): void => {
            console.log("filterSerializedResponseHeaders")
        }
    });
    console.log("post-processing")

    return response
}
