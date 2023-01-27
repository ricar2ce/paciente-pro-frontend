<template>
  <q-page class="q-pa-md q-mt-lg">
    <div class="row q-col-gutter-md">
      <div class="col">
        <RCountPercentCard label="De Cuidado" :value="cuidado" :percent="parseInt(porCientoCuidado)" />
      </div>
      <div class="col">
        <RCountPercentCard label="Menos Grave" :value="menosGrave" :percent="parseInt(porCientoMenosGrave)" />
      </div>
      <div class="col">
        <RCountPercentCard label="Grave" :value="grave" :percent="parseInt(porCientoGrave)" />
      </div>
      <div class="col">
        <RCountPercentCard label="Muy Grave" :value="extremaGravedad" :percent="parseInt(porCientoExtremaGravedad)" />
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col">
        <q-table
          ref="table"
          title="Pacientes"
          :rows="pacientes"
          :columns="columns"
          row-key="id"
          :pagination="pagination"
          :loading="loading"
          table-header-class="text-secondary text-weight-bolder text-h6"
          dense
          :filter="filter"
          @request="loadData"
          card-class="br-5"
          @row-dblclick="onRowDblClick"
        >
          <template v-slot:top-left>
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <div class="q-ml-md text-bold text-left text-h6">
                <q-icon name="las la-user-friends" class="text-white bg-secondary q-pa-sm rounded-borders shadow-4" />
                Pacientes
              </div>
            </div>
          </template>
          <template v-slot:top-right>
            <div class="row items-center justify-end q-col-gutter-md">
              <div class="col-8">
                <q-input
                  v-model="filter"
                  placeholder="Buscar"
                  class="q-mb-none"
                  style="min-width: 250px;"
                  outlined
                  dense
                >
                  <template v-slot:append>
                    <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer" />
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-btn
                  unelevated
                  color="positive"
                  @click="onCreate"
                  icon="las la-plus"
                  style="max-width: 36px"
                >
                  <q-tooltip >Crear Nuevo</q-tooltip>
                </q-btn>
              </div>
              <div class="col">
                <q-btn icon="las la-sync" @click="loadData" unelevated class="q-mr-md">
                  <q-tooltip >Actualizar</q-tooltip>
                </q-btn>
              </div>
            </div>
          </template>

          <template v-slot:body-cell-number="props">
            <q-td :props="props">
              {{props.rowIndex + 1}}
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense flat round color="primary" icon="las la-edit" @click="onRowDblClick(null,props.row)" />
              <q-btn dense flat round color="negative" icon="las la-trash-alt" @click="onRemove(props.row.id)" />
            </q-td>
          </template>
          <template v-slot:bottom>
            <RPagination :pagination="pagination" @updatePag="updatePagination" />
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog
      v-model="modal"
      :auto-close="false"
      @hide="onHide"
    >
      <q-card class="br-10" style="width: 700px; max-width: 60vw;">
        <q-toolbar>
          <q-toolbar-title><span class="q-pl-lg text-weight-bold">{{ !selected ? 'Crear' : 'Editar' }} Paciente</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup/>
        </q-toolbar>

        <q-card-section>
          <Form :selected="selected" :item="selected" @updateData="loadData" @finish="finish" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import { useQuasar } from 'quasar';
import RCountPercentCard from "components/RCountPercentCard.vue";
import RPagination from "components/RPagination.vue";
import Form from "./PacientesForm.vue";

const $q = useQuasar();

const columns = [
  {
    name: 'number',
    label: 'No.',
    field: 'number',
    align: 'left',
    sortable: false,
  },
  {
    name: "attributes",
    label: "Nombre",
    field: "attributes",
    align: "left",
    sortable: false,
    format: (val) => val.nombre,
    style: "width: 200px"
  },
  {
    name: "attributes",
    label: "Apellidos",
    field: "attributes",
    align: "left",
    sortable: false,
    format: (val) => val.apellidos,
    style: "min-width: 200px"
  },
  {
    name: "attributes",
    label: "Historia Clínica",
    field: "attributes",
    align: "left",
    sortable: false,
    format: (val) => val.hc,
  },
  {
    name: "attributes",
    label: "Estado",
    field: "attributes",
    align: "left",
    sortable: false,
    format: (val) => val.estado,
  },
  {
    name: "actions",
    label: "Acciones",
    align: "right",
    sortable: false
  }
];
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 1000
});

