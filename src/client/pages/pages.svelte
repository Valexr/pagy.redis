<script>
    import { onMount } from "svelte";
    import { date } from "@utils";
    import * as data from "@api/data";

    let pages = [],
        addBookForm = {
            title: "",
            author: "",
            description: "",
        },
        editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        };

    $: console.log(pages);

    onMount(async () => (pages = await data.get("pages")));

    async function addPage() {
        pages = await data.add("pages", addBookForm);
        addtoggle();
    }
    async function copyPage(page) {
        addBookForm = await data.get("pages", page.id);
        pages = await data.add("pages", addBookForm);
    }
    async function editPage(page) {
        editForm = await data.get("pages", page.id);
        updatetoggle();
    }
    async function updatePage() {
        pages = await data.set("pages", editForm, editForm.id);
        updatetoggle();
    }
    async function deletePage(page) {
        pages = await data.del("pages", page.id);
    }

    function initForm() {
        addBookForm.title = "";
        addBookForm.author = "";
        addBookForm.description = "";
        editForm._id = "";
        editForm.title = "";
        editForm.author = "";
        editForm.description = "";
    }
    let addopen = false,
        updateopen = false;

    function addtoggle() {
        initForm();
        addopen = !addopen;
    }

    function updatetoggle() {
        // initForm();
        updateopen = !updateopen;
    }

    function sortby(items) {
        pages = pages.sort((a, b) => {
            return b.id - a.id;
        });
        console.log("sort");
    }

    const sortList = (ev) => {
        pages = ev.detail;
    };
    let sub = false;
</script>

<header class="navbar container p-sticky">
    <section class="navbar-section">
        <button
            class="btn btn-primary btn-action tooltip tooltip-right"
            data-tooltip="Add page"
            on:click={addtoggle}><i class="icon icon-plus" /></button
        >
    </section>
    <section class="navbar-center">
        <h3>{pages.length} pages</h3>
    </section>
    <section class="navbar-section">
        <div class="input-group">
            <input type="text" class="form-input" placeholder="..." />
            <button class="btn btn-primary input-group-btn"
                ><i class="icon icon-search" /></button
            >
        </div>
        <!-- <nav class="btn-group btn-group-block">
            <button
                class="btn"
                class:btn-primary={type === "all"}
                on:click={() => (getAll("*"), (type = "all"))}>All</button
            >
            <button
                class="btn"
                class:btn-primary={type === "pages"}
                on:click={() => getAll("pages")}>pages</button
            >
            <button
                class="btn"
                class:btn-primary={type === "user"}
                on:click={() => (getAll("user*"), (type = "user"))}>User</button
            >
            <button
                class="btn"
                class:btn-primary={type === "role"}
                on:click={() => (getAll("role*"), (type = "role"))}>Role</button
            >
            <button
                class="btn"
                class:btn-primary={type === "animal"}
                on:click={() => (getAll("animal*"), (type = "animal"))}
                >Animal</button
            >
        </nav> -->
    </section>
</header>

<main class="container">
    <section class="column col-12">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th />
                    <th on:click={sortby}>Id</th>
                    <th on:click={sortby}>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Create</th>
                    <th>Update</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each pages as page, i (page.id)}
                    <tr>
                        <td>
                            <button
                                class="btn btn-link btn-action tooltip"
                                data-tooltip="Sub set"
                                on:click={(e) => (sub = !sub)}
                            >
                                <i class="icon icon-more-vert c-move" />
                            </button>
                        </td>
                        <td>{i}</td>
                        <td>{page.title}</td>
                        <td>{page.author}</td>
                        <td>{page.description}</td>
                        <td>{date(page.create)}</td>
                        <td>{date(page.update)}</td>
                        <td>
                            <button
                                class="btn btn-action tooltip"
                                data-tooltip="Edit page"
                                on:click={editPage(page)}
                            >
                                <i class="icon icon-edit" />
                            </button>
                            <button
                                class="btn btn-link btn-action tooltip"
                                data-tooltip="Copy page"
                                on:click={copyPage(page)}
                            >
                                <i class="icon icon-copy" />
                            </button>
                            <button
                                class="btn btn-link btn-action text-error"
                                on:click={deletePage(page)}
                            >
                                <i class="icon icon-delete" />
                            </button>
                        </td>
                    </tr>
                    {#if sub}
                        <tr>
                            <td colspan="7">
                                SubSet SvelteJS + Spectre client, Derver BFF
                                server
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </section>
</main>

<div class="modal" class:active={addopen} id="modal-add">
    <div class="modal-overlay" aria-label="Close" on:click={addtoggle} />
    <div class="modal-container">
        <div class="modal-header">
            <button
                class="btn btn-clear float-right"
                aria-label="Close"
                on:click={addtoggle}
            />
            <div class="modal-title h5">Add a new page</div>
        </div>
        <div class="modal-body">
            <div class="content">
                <div class="form-group">
                    <label class="form-label" for="newTitle">Title</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newTitle"
                        bind:value={addBookForm.title}
                        placeholder="page title"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newAuthor">Author</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newAuthor"
                        bind:value={addBookForm.author}
                        placeholder="page author"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newDescription">
                        Description
                    </label>
                    <textarea
                        class="form-input"
                        rows="5"
                        id="newDescription"
                        bind:value={addBookForm.description}
                        placeholder="page description"
                    />
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" on:click={addPage}>Add page</button>
            <button class="btn btn-link" on:click={addtoggle}>Cancel</button>
        </div>
    </div>
</div>
<div class="modal" class:active={updateopen} id="modal-update">
    <div class="modal-overlay" aria-label="Close" on:click={updatetoggle} />
    <div class="modal-container">
        <form on:submit|preventDefault={updatePage}>
            <div class="modal-header">
                <button
                    class="btn btn-clear float-right"
                    aria-label="Close"
                    on:click|preventDefault={updatetoggle}
                />
                <div class="modal-title h5">Update page</div>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div class="form-group">
                        <label class="form-label" for="newTitle">Title</label>
                        <input
                            class="form-input"
                            type="text"
                            id="newTitle"
                            bind:value={editForm.title}
                            placeholder="page title"
                        />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="newAuthor">Author</label>
                        <input
                            class="form-input"
                            type="text"
                            id="newAuthor"
                            bind:value={editForm.author}
                            placeholder="page author"
                        />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="newDescription">
                            Description
                        </label>
                        <textarea
                            class="form-input"
                            rows="5"
                            id="newDescription"
                            bind:value={editForm.description}
                            placeholder="page description"
                        />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    class="btn btn-primary"
                    aria-keyshortcuts="Enter"
                    type="submit">Update</button
                >
                <button
                    class="btn btn-link"
                    on:click|preventDefault={updatetoggle}>Cancel</button
                >
            </div>
        </form>
    </div>
</div>
