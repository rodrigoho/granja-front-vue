import { mapActions, mapGetters } from 'vuex';

export const eggPriceMixin = {
  methods: {
    ...mapActions(['updateRedEgg']),
    updateRedEggs(redEggsTax) {
      let updatedRedEggs = [];
      this.redEggsList.map((egg) => {
        const whiteEgg = this.getEggsList.find((wEgg) => wEgg.color === 'Branco' && wEgg.size === egg.size);
        const updatedRedEgg = {
          ...egg,
          price: parseFloat(parseFloat(whiteEgg.price) + parseInt(redEggsTax)).toFixed(2),
        };
        updatedRedEggs.push(updatedRedEgg);
        this.updateRedEgg({ updatedRedEgg });
      });
      return updatedRedEggs;
    },
  },
  computed: {
    ...mapGetters(['getEggsList']),
    redEggsList() {
      return this.getEggsList.filter((egg) => egg.color === 'Vermelho');
    },
  },
};
