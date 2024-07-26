<template>
  <div class="common-layout">
    <el-container style="flex-direction: column">
      <Header />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
</script>
