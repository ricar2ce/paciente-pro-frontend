<template>
  <q-form @submit="onSubmit" @reset="onFormReset" class="q-gutter-xs" >
    <q-input
      v-model="form.nombre"
      label="Nombre"
      filled
      lazy-rules
      :rules="[val => val && val.length > 0 || 'El nombre es requerido']"
      dense
      :readonly="loading"
    />
    <q-input
      v-model="form.apellidos"
      label="Apellidos"
      filled
      lazy-rules
      :rules="[val => val && val.length > 0 || 'Los apellidos son requeridos']"
      dense
      :readonly="loading"
    />
    <q-input
      v-model="form.hc"
      label="Historia Clínica"
      filled
      lazy-rules
      :rules="[val => val && val.length > 0 || 'La historia clínica es requerida']"
      dense
      :readonly="loading"
    />
    <q-select
      v-model="form.estado"
      label="Estado"
      filled
      :options="[
        'De Alta',
        'De Cuidado',
        'Menos Grave',
        'Grave',
        'De Extrema Gravedad',
        'Fallecido',
      ]"
      lazy-rules
      :rules="[val => val && val.length > 0 || 'El estado es requerido']"
      dense
      options-dense
      :readonly="loading"
    />
    <q-card-actions align="right" class="q-mt-none">
      <q-btn label="Cancelar" type="reset" color="secondary" flat />
      <q-btn label="Guardar" type="submit" color="secondary" :loading="loading"/>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import {defineProps, onMounted, reactive, ref} from 'vue'
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps({
  item: {
    type: Object,
    default: ()=>
      ({
        id: null,
        attributes: {
          nombre: '',
          apellidos: '',
          hc: '',
          estado: '',
        }
      })
  }
})

const emit = defineEmits(['updateData', 'finish'])

const form = ref({
  id: null,
  nombre: '',
  apellidos: '',
  hc: '',
  estado: ''
})
const loading = ref(false)

onMounted(() => {
  onFormReset()
})

function onFormReset() {
  form.value.id = props?.item?.id || null
  form.value.nombre = props?.item?.attributes.nombre || ''
  form.value.apellidos = props?.item?.attributes.apellidos || ''
  form.value.hc = props?.item?.attributes.hc || ''
  form.value.estado = props?.item?.attributes.estado || ''
}

async function onFinished() {
  emit('finish')
  onFormReset()
}
async function onUpdate() {
  emit('updateData')
  onFormReset()
}

async function onSubmit( event ) {
  event.preventDefault()
  console.log('onSubmit', form.value)
  loading.value = true
  if (form?.value?.id) {
    fetch(`http://localhost:1337/api/pacientes/${props.item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0MTAzMDg4LCJleHAiOjE2NzY2OTUwODh9.9RllB2ZGW3AjMk5BBCqFS7cS5G33hH84abSZ2-qwcTE"
      },
      body: JSON.stringify({
        data: {
          id: form.value.id,
          nombre: form.value.nombre,
          apellidos: form.value.apellidos,
          hc: form.value.hc,
          estado: form.value.estado,
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        onFinished()
        $q.notify({
          message: 'Paciente actualizado',
          color: 'positive',
          position: 'top'
        })
      })
      .catch(err => {
        console.log(err)
        $q.notify({
          message: 'Error al actualizar paciente',
          color: 'negative',
          position: 'top'
        })
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    fetch('http://localhost:1337/api/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0MTAzMDg4LCJleHAiOjE2NzY2OTUwODh9.9RllB2ZGW3AjMk5BBCqFS7cS5G33hH84abSZ2-qwcTE"
      },
      body: JSON.stringify({
        data: {
          nombre: form.value.nombre,
          apellidos: form.value.apellidos,
          hc: form.value.hc,
          estado: form.value.estado,
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        onUpdate()
        $q.notify({
          message: 'Paciente creado',
          color: 'positive',
          position: 'top'
        })
      })
      .catch(err => {
        console.log(err)
        $q.notify({
          message: 'Error al crear paciente',
          color: 'negative',
          position: 'top'
        })
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>

<style scoped>

</style>
