<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1 flex-row">
            <NuxtLink to="/" class="btn btn-ghost font-press text-2xl">Dissonance</NuxtLink>
        </div>
        <div class="flex-auto mr-16">
            <Timer :remaining="remaining"/>
        </div>
        
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><NuxtLink to="/jouer" class="btn btn-ghost text-l">Le Jeu</NuxtLink></li>
                <li><NuxtLink to="/indices" class="btn btn-ghost text-l">Les Indices</NuxtLink></li>
                <li><NuxtLink to="/aide" class="btn btn-ghost text-l">Aidez-moi</NuxtLink></li>             
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLobbyTimer } from '#imports';
const { remaining } = useLobbyTimer()
</script>

