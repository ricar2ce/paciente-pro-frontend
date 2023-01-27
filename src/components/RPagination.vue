<template>
  <div class="row full-width items-center justify-start q-col-gutter-lg">
    <div class="col-2 q-mt-sm">
      <q-select
        dense
        outlined
        options-dense
        label="filas por pág"
        v-model="pages.rowsPerPage"
        :options="rowsPerPageOptions"
        map-options
        emit-value
        @update:model-value="updatePagination()"
      />
      <!-- @update:model-value="() => $refs.table.requestServerInteraction()" -->
    </div>
    <div class="col">
      <q-pagination
        class="default-pagination-wrapper justify-end"
        input-class="default-pagination-input"
        color="secondary"
        round
        dense
        size="14px"
        v-model="pages.page"
        :max="Number(pagesNumber)"
        :max-pages="7"
        direction-links
        boundary-links
        boundary-numbers
        @update:model-value="updatePagination()"
      ></q-pagination>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits, onMounted, computed} from "vue";

const pages = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 1
})

const emit = defineEmits(['updatePag'])

const props = defineProps({
  pagination: {
    type: Object,
    default: () => ({
      sortBy: 'id',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 1
    })
  },
  rowsPerPageOptions: {
    type: Array,
    default: () => [5, 10, 15, 20, 30, 40, 50, {label: "Todos", value: 0}]
  }
});

onMounted(() => {
  pages.value.rowsNumber = props.pagination.rowsNumber;
  pages.value.rowsPerPage = props.pagination.rowsPerPage;
  pages.value.page = props.pagination.page;
})

function updatePagination() {
  emit('updatePag',pages.value);
}

// Computed ref
const pagesNumber = computed(() => {
  return props.pagination.rowsPerPage === -1 ? 1 : Math.ceil(props.pagination.rowsNumber / props.pagination.rowsPerPage)
})
</script>
