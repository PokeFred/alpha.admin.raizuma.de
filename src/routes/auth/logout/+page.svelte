<script lang="ts">
    import type {PageServerData} from "./$types"
    import {browser} from "$app/environment"
    import {goto} from "$app/navigation"

    export let data: PageServerData

    if (browser) {
        goto("/auth/login")
    }
</script>
