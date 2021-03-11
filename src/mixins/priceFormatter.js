export const priceFormatter = {
  methods: {
    formattedMoneyValue(valueToFormat) {
      const formattedValue = parseFloat(valueToFormat).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });

      return formattedValue;
    },
  },
};
