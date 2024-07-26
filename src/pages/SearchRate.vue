<template>
  <div>
    <Preloader :loading="loading" />

    <div v-if="!loading">
      <div class="search-block">
        <el-date-picker
          v-model="selectedDate"
          @change="fetchCurrencies"
          placeholder="Пошук по даті"
        />
        <el-input
          v-model="searchQuery"
          placeholder="Пошук по назві валюти"
          style="margin-bottom: 16px"
        />
      </div>
      <el-table :data="paginatedCurrencies">
        <el-table-column prop="txt" label="Валюта" />
        <el-table-column prop="cc" label="Код" />
        <el-table-column prop="rate" label="Курс" />
        <el-table-column label="Змінити">
          <template #default="scope">
            <el-button @click="editCurrency(scope.row.cc)" type="primary">
              ✏️
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="itemsPerPage"
        :total="filteredCurrencies.length"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useCurrencyStore } from "../store";
import { searchItems, paginateItems } from "../utils";
import Preloader from "../components/Preloader.vue";


const store = useCurrencyStore();
const router = useRouter();

const searchQuery = ref("");
const selectedDate = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

const loading = ref(false);

const fetchCurrencies = async () => {
  try {
    loading.value = true;
    await store.fetchCurrencies(selectedDate.value);
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
  } finally {
    loading.value = false;
  }
};

const filteredCurrencies = computed(() => {
  return searchItems(store.currencies, searchQuery.value);
});

const paginatedCurrencies = computed(() => {
  return paginateItems(
    filteredCurrencies.value,
    currentPage.value,
    itemsPerPage
  );
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

watch(selectedDate, fetchCurrencies);
watch(searchQuery, () => {
  if (selectedDate.value) {
    fetchCurrencies();
  }
});

const editCurrency = (currencyCode) => {
  router.push({ name: "EditRate", params: { currencyCode } });
};

onMounted(() => {
  fetchCurrencies();
});
</script>

<style scoped>
.search-block {
  display: flex;
  column-gap: 10px;
}
</style>
