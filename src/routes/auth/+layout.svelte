<script lang="ts">
    import AuthHeaderButton from "$components/AuthHeaderButton.svelte"
</script>

<div class="top-0 left-0 w-full h-full bg-slate-900 flex justify-center items-center absolute">
    <div class="w-auto h-auto bg-slate-800 rounded-3xl p-4">
        <div class="w-80 h-auto flex justify-center items-center">
            <AuthHeaderButton text="Log In" newUrl="/auth/login" appendClasses="rounded-l-xl" />
            <AuthHeaderButton text="Sign Up" newUrl="/auth/register" appendClasses="rounded-r-xl" />
        </div>
        <slot />
    </div>
</div>
