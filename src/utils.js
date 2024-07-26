export function searchItems(items, query) {
  if (!Array.isArray(items) || typeof query !== "string") {
    console.error("Invalid arguments passed to searchItems");
    return [];
  }

  if (query.trim() === "") {
    return items;
  }

  return items.filter((item) =>
    item.txt.toLowerCase().includes(query.trim().toLowerCase())
  );
}

export function paginateItems(items, page, itemsPerPage) {
  if (
    !Array.isArray(items) ||
    typeof page !== "number" ||
    typeof itemsPerPage !== "number"
  ) {
    console.error("Invalid arguments passed to paginateItems");
    return [];
  }

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return items.slice(start, end);
}
