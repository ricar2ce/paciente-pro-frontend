<template>
  <q-page class="q-pa-md q-mt-lg">
    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-sm-12">
        <q-card class="text-secondary br-10">
          <q-card-section>
            <chart-holder-card
              title="Ingresos de la Semana"
              subtitle="Cantidad de Ingresados en la ultima semana"
              update="actualizado hace 2 días"
            >
              <reports-bar-chart
                :chart="{
                  labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
                  datasets: {
                    label: 'Ingresos',
                    data: [13, 20, 10, 2, 15, 10, 5],
                  },
                }"
              />
            </chart-holder-card>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 mt-4 mb-4">
        <q-card class="text-white bg-secondary br-10">
          <q-card-section>
            <chart-holder-card
              title="Fallecidos por Mes"
              update="updated 4 min ago"
              color="success"
            >
              <reports-line-chart
                :chart="{
                  labels: [
                    'Abr',
                    'May',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dic',
                  ],
                  datasets: {
                    label: 'Fallecidos',
                    data: [5, 4, 3, 3, 5, 3, 2, 3, 5],
                  },
                }"
              />
            </chart-holder-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import ChartHolderCard from "./dashboards/components/ChartHolderCard.vue";
import ReportsBarChart from "./../examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "./dashboards/components/ReportsLineChart.vue";

export default {
  name: "DashboardDefault",
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    // MiniStatisticsCard,
  },
  data() {
    return {
    };
  },
};
</script>
