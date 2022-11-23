<template>
  <main class="container my-2">
    <h1 class="text-center my-2">Gerenciar documentos</h1>
    <Dashboard />
  </main>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: "Docs-App",
  components: {
    Dashboard
  },

  data() {
    return {};
  },
};
</script>

<style></style>
