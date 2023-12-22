<script lang="ts">
    import type {ActionData} from "./$types"
    import {page} from "$app/stores"
    import {browser} from "$app/environment"
    import {goto} from "$app/navigation"

    export let form: ActionData

    if (browser) {
        if (form !== null) {
            if (form.success === true) {
                goto("/app")
            }
        }
    }
</script>

<form method="POST" action="{$page.route.id}">
    <div class="w-80 h-20 text-3xl text-slate-200 flex justify-center items-center">Log in your Account</div>
    <div class="mt-2 w-80 h-auto text-slate-200 flex">
        <div class="w-20">Username:</div>
        <input type="text" name="username" class="w-60 h-auto bg-transparent border rounded-md px-2">
    </div>
    <div class="mt-4 w-80 h-auto text-slate-200 flex">
        <div class="w-20">Password:</div>
        <input type="text" name="password" class="w-60 h-auto bg-transparent border rounded-md px-2">
    </div>
    <input type="submit" value="LOG IN" class="mt-6 w-80 h-14 text-3xl text-slate-100 bg-emerald-500 rounded-xl flex justify-center items-center cursor-pointer">
    {#if form !== null}
        {#if form.success === false}
            <div class="w-80 h-auto text-md text-red-500 text-center flex justify-center items-center pt-3 px-4">{form.message}</div>
        {/if}
    {/if}
</form>
