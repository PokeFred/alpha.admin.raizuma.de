<script lang="ts">
    import {page} from "$app/stores"
</script>

<div class="w-screen h-screen text-black bg-slate-300 flex justify-center items-center">
    <div class="max-w-md p-4">
        <div class="w-auto h-auto text-[135px] font-bold text-center leading-[200px]">
            <p class="text-transparent bg-[url('/space.png')] bg-cover bg-clip-text">Oops!</p>
        </div>
        <div class="w-auto h-auto text-xl font-bold text-center">{$page.status} - {$page.error?.message}</div>
        <div class="mt-2 w-auto h-auto text-base text-center">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</div>
        <div class="router w-auto h-auto p-4 flex justify-evenly items-center isolate">
            <a href="/app" class="
                w-44 h-8 text-xs font-medium text-slate-200 no-underline bg-blue-700 rounded-2xl flex justify-center items-center relative
                before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-blue-700/75 before:rounded-2xl before:cursor-pointer before:transition-all before:duration-300 before:z-[-1] before:absolute
                before:hover:top-2 before:hover:left-2
            ">HOME</a>
            <a href="/auth/login" class="
                w-44 h-8 text-xs font-medium text-slate-200 no-underline bg-blue-700 rounded-2xl flex justify-center items-center relative
                before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-blue-700/75 before:rounded-2xl before:cursor-pointer before:transition-all before:duration-300 before:z-[-1] before:absolute
                before:hover:top-2 before:hover:left-2
            ">LOGIN</a>
        </div>
        <div class="w-auto h-auto text-sm text-center leading-4">Copyright &copy; 2023 by Raizuma. All Rights Reserved.</div>
    </div>
</div>
