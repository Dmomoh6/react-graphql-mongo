export const filterTransactions = (transactions: any, filters: any) => {
  if (isEmpty(filters)) return transactions;

  return transactions.filter((transactions: any) => {
    return Object.keys(filters).every((accessor) => {
      const value = transactions[accessor];
      const searchValue = filters[accessor];

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue));
      }

      if (isNumber(value)) {
        return value === searchValue;
      }

      return false;
    });
  });
};

export const filterTransactionsByType = (transactions: any, types: any) => {
  if (types === "All") return transactions;

  return transactions.filter((transaction: any) => {
    return transaction.type == types;
  });
};

export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

export function isString(value: String) {
  return typeof value === "string" || value instanceof String;
}

export function isNumber(value: any) {
  return typeof value == "number" && !isNaN(value);
}

export function toLower(value: any) {
  if (isString(value)) {
    return value.toLowerCase();
  }
  return value;
}
