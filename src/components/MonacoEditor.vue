<template>
  <div class="monaco-editor" ref="monaco"></div>
</template>

<script lang="ts" setup>
import loader from '@monaco-editor/loader';
import { ref } from 'vue';


const monaco = ref<HTMLDivElement|null>(null);
</script>

<style scoped>

</style>
