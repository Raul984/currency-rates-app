<template>
  <div>
    <el-input v-model="searchQuery" placeholder="Пошук валюты" />
    <el-table :data="paginatedCurrencies" style="width: 100%">
      <el-table-column label="⚙️">
        <template #default="scope">
          <div class="buttons">
            <el-button @click="editCurrency(scope.row.cc)" type="primary"
              >✏️</el-button
            >
            <el-button @click="deleteCurrency(scope.row.cc)" type="danger"
              >🗑️</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="txt" label="Валюта" />
      <el-table-column prop="cc" label="Код" class-name="hide-on-mobile" />
      <el-table-column prop="rate" label="Курс" />
      <el-table-column prop="exchangedate" label="Дата змiни" />
    </el-table>
    <el-pagination
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="itemsPerPage"
      :total="filteredCurrencies.length"
      layout="prev, pager, next"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useCurrencyStore } from "../store";
import { searchItems, paginateItems } from "../utils";

const store = useCurrencyStore();
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredCurrencies = computed(() => {
  return searchItems(store.modifiedCurrencies, searchQuery.value);
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

const editCurrency = (currencyCode) => {
  router.push({ name: "EditRate", params: { currencyCode } });
};

const deleteCurrency = (currencyCode) => {
  try {
    store.removeModifiedCurrency(currencyCode);
  } catch (error) {
    console.error("Failed to delete currency:", error);
  }
};
</script>

<style>
@media (max-width: 480px) {
  .hide-on-mobile {
    display: none;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
  .buttons .el-button {
    padding: 5px;
    width: 40px;
  }
  .el-button + .el-button {
    margin-left: 0 ;
  }
  .el-table .cell {
    padding: 0 5px ;
  }
  .el-table .el-table__cell {
    text-align: center ;
  }
  .el-table__body {
    width: auto !important;
  }
}
</style>
