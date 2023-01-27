<template>
  <q-layout view="lHh LpR lFf" class="bg-grey-3">
    <q-header class="bg-transparent text-secondary q-mt-md q-mr-md br-10">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawerMini"
        />
        <q-space/>
        <q-btn-dropdown
          flat
          dense
          round
          icon="las la-user"
          aria-label="Usuario"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Help</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Sign out</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          flat
          dense
          round
          icon="las la-cog"
          aria-label="Configuraciónes"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :mini="leftDrawerMini"
      mini-width="90"
      show-if-above
      class="bg-grey-3 q-pa-md"
    >
      <q-scroll-area
        class="fit bg-white shadow-7 br-10"
      >
        <q-list padding>
          <q-item class="q-py-sm q-px-md">
            <q-item-section avatar>
              <q-avatar color="white">
                <img src="~assets/favicon.svg" alt="logo Cargo Pack" >
              </q-avatar>
            </q-item-section>
            <q-item-section class="row flex-inline align-content-start no-wrap">
              <span>PACIENTE <span class="text-weight-bold">PRO</span></span>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-list>
          <r-menu-items :links="linksList" active-class="text-secondary text-weight-bold" />
        </q-list>

        <q-separator class="q-mb-md" />

        <q-list>
          <q-expansion-item
            dense
            icon="las la-cogs"
            expand-icon-class="text-secondary"
            expand-separator
            expand-icon="expand_more"
            collapse-icon="expand_less"
            label="Configuraciónes"
            :content-inset-level="0.5"
          >
            <q-item clickable v-close-popup>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Help</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Sign out</q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-grey-6 bg-transparent q-mb-md q-mr-md br-10">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-caption">Paciente Pro 0.1</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RMenuItems from "components/RMenuItems.vue";

const linksList = [
  {
    text: 'Inicio',
    icon: 'las la-home',
    to: '/inicio'
  },
  {
    text: 'Pacientes',
    icon: 'las la-user-friends',
    to: '/pacientes'
  },
  {
    text: 'Ingresos',
    icon: 'las la-hospital-alt',
    to: '/ingresos'
  },
  {
    text: 'Operaciones',
    icon: 'las la-procedures',
    to: '/operaciones'
  },
  {
    text: 'Traslados',
    icon: 'las la-exchange-alt',
    to: '/traslados'
  },
  {
    text: 'Salas',
    icon: 'las la-hospital-symbol',
    to: '/salas'
  }
]



export default defineComponent({
  name: 'MainLayout',

  components: {
    RMenuItems
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const leftDrawerMini = ref(false)

    return {
      linksList,
      leftDrawerOpen,
      rightDrawerOpen,
      leftDrawerMini,
      toggleLeftDrawerMini () {
        leftDrawerMini.value = !leftDrawerMini.value
      },
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>
