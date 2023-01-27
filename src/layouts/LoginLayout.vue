<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/auth.store';
import { useRouter } from 'vue-router';
const router = useRouter();
// redirect home if already logged in
const authStore = useAuthStore();

if (authStore.getIsAuthenticated) {
  router.push('/');
}
</script>
