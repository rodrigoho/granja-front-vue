<template>
  <div class="intermediary-details">
    <r-header
      :title="'Intermediário'"
      :buttonTitle="'Voltar aos intermediários'"
      :toRouteName="'intermediaries'"
      :shouldShowButton="true"
    />
    <!-- <b-container>
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
          </div>
        </template>
      </b-card>
    </b-container> -->
    <b-container>
      <b-row class="flex-cargo-packing" align-h="start">
        <div class="align-toolbar">
          <b-col cols="3">
            <div class="toolbar">
              <div class="teste">
                <b-button @click="handleEdit">Editar</b-button>
                <b-button @click="handleDelete">Deletar</b-button>
              </div>
            </div>
          </b-col>
        </div>

        <div>
          <b-col cols="5">
            <div>
              <b-card class="style-eggs-details">
                <b-row v-for="(cD, idx) in customerData" :key="idx" class="align-data">
                  <b-col cols="5" class="bold">{{ cD.label }}</b-col
                  ><b-col cols="7">{{ cD.value }}</b-col>
                </b-row>
                <b-row class="align-footer-buttons" v-if="isEditing">
                  <b-col class="buttons">
                    <b-button type="button" variant="danger" size="sm">Cancelar</b-button>
                    <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IntermediaryDetails',
  components: {
    RHeader,
  },
  data() {
    return {
      selectedIntermediary: {},
      isEditing: false,
    };
  },
  created() {
    this.handleIntermediaryLoading(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'deleteIntermediaryCustomer',
      'loadSelectedIntermediary',
      'setIntermediaryToEdit',
      'loadIntermediaries',
    ]),
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
        .msgBoxConfirm('Deseja mesmo excluir este intermediário?', {
          centered: true,
          size: 'sm',
          buttonSize: 'sm',
          okTitle: 'Sim',
          cancelTitle: 'Cancelar',
        })
        .then(async (value) => {
          if (value) {
            this.deleteIntermediaryCustomer(this.$route.params.id);
            await this.loadIntermediaries();

            this.$router.push({ name: 'intermediaries' });
          }
        })
        .catch((err) => {
          console.log(err);
          // An error occurred
        });
    },
    valueFormatter(value) {
      return value ? value : '-';
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
          value: this.valueFormatter(c.phone),
        },
        {
          label: 'Email',
          value: this.valueFormatter(c.email),
        },
        {
          label: 'Cidade',
          value: this.valueFormatter(c.city),
        },
        {
          label: 'Estado',
          value: this.valueFormatter(c.state),
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
  width: 700px;
}

.style-eggs-details {
  position: relative;
  display: flex;
  background: #fff;
  margin: 50px auto;
  width: 500px;
}

.align-toolbar {
  position: relative;
  top: 50px;
  margin-bottom: 20px;
}

.align-data {
  min-width: 450px;
}

.toolbar {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

  width: 190px;
  height: 100px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
}

.flex-cargo-packing {
  position: relative;
  left: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.teste {
  position: relative;
  top: 10px;
  display: flex;
  flex-direction: column;
  width: 160px;
  button {
    background: #007bff;
    &:hover {
      background: darken(#007bff, 5%);
    }
  }
  button + button {
    margin-top: 5px;
  }
}

.eggs {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  border-radius: 4px;
  background: rgba(255, 255, 255, 0.95);

  padding: 15px;
  /* height: 295px; */
  min-height: 295px;
  min-width: 500px;
}

.bold {
  font-weight: bold;
}

.row {
  padding: 0 5px;
}
</style>
