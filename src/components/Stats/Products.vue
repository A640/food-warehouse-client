<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    data () {
      return {
          created: false,
      }
    },


    computed:{
        c_data(){
            let dat = this.$store.getters.getProductsStats;
            let  datacollection =  {
                labels: dat.products,
                datasets: [
                    {
                        label: this.$t('products.products'),
                        borderColor: '#4795bf',
                        // pointBackgroundColor: 'rgba(0,0,0,0)',
                        // pointBorderColor: 'rgba(0,0,0,0)',
                        // pointHoverBorderColor: '#f69119',
                        // pointHoverBackgroundColor: '#fff',
                        // pointHoverRadius: 10,
                        // pointHitRadius: 50,
                        // pointHoverBorderWidth: 1,
                        borderWidth: 1,
                        backgroundColor: '#5898bb',
                        data: dat.quantities_regular,
                    },
                     {
                        label: this.$t('products.discountedProducts'),
                        borderColor: '#8ca6b3',
                        // pointBackgroundColor: 'rgba(0,0,0,0)',
                        // pointBorderColor: 'rgba(0,0,0,0)',
                        // pointHoverBorderColor: '#f69119',
                        // pointHoverBackgroundColor: '#fff',
                        // pointHoverRadius: 10,
                        // pointHitRadius: 50,
                        // pointHoverBorderWidth: 1,
                        borderWidth: 1,
                        backgroundColor: '#b1d0e0',
                        data: dat.quantities_discount,
                    }
                ]
            };
        let options = {
            scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                stacked: true,
                gridLines: {
                    display: true
                }
                }],
                xAxes: [ {
                gridLines: {
                    display: true
                },
                stacked: true,
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
                return `${currentValue.toLocaleString()} ${dataset.label}`
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
        this.$store.dispatch('getProductsStats').then( () => {
            this.renderChart(this.c_data.datacollection, this.c_data.options);
            this.created = true;
        })
    }
  }
</script>