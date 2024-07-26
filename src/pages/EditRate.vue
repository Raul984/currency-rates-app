<template>
  <div>
    <el-form v-if="currency" :model="editedRateModel" label-width="120px">
      <el-form-item label="Валюта">
        <el-input v-model="currency.txt" disabled />
      </el-form-item>
      <el-form-item label="Курс">
        <el-input
          v-model.number="editedRateModel.rate"
          type="number"
          :min="0"
          :max="9999999.99"
          step="0.01"
          @input="validateInput"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveRate">Зберегти</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useCurrencyStore } from "../store";

const route = useRoute();
const router = useRouter();
const store = useCurrencyStore();
const currencyCode = route.params.currencyCode;

const currency = computed(() =>
  store.currencies.find((c) => c.cc === currencyCode)
);

const editedRateModel = ref(
  currency.value ? { ...currency.value } : { rate: 0 }
);

watch(currency, (newCurrency) => {
  editedRateModel.value = { ...newCurrency };
});

const saveRate = () => {
  if (currency.value) {
    store.addModifiedCurrency(editedRateModel.value);
    router.push({ name: "ModifiedRates" });
  } else {
    console.error("Currency not found");
  }
};

const validateInput = (value) => {
  // Оставляем только цифры и точку
  const sanitizedValue = value.replace(/[^\d.]/g, "");

  // Проверка на максимальное количество цифр (7 до и 2 после точки)
  const parts = sanitizedValue.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  if (integerPart.length > 7) {
    // Если целая часть превышает 7 цифр, обрезаем
    editedRateModel.value.rate = `${integerPart.slice(0, 7)}.${decimalPart}`;
  } else if (decimalPart.length > 2) {
    // Если дробная часть превышает 2 цифры, обрезаем
    editedRateModel.value.rate = `${integerPart}.${decimalPart.slice(0, 2)}`;
  } else {
    editedRateModel.value.rate = sanitizedValue;
  }
};
</script>

<style scoped>
@media (max-width: 480px) {
  .el-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
