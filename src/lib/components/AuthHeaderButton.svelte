<script lang="ts">
    import { page } from "$app/stores"
    import { afterNavigate, goto } from "$app/navigation"
    import { onMount } from "svelte"

    export let text: string
    export let appendClasses: string
    export let newUrl: string

    let isActive: boolean = false
    let isActiveClasses: string = ""
    function refreshIsActive(): void {
        isActive = ($page.route.id === newUrl)

        if (isActive) {
            isActiveClasses = "h-16 text-slate-100 bg-emerald-500"
        } else {
            isActiveClasses = "h-14 text-slate-400 bg-gray-600"
        }
    }

    onMount(refreshIsActive)
    afterNavigate(refreshIsActive)

</script>

<button on:click={() => goto(newUrl)} class="w-40 text-2xl flex justify-center items-center {isActiveClasses} {appendClasses}">{text}</button>
