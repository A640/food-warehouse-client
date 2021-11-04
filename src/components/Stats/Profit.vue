<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        created: false,
      }
    },


    computed:{
        c_data(){
            let dat = this.$store.getters.getProfitStats;
            let  datacollection =  {
                labels: dat.dates,
                datasets: [
                    {
                        label: this.$t('common.profitFromSale'),
                        borderColor: '#82b4aa',
                        pointBackgroundColor: 'rgba(0,0,0,0)',
                        pointBorderColor: 'rgba(0,0,0,0)',
                        pointHoverBorderColor: '#82b4aa',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverRadius: 10,
                        pointHitRadius: 50,
                        pointHoverBorderWidth: 1,
                        borderWidth: 1,
                        backgroundColor: '#82b4aa91',
                        data: dat.profits,
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
                return `${currentValue.toLocaleString()} zł`
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
          if(this.created){
            console.log('watch',val)
            this.$data._chart.update();
          }
            
        }
    },

    mounted () {
        this.$store.dispatch('getProfitStats').then( () => {
            this.renderChart(this.c_data.datacollection, this.c_data.options)
        })
    }
  }
</script>