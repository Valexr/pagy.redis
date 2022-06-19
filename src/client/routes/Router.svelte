<script>
    import { fade } from "svelte/transition";
    import { Route } from "tinro";
    import { Lazy, path } from "@routes";
</script>

{#key $path.alias}
    <main class="container {$path.alias}" in:fade={{ duration: 700 }}>
        <Route>
            <Route path={$path.match}>
                <Lazy component={$path.component} />
            </Route>
            <Route fallback>
                <Lazy component={$path.component} />
            </Route>
        </Route>
    </main>
{/key}

<style lang="scss">
    main {
        padding: 6em 0 5em;
        &.auth {
            padding: 0;
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }
</style>
