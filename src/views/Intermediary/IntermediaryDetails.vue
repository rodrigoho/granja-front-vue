<template>
  <div class="intermediary-details">
    <r-header
      :title="'Intermediário'"
      :buttonTitle="'Voltar aos intermediários'"
      :toRouteName="'intermediaries'"
      :shouldShowButton="true"
    />
    <b-container>
      <b-card align-h="center" class="align-cards">
        <template v-slot:header>
          <h4 class="mb-0">{{ getSelectedIntermediary.name }}</h4>
        </template>
        <b-row>
          <b-col><label-value :values="customerData" /></b-col>
        </b-row>
        <template v-slot:footer>
          <div class="footer">
            <b-button size="sm" variant="primary" @click="handleEdit">Editar</b-button>
            <!-- <b-button size="sm" variant="danger" @click="handleDelete">Remover</b-button> -->
          </div>
        </template>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import LabelValue from '@/components/LabelValue.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IntermediaryDetails',
  components: {
    RHeader,
    LabelValue,
  },
  data() {
    return {
      selectedIntermediary: {},
    };
  },
  created() {
    this.handleIntermediaryLoading(this.$route.params.id);
  },
  methods: {
    ...mapActions(['deleteIntermediary', 'loadSelectedIntermediary', 'setIntermediaryToEdit']),
    async handleEdit() {
      // await this.setIntermediaryToEdit(this.customer);
      this.$router.push({ path: `/intermediary/new-intermediary/${this.$route.params.id}` });
    },
    async handleIntermediaryLoading(intermediaryId) {
      await this.loadSelectedIntermediary(intermediaryId);
      this.selectedIntermediary = this.getSelectedIntermediary;
    },
    handleDelete() {
      this.$bvModal
        .msgBoxConfirm('Deseja mesmo excluir este cliente?', {
          centered: true,
          size: 'sm',
          buttonSize: 'sm',
          okTitle: 'Sim',
          cancelTitle: 'Cancelar',
        })
        .then(async (value) => {
          if (value) {
            this.deleteIntermediary(this.selectedIntermediary.id);
            await this.loadIntermediaries();

            this.$router.push({ name: 'customers' });
          }
        })
        .catch((err) => {
          console.log(err);
          // An error occurred
        });
    },
  },
  computed: {
    ...mapGetters(['getSelectedIntermediary']),
    customerData() {
      const c = this.getSelectedIntermediary;
      return [
        {
          label: 'Nome',
          value: c.name,
        },
        {
          label: 'Telefone',
          value: c.phone,
        },
        {
          label: 'Email',
          value: c.email ? c.email : '-',
        },
        {
          label: 'Cidade',
          value: c.city ? c.city : '-',
        },
        {
          label: 'Estado',
          value: c.state ? c.state : '-',
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 50px;
  display: flex;
  background: #fff;
  margin: 50px auto;
  width: 400px;
}
.row {
  padding: 0 5px;
}
.footer {
  button + button {
    margin-left: 10px;
  }
}
</style>
