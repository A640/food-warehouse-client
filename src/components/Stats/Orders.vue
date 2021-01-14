<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {

      }
    },


    computed:{
        data(){
            let dat = this.$store.getters.getOrdersStats;
            let  datacollection =  {
                labels: dat.dates,
                datasets: [
                    {
                        label: 'Zamówienia',
                        borderColor: '#f69119',
                        pointBackgroundColor: 'rgba(0,0,0,0)',
                        pointBorderColor: 'rgba(0,0,0,0)',
                        pointHoverBorderColor: '#f69119',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverRadius: 10,
                        pointHitRadius: 50,
                        pointHoverBorderWidth: 1,
                        borderWidth: 1,
                        backgroundColor: '#f6911966',
                    data: dat.amounts,
                    }
                ]
            };
        let options = {
            scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display: true
                }
                }],
                xAxes: [ {
                gridLines: {
                    display: true
                }
                }]
            },
          tooltips: {
            backgroundColor: '#4F5565',
            titleFontStyle: 'normal',
            titleFontSize: 18,
            bodyFontFamily: "'Proxima Nova', sans-serif",
            cornerRadius: 3,
            bodyFontColor: '#f69119',
            bodyFontSize: 14,
            xPadding: 14,
            yPadding: 14,
            displayColors: false,
            mode: 'index',
            intersect: false,
            callbacks: {
              title: tooltipItem => {
                return `${tooltipItem[0].xLabel}`
              },
              label: (tooltipItem, data) => {
                let dataset = data.datasets[tooltipItem.datasetIndex]
                let currentValue = dataset.data[tooltipItem.index]
                return `${currentValue.toLocaleString()}`
              }
            }
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }


        let obj = {
            datacollection: datacollection,
            options: options,
        };

        return obj;
        }
    },

    watch:{
        data(val) {
            console.log('watch',val)
            this.$data._chart.update();
        }
    },

    mounted () {
        this.$store.dispatch('getOrdersStats').then( () => {
            this.renderChart(this.data.datacollection, this.data.options)
        })
    }
  }
</script>