const loading = ref(false);
const table = ref(null)
const filter = ref('');
const selected = ref(null);
const modal = ref(false);
const pacientes = ref([]);
const total = ref(0);
const cuidado = ref(0);
const menosGrave = ref(0);
const grave = ref(0);
const extremaGravedad = ref(0);

const porCientoCuidado = computed(() => {
  return ((cuidado.value / total.value) * 100).toFixed(0);
});

const porCientoMenosGrave = computed(() => {
  return ((menosGrave.value / total.value) * 100).toFixed(0);
});

const porCientoGrave = computed(() => {
  return ((grave.value / total.value) * 100).toFixed(0);
});

const porCientoExtremaGravedad = computed(() => {
  return ((extremaGravedad.value / total.value) * 100).toFixed(0);
});

function loadData() {
  selected.value = null
  loadPatients()
}

function onCreate() {
  modal.value = true
}

async function onEdit(item) {
  selected.value = await item
  modal.value = true
}

function onRowDblClick(evt, item, index) {
  onEdit(item)
}

/**
 * @param {Object} newPaginationValues
 * page
 * pageCount
 * pageSize
 * total
 */
async function updatePagination(newPaginationValues) {
  pagination.value.page = newPaginationValues.page
  pagination.value.rowsPerPage = newPaginationValues.pageSize
  pagination.value.rowsNumber = newPaginationValues.total
  // table.value.requestServerInteraction()
}

async function updateSort(sortBy) {
  pagination.value =  {
    ...pagination.value,
    sortBy,
    descending: !pagination.value.descending,
  }
  loadData()
}

function onHide() {
  selected.value = null
}

function loadPatients() {
  loading.value = true;
  fetch( "http://localhost:1337/api/pacientes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0MTAzMDg4LCJleHAiOjE2NzY2OTUwODh9.9RllB2ZGW3AjMk5BBCqFS7cS5G33hH84abSZ2-qwcTE"//localStorage.getItem("token"),
    }
  })
    .then( response => response.json() )
    .then( data => {
      console.log('data', data)
      pacientes.value = data.data;
      total.value = data?.meta?.pagination?.total;
      cuidado.value = data?.data?.filter( p => p?.attributes?.estado === "De Cuidado" ).length || 0;
      menosGrave.value = data?.data?.filter( p => p.attributes?.estado === "Menos Grave" ).length || 0;
      grave.value = data?.data?.filter( p => p.attributes?.estado === "Grave" ).length || 0;
      extremaGravedad.value = data?.data?.filter( p => p.attributes?.estado === "De Extrema Gravedad" ).length || 0;
      updatePagination(data.meta.pagination);
      loading.value = false;
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: "negative",
        position: "top",
        icon: "error",
      });
      console.error("Error:", error);
    })
    .finally(() => {
      loading.value = false;
    });
}

function onRemove(id) {
  $q.dialog({
    title: "Confirmación",
    message: "¿Está seguro de eliminar el registro?",
    cancel: true,
    persistent: true
  }).onOk(() => {
    fetch( "http://localhost:1337/api/pacientes/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application",
        "authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0MTAzMDg4LCJleHAiOjE2NzY2OTUwODh9.9RllB2ZGW3AjMk5BBCqFS7cS5G33hH84abSZ2-qwcTE"
      }
    })
      .then( response => response.json() )
      .then( data => {
        $q.notify({
          message: "Registro eliminado",
          color: "positive",
          position: "top",
          icon: "done",
        });
        loadData();
      })
      .catch((error) => {
        $q.notify({
          message: error.message,
          color: "negative",
          position: "top",
          icon: "error",
        });
        console.error("Error:", error);
      })
      .finally(() => {
        loading.value = false;
      });
  });
}

onMounted(() => {
  loadData()
})

async function finish() {
  loadData()
  onHide()
  modal.value = false
}

// loadPatients();
</script>

<style scoped>

</style>
