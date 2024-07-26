<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="/">Головна</el-menu-item>
      <el-menu-item index="/modified">Змінені курси</el-menu-item>
      <el-menu-item index="/search">Пошук курса</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const activeIndex = ref(route.path);

const handleSelect = (key) => {
  router.push(key).catch((err) => {
    console.error("Failed to navigate:", err);
  });
};

watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath;
  }
);
</script>

