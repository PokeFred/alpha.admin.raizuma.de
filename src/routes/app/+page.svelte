<script lang="ts">
    import Icon from "svelte-awesome"
    import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp"
    import {goto} from "$app/navigation"
</script>

<div>Hey <Icon data={faThumbsUp} /></div>
<div><button on:click={() => goto("/auth/login")}>Login</button></div>
