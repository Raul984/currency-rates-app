import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import moment from "moment";

export const useCurrencyStore = defineStore("currency", () => {
  const modifiedCurrencies = ref(
    JSON.parse(localStorage.getItem("modifiedCurrencies")) || []
  );
  const currencies = ref([]);
  const BASE_URL =
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange";

  const fetchCurrencies = async (date) => {
    try {
      const formattedDate = date
        ? moment(date).format("YYYYMMDD")
        : moment().format("YYYYMMDD");
      const response = await axios.get(
        `${BASE_URL}?date=${formattedDate}&json`
      );
      currencies.value = response.data;
    } catch (error) {
      console.error("Error fetching currencies:", error);
      throw new Error("Unable to fetch currencies at this time.");
    }
  };

  const addModifiedCurrency = (currency) => {
    const index = modifiedCurrencies.value.findIndex(
      (c) => c.cc === currency.cc
    );
    if (index === -1) {
      modifiedCurrencies.value.push(currency);
    } else {
      modifiedCurrencies.value[index] = currency;
    }
    localStorage.setItem(
      "modifiedCurrencies",
      JSON.stringify(modifiedCurrencies.value)
    );
  };

  const removeModifiedCurrency = (currencyCode) => {
    modifiedCurrencies.value = modifiedCurrencies.value.filter(
      (c) => c.cc !== currencyCode
    );
    localStorage.setItem(
      "modifiedCurrencies",
      JSON.stringify(modifiedCurrencies.value)
    );
  };

  return {
    modifiedCurrencies,
    currencies,
    fetchCurrencies,
    addModifiedCurrency,
    removeModifiedCurrency,
  };
});
