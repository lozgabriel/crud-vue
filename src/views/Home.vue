<template>
  <main class="container-fluid my-2">
    <h1 class="text-center my-2">Home</h1>
    <FormDocs />
  </main>
</template>

<script>
import FormDocs from '../components/FormDocs.vue';

export default {
  name: "Home-App",
  components: {
    FormDocs
  },
  data() {
    return {};
  },
};
</script>

<style></style>
