<script>
    import { active } from "tinro";
    import { routes, path } from "@routes";
</script>

<header class="navbar container p-fixed p-2 bg-gray">
    <section class="navbar-section">
        <button class="btn btn-action"><i class="icon icon-apps" /></button>
    </section>
    <section class="navbar-center">
        <h1>{$path.alias}</h1>
    </section>
    <section class="navbar-section">
        <nav class="btn-group btn-group-block">
            {#each routes.filter((route) => route.menu) as route}
                <a class="btn" href={route.match} use:active exact>
                    {route.props.title}
                </a>
            {/each}
        </nav>
    </section>
</header>

<style lang="scss">
    @import "../../../node_modules/spectre.css/src/variables";
    header {
        z-index: 100;
        // height: 2.5rem;
        h1 {
            text-transform: uppercase;
            margin: 0;
        }
    }
</style>
