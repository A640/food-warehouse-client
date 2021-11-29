<template>
  <div>
    
    <!-- placeholder while loading data -->
    <v-card v-if="loading_data">
      <v-skeleton-loader 
        class="pr-5 pl-5"
        type="table-heading,  table-row@4,  table-tfoot"
      >
      </v-skeleton-loader>
    </v-card>
    

    <!-- after load show actual data -->
    <v-card v-else>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('tables.order.searchForOrder')"
          single-line
          hide-details
        ></v-text-field>
        

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :expanded.sync="expanded"
        :show-select="false" 
        v-model="selected"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="order.order_id"
      >

      <!-- insert table controls -->
      <!-- <template v-slot:[`item.controls`]="props">
        
      </template> -->

      <!-- insert into item expand slot -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <p class="detail details-name">{{ $t("orders.orderNumber") }}: {{item.order.order_id}}</p>
              <p class="detail details-id">{{ $t("common.status") }}: {{item.order.order_state_display}}</p>
            </div>
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">{{ $t("orders.order") }}:</p>
                <p class="detail detail-title">{{ $t("orders.noOfProducts") }}: <span class="detail detail-value">{{item.products.length}}</span></p>
                <p class="detail detail-title">{{ $t("orders.noOfComplaints") }}: <span class="detail detail-value">{{item.complaints.length}}</span></p>
                <p class="detail detail-title">{{ $t("orders.dateOrdered") }}: <span class="detail detail-value">{{item.order.date}}</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10 mb-1" />
              <div class="cluster ">
                <p class="cluster-title">{{ $t("payment.payment") }}:</p>
                <p class="detail detail-title">{{ $t("payment.paymentType") }}: <span class="detail detail-value">{{item.payment.payment_type}}</span></p>
                <p class="detail detail-title">{{ $t("payment.value") }}: <span class="detail detail-value">{{item.payment.value_display}}</span></p>
                <p class="detail detail-title">{{ $t("common.status") }}: <span class="detail detail-value">{{item.payment.payment_state_display}}</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10 mb-1" />
              <div class="cluster ">
                <p class="cluster-title">{{ $t("address.deliveryAddress") }}:</p>
                <p class="detail detail-value"><span v-if="item.delivery.address.street" class="detail detail-value" >{{item.delivery.address.street}}</span>
                {{item.delivery.address.building_number}}
                <span v-if="item.delivery.address.apartment_number" class="detail detail-value" >/ {{item.delivery.address.apartment_number}}</span>
                </p>
                <p class="detail detail-value">{{item.delivery.address.postal_code}}, {{item.delivery.address.town}}</p>
                <p class="detail detail-value">{{item.delivery.address.country}}</p>
              </div>
            </div>
            <v-divider  inset class="ml-10 mr-10 mt-2" />
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">{{ $t("common.customer") }}:</p>
                <p class="detail detail-title"><span class="detail detail-value">{{item.customer.name + ' ' + item.customer.surname}}</span></p>
                <p class="detail detail-title">{{ $t("common.phone") }}: <span class="detail detail-value">{{item.customer.phone_number}}</span></p>
                <p class="detail detail-title">{{ $t("common.company") }}: <span class="detail detail-value" v-if="item.customer.firm_name != null">{{item.customer.firm_name}}</span>
                <span class="detail detail-value" v-else>-</span></p>
                <p class="detail detail-title">{{ $t("common.taxID") }}: <span class="detail detail-value" v-if="item.customer.tax_id != null">{{item.customer.tax_id}}</span>
                <span class="detail detail-value" v-else>-</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10 mb-1" />
              <div class="cluster">
                <p class="cluster-title">{{ $t("orders.delivery") }}:</p>
                <p class="detail detail-title">{{ $t("tables.complaint.issuedFromWarehouse") }}: <span class="detail detail-value" v-if="item.delivery.remove_from_storage_date">{{item.delivery.remove_from_storage_date}}</span>
                <span class="detail detail-value" v-else>-</span></p>
                <p class="detail detail-title">{{ $t("orders.delivered") }}: <span class="detail detail-value" v-if="item.delivery.delivery_date">{{item.delivery.delivery_date}}</span>
                <span class="detail detail-value" v-else>-</span></p>
              </div>
            </div>
            
            <v-divider  inset class="ml-10 mr-10 mt-2" />

            <div class="cluster mt-4 mb-4 ml-5">
              <v-btn outlined @click="Completation(item.order.order_id)" v-if="item.order.order_state == 'REGISTERED'" >{{ $t("orders.acceptOrder") }}</v-btn>
              <v-btn outlined @click="ReadyToDeliver(item.order.order_id)" v-if="item.order.order_state == 'COMPLETING'" >Oznacz jako gotowe do dostarczenia</v-btn>
              <v-btn outlined @click="showDetails(item.order.order_id)">{{ $t("tables.order.viewOrderSummary") }}</v-btn>
              
            </div>

            <v-divider  inset class="ml-10 mr-10 mt-2" />

            <div class="cluster details-container ml-5">
              <p class="cluster-title">{{ $t("orders.comments") }}:</p>
              <p class="detail detail-title"><span class="detail detail-value">{{item.order.comment}}</span></p>
              
            </div>

          </div>
        </td>
      </template>
      
      </v-data-table>

      
    </v-card>
  </div>
</template>

<script>



