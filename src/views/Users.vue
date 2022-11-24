<template>
  <main class="container my-2">
    <h1 class="text-center my-2">Gerenciar usuários</h1>
    <SetUsers />
  </main>
</template>

<script>
import SetUsers from '@/components/SetUsers.vue';

export default {
  name: "Docs-App",
  components: {
    SetUsers
  },

  data() {
    return {};
  },
};
</script>

<style></style>
