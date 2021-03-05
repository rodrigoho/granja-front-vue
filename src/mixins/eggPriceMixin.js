import { mapActions, mapGetters } from 'vuex';

export const eggPriceMixin = {
  methods: {
    ...mapActions(['updateRedEgg']),
    updateRegEggs(redEggsTax) {
      this.redEggsList.map((egg) => {
        const whiteEgg = this.getEggsList.find((wEgg) => wEgg.color === 'Branco' && wEgg.size === egg.size);
        const objectToSend = {
          egg,
          additionalFee: redEggsTax,
          whiteEggPrice: whiteEgg.price,
        };
        this.updateRedEgg(objectToSend);
      });
    },
  },
  computed: {
    ...mapGetters(['getEggsList']),
    redEggsList() {
      return this.getEggsList.filter((egg) => egg.color === 'Vermelho');
    },
  },
};
