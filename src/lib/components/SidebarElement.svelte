<script lang="ts">
    import { goto } from "$app/navigation";
    import {faImage} from "@fortawesome/free-solid-svg-icons/faImage";
    import Icon from "svelte-awesome";
    import type {IconDefinition} from "@fortawesome/free-regular-svg-icons";

    export let url: string = "/"
    export let appendClasses: string = ""
    export let activeIcon: IconDefinition = faImage
    export let passivIcon: IconDefinition = faImage

    function clickAction(): void {
        goto(url)
    }
</script>

<button on:click={clickAction} class="w-64 h-16 flex justify-start items-center group/element {appendClasses}">
    <div class="w-16 h-16 text-slate-400 flex justify-center items-center transition-colors duration-300 group-hover/element:text-slate-100">
        <Icon class="w-9 h-9" data={passivIcon} />
    </div>
    <div class="w-48 h-16 text-3xl text-slate-400 flex justify-start items-center transition-colors duration-300 px-2 group-hover/element:text-slate-100">
        <slot />
    </div>
</button>
