<script lang="ts">
    import type {LayoutServerData} from "./$types"
    import {beforeNavigate, goto} from "$app/navigation"
    import SidebarElement from "$components/SidebarElement.svelte"
    import Icon from "svelte-awesome"
    import {faBars} from "@fortawesome/free-solid-svg-icons/faBars"
    import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark"
    import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse"
    import {faUser} from "@fortawesome/free-solid-svg-icons/faUser"
    import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons/faRightFromBracket"

    export let data: LayoutServerData
    let isSidebarOpened: boolean = true

    function toggleSidebar(): void {
        isSidebarOpened = !isSidebarOpened
    }

    beforeNavigate((): void => {
        isSidebarOpened = true
    })
</script>

{#if data.success}
    <div class="top-0 left-0 w-full h-full flex justify-start items-start absolute">
        <!-- Sidebar -->
        <div class="{isSidebarOpened ? 'w-64' : 'w-0'} h-full bg-slate-800 transition-all duration-300 shrink-0">
            <div class="w-64 h-full flex flex-col justify-center items-start">
                <div class="w-64 h-full">
                    <div class="mt-2 w-64 h-12 text-3xl text-slate-200 underline flex justify-center items-center">Admin Panel</div>
                    <SidebarElement url="/app" activeIcon={faHouse} passivIcon={faHouse}>Home</SidebarElement>
                    <SidebarElement url="/app/users" activeIcon={faUser} passivIcon={faUser}>Users</SidebarElement>
                </div>
                <SidebarElement url="/app/settings" appendClasses="shrink-0" activeIcon={faUser} passivIcon={faUser}>My Account</SidebarElement>
                <SidebarElement url="/auth/logout" appendClasses="shrink-0" activeIcon={faRightFromBracket} passivIcon={faRightFromBracket}>Logout</SidebarElement>
            </div>
        </div>
        <div class="w-full h-full text-slate-200 bg-slate-900 flex flex-col justify-start items-start">
            <!-- Header -->
            <div class="w-full h-12 bg-slate-800 shrink-0">
                <button on:click={toggleSidebar} class="{isSidebarOpened ? 'ml-2' : 'ml-0'} w-12 h-12 text-slate-200 flex justify-center items-center">
                    <Icon class="w-9 h-9 border rounded-full p-1" data={!isSidebarOpened ? faBars : faXmark} />
                </button>
            </div>
            <!-- Content -->
            <div class="text-xl" style="padding: 8px; color: rgb(226, 232, 240);">
                <!--
                <slot />
                -->
            </div>
        </div>
    </div>
{:else}
    <div class="top-0 left-0 w-full h-full bg-slate-900 backdrop-blur-sm absolute"></div>
    <div class="top-0 left-0 w-full h-full flex justify-center items-center absolute">
        <div class="w-auto h-auto bg-slate-700 p-2">
            <div>Please log in</div>
            <div><button on:click={() => goto("/auth/login")} class="border">Login</button></div>
        </div>
    </div>
{/if}
