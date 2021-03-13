import { mapActions, mapGetters } from 'vuex';

export const eggPriceMixin = {
  methods: {
    ...mapActions(['updateRedEgg']),
    updateRedEggs(redEggsTax) {
      let updatedRedEggs = [];
      this.redEggsList.map((egg) => {
        const whiteEgg = this.getEggsList.find((wEgg) => wEgg.color === 'Branco' && wEgg.size === egg.size);
        // console.log('whiteEgg', JSON.stringify(egg));
        const updatedRedEgg = {
          ...egg,
          price: parseFloat(parseFloat(whiteEgg.price) + parseInt(redEggsTax)).toFixed(2),
        };
        updatedRedEggs.push(updatedRedEgg);
        this.updateRedEgg({ updatedRedEgg });
        // console.log('updatedRedEgg', JSON.stringify(updatedRedEgg));
      });
      // console.log(JSON.stringify(this.redEggsList));
      // console.log('uepa', redEggsTax);
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
