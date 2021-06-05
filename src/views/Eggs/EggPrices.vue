<template>
  <div class="eggs">
    <b-container fluid>
      <div>
        <b-row align-h="center" class="align-cards">
          <date-picker-eggs
            :shouldDisplayTitle="false"
            @uepa="handleEggPricesSelect"
            :selectedDateEggs.sync="selectedDateEggs"
            :key="updateKey2"
          />
        </b-row>
        <b-row align-h="center" class="align-cards">
          <egg-prices-list
            :selectedDate="testeDate"
            :eggsColor="'Branco'"
            isEditable
            class="bg-white"
            :key="testeDate"
          />
          <egg-prices-list
            :selectedDate="testeDate"
            :eggsColor="'Vermelho'"
            isEditable
            class="bg-white"
            :key="testeDate"
          />
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import EggPricesList from '@/components/EggPricesList.vue';
import DatePickerEggs from '@/components/DatePickerEggs.vue';
import { format } from 'date-fns-tz';
import { mapActions, mapGetters } from 'vuex';
import { eggPriceMixin } from '@/mixins/eggPriceMixin.js';

export default {
  name: 'EggPrices',
  mixins: [eggPriceMixin],
  components: {
    EggPricesList,
    DatePickerEggs,
  },
  data() {
    return {
      todaysEggPrices: true,
      selectedDateEggs: localStorage.getItem('selectedEggPriceDate'),
      eggPriceNewDate: localStorage.getItem('selectedEggPriceDate'),
      customDateTimestamp: null,
      testeDate: format(new Date(), 'dd/MM/yyyy'),
    };
  },
  mounted() {
    this.handleLoadEggList();
  },
  methods: {
    ...mapActions(['loadEggsList', 'loadEggPricesList', 'loadRedEggsList']),
    async handleLoadEggList() {
      await this.loadEggsList();

      this.updateRedEggs(this.getAdditionalFee.current_fee_price);
    },

    async handleEggPricesSelect(selectedDates) {
      this.customDateTimestamp = new Date(
        format(new Date(selectedDates.formattedDateTimestamp), 'yyyy-MM-dd HH:mm:ss', 'America/Sao_Paulo')
      );

      this.testeDate = selectedDates.formattedSelectedDate;
      if (this.selectedDateEggs) {
        const objectToSend = {
          selected_date: selectedDates.formattedSelectedDate,
        };

        await this.loadEggPricesList(objectToSend);

        this.customDate = selectedDates.formattedSelectedDate;
      }
    },
  },
  computed: {
    ...mapGetters(['getRedEggsList', 'getWhiteEggsList', 'getAdditionalFee']),
    updateKey2() {
      return this.eggPriceNewDate;
    },
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 150px;
  display: flex;
  align-items: flex-start;
}

.bg-white {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 0 5px;
}
</style>