export default {

    components: {

    },

    data () {
    return {
      search: '',
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: this.$t('tables.complaint.orderNumber'),
          align: 'start',
          value: 'order.order_id',
        },
        { text: this.$t('common.status'), value: 'order.order_state_display' },
        { text: this.$t('common.customer'), value: 'customer_name' },
        { text: this.$t('orders.noOfProducts'), value: 'products.length', align: 'center'  },
        { text: this.$t('tables.complaint.paymentState'), value: 'payment.payment_state_display',  },
        { text: this.$t('orders.value'), value: "payment.value_display", align:'right'},
        { text: this.$t('common.date'), value: "order.date", align:'center'}
      ],
      orders: [],
      expanded: [],
      selected: [],
      // loading_data: true,
    }  
  },


  methods: {

      showDetails(id){
        
        this.$router.push({ name: 'Order_Details_2', params: {id: id}});
        
      },


      Completation(id){
        let obj={
          state: 'completing',
          id: id,
        }
        this.$store.dispatch('markState',obj).then(() => {
            this.$store.dispatch('getAllOrders');
        })
      },

       ReadyToDeliver(id){
        let obj={
          state: 'ready-to-deliver',
          id: id,
        }
        this.$store.dispatch('markState',obj).then(() => {
            this.$store.dispatch('getAllOrders');
        })
      },

      
      
  },

  computed: {
    loading_data(){
      if(this.$store.getters.getNoConnection){
        return true;
      }else{
        return this.$store.getters.getOrdersLoading;
      }
    },
    reconnected(){
      return this.$store.getters.getReconnected;
    },



  },

  created() {
    this.$store.watch(
      ()=>{
        return this.$store.getters.getOrders // could also put a Getter here
      },
      (newValue)=>{
        //Update data when changed

        let orders = newValue.map((o) => {
          
          //order state change for displaying
          if(o.order.order_state == "PENDING"){
                o.order.order_state_display =  this.$t('orders.state.PENDING');
            }else if(o.order.order_state == "REGISTERED"){
                o.order.order_state_display =  this.$t('orders.state.REGISTERED');
            }else if(o.order.order_state == "CANCELED"){
                o.order.order_state_display =  this.$t('orders.state.CANCELED');
            }else if(o.order.order_state == "COMPLETING"){
                o.order.order_state_display =  this.$t('orders.state.COMPLETING');
            }else if(o.order.order_state == "READY TO DELIVER"){
                o.order.order_state_display =  this.$t('orders.state.READY_TO_DELIVER');
            }else if(o.order.order_state == "OUT FOR DELIVERY"){
                o.order.order_state_display =  this.$t('orders.state.OUT_FOR_DELIVERY');
            }else if(o.order.order_state == "DELIVERED"){
                o.order.order_state_display =  this.$t('orders.state.DELIVERED');
            }else if(o.order.order_state == "RETURNED"){
                o.order.order_state_display =  this.$t('orders.state.RETURNED');
            }else{
                o.order.order_state_display =  this.$t('orders.state.UNKNOWN');
          }

          //payment state for displaying
          if(o.payment.payment_state == "IN PROGRESS"){
                o.payment.payment_state_display =  this.$t('payment.state.IN_PROGRESS');
            }else if(o.payment.payment_state == "COMPLETED"){
                o.payment.payment_state_display =  this.$t('payment.state.COMPLETED');
            }else if(o.payment.payment_state == "REJECTED"){
                o.payment.payment_state_display =  this.$t('payment.state.REJECTED');
            }else if(o.payment.payment_state == "CANCELED"){
                o.payment.payment_state_display =  this.$t('payment.state.CANCELED');
            }else if(o.payment.payment_state == "WAITING FOR PAYMENT"){
                o.payment.payment_state_display =  this.$t('payment.state.WAITING_FOR_PAYMENT');
            }else{
                o.payment.payment_state_display =  this.$t('payment.state.UNKNOWN');
          }

          o.customer_name = o.customer.name + ' ' + o.customer.surname + ' ' + o.customer.firm_name;
          o.payment.value_display = o.payment.value + " zł";


            return o;

        })






        this.orders = orders;
      },
      //To detect nested value changes inside Objects
      {
        deep:true
      }
      )      
  },

  watch:{
    reconnected(val){
      if(val){
        this.$store.dispatch('getAllOrders',true);
      }
    }
  },

  mounted() {
    
    this.orders = this.$store.getters.getOrders;
    this.$store.dispatch('getAllOrders');
  }

}
</script>

<style scoped>
  .details{
    margin: 0;
    padding: 0;
    background-color: white;
    background-color: #F0F2F5;
  }

  .details-container{
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    /* justify-content: center; */
    align-items: flex-start;
    margin-top: 2rem;
  }

  .detail{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: none;
    margin-bottom: 0.4rem;
  }

  .details-name{
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
    
  }

  .details-id{
    font-weight: 400;
    font-size: 0,8rem;
    margin-bottom: 1.5rem;
  }

  .cluster{
    /* width: 50%; */
    display: block;
  }

  .cluster-title{
    color: #acacac;
    font-family: 'Segoe UI';
    font-weight: 400;
    font-size: 0.8rem;
    margin-bottom: 0.9rem;
    /* margin-top: 2rem; */
  }

  .detail-title{
    font-weight: 400;
    font-size: 0.8rem;
  }
  .detail-value{
    font-weight: 600;
    font-size: 1rem;
  }
  .fix{
    min-width: 25%;
  }
  .bg{
    /* background-color: #F0F2F5; */
    /* background-color: rgb(184, 184, 184); */
    background-color: white;
    width: 100%;
    padding: 2rem;
    padding-bottom: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  .right-buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem;
  }
</style>