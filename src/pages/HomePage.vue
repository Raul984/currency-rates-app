<template>
  <div>
    <Preloader :loading="loading" />
    <div v-if="!loading">
      <h1>Курси валют на сьогодні ({{ selectedDate }})</h1>
      <el-table :data="paginatedCurrencies">
        <el-table-column prop="txt" label="Валюта" />
        <el-table-column prop="cc" label="Код" />
        <el-table-column prop="rate" label="Курс" />
        <el-table-column label="Змінити">
          <template #default="scope">
            <el-button type="primary" @click="editRate(scope.row.cc)"
              >✏️</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="itemsPerPage"
        :total="store.currencies.length"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import moment from "moment";

import { useCurrencyStore } from "../store";
import { paginateItems } from "../utils";
import Preloader from "../components/Preloader.vue";

const store = useCurrencyStore();
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 10;
const selectedDate = ref(moment().format("YYYY-MM-DD"));
const loading = ref(false);

const paginatedCurrencies = computed(() => {
  return paginateItems(store.currencies, currentPage.value, itemsPerPage);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const editRate = (currencyCode) => {
  router.push({ name: "EditRate", params: { currencyCode } });
};

onMounted(async () => {
  try {
    if (!store.currencies.length) {
      loading.value = true;
      await store.fetchCurrencies();
    }
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
.el-table__body {
  width: 100%;
}

.el-table thead tr th {
  font-weight: 900;
  background-color: #f5f5f5;
}
</style>
