<script>
    import { active } from "tinro";
    import { routes, path } from "@routes";
</script>

<footer class="container navbar p-fixed bg-gray">
    <section class="navbar-section">
        <!-- <button class="btn btn-action"><i class="icon icon-apps" /></button> -->
    </section>
    <section class="navbar-center">
        <copy>&copy; {new Date().getFullYear()}</copy>
    </section>
    <section class="navbar-section">
        <!-- <nav class="btn-group btn-group-block">
            {#each routes.filter((route) => route.menu) as route}
                <a class="btn" href={route.match} use:active exact>
                    {route.props.title}
                </a>
            {/each}
        </nav> -->
    </section>
</footer>

<style lang="scss">
    footer {
        z-index: 100;
        height: 2.5rem;
        bottom: 0;
    }
</style>
