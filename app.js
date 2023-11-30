import express from "express"
import {handler} from "./build/handler.js"

const app = express()
app.use(handler)
app.listen(3000, "127.0.0.1", () => {
    console.log(`[server] running on http://127.0.0.1:3000`)
})
