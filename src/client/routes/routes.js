export const routes = [
    {
        match: '/',
        alias: 'auth',
        menu: true,
        component: () => import('@pages/auth.svelte'),
        props: { title: 'auth', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/pages',
        alias: 'pages',
        menu: true,
        component: () => import('@pages/pages.svelte'),
        props: { title: 'pages' }
    },
    {
        match: '/users',
        alias: 'users',
        menu: true,
        component: () => import('@pages/users.svelte'),
        props: { title: 'users' }
    },
    {
        match: '*',
        alias: '404',
        menu: false,
        component: () => import('@pages/error404.svelte'),
        props: { title: '404', keywords: 'keywords', description: 'description' }
    },
];

import { writable, derived, get } from 'svelte/store';
import { router } from "tinro";

export const path = derived(router, $router =>
    routes.find((route) => route.match.includes($router.path)) ||
    routes[routes.length - 1]);
