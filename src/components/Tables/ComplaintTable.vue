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
          label="Wyszukaj reklamację"
          single-line
          hide-details
        ></v-text-field>
        

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="complaints"
        :search="search"
        :expanded.sync="expanded"
        :show-select="false" 
        v-model="selected"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="complaint.complaint_id"
      >

      <!-- insert table controls -->
      <!-- <template v-slot:[`item.controls`]="props">
        
      </template> -->

      <!-- insert into item expand slot -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <p class="detail details-name">Zamówienie nr: {{item.order.order.order_id}}</p>
              <p class="detail details-id">Status: {{item.order.order.order_state_display}}</p>
              <p class="detail detail-title">Data złożenia zamówienia: <span class="detail detail-value" >{{item.order.order.date}}</span></p>
              <p class="detail detail-title">Data złożenia reklamacji: <span class="detail detail-value" >{{item.complaint.send_date}}</span></p>
              <p class="detail detail-title">Data rozpatrzenia reklamacji: <span class="detail detail-value" >{{item.complaint.decision_date}}</span></p>
            </div>
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">Zamawiający:</p>
                <p class="detail detail-title"><span class="detail detail-value">{{item.order.customer.name + ' ' + item.order.customer.surname}}</span></p>
                <p class="detail detail-title">Telefon: <span class="detail detail-value">{{item.order.customer.phone_number}}</span></p>
                <p class="detail detail-title">Firma: <span class="detail detail-value" v-if="item.order.customer.firm_name != null">{{item.order.customer.firm_name}}</span>
                <span class="detail detail-value" v-else>-</span></p>
                <p class="detail detail-title">NIP: <span class="detail detail-value" v-if="item.order.customer.tax_id != null">{{item.order.customer.tax_id}}</span>
                <span class="detail detail-value" v-else>-</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10 mb-1" />
              <div class="cluster ">
                <p class="cluster-title">Płatność:</p>
                <p class="detail detail-title">Rodzaj płatności: <span class="detail detail-value">{{item.order.payment.payment_type}}</span></p>
                <p class="detail detail-title">Kwota: <span class="detail detail-value">{{item.order.payment.value_display}}</span></p>
                <p class="detail detail-title">Status: <span class="detail detail-value">{{item.order.payment.payment_state_display}}</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10 mb-1" />
              <div class="cluster ">
                <p class="cluster-title">Adres dostawy:</p>
                <p class="detail detail-value"><span v-if="item.order.delivery.address.street" class="detail detail-value" >{{item.order.delivery.address.street}}</span>
                {{item.order.delivery.address.building_number}}
                <span v-if="item.order.delivery.address.apartment_number" class="detail detail-value" >/ {{item.order.delivery.address.apartment_number}}</span>
                </p>
                <p class="detail detail-value">{{item.order.delivery.address.postal_code}}, {{item.order.delivery.address.town}}</p>
                <p class="detail detail-value">{{item.order.delivery.address.country}}</p>
              </div>
            </div>
            <v-divider  inset class="ml-10 mr-10 mt-2" />
            <div class="details-container">
              <div class="cluster ml-5">
                <p class="cluster-title">Dostawa:</p>
                <p class="detail detail-title">Wydano z magazynu: <span class="detail detail-value" v-if="item.order.delivery.remove_from_storage_date">{{item.order.delivery.remove_from_storage_date}}</span>
                <span class="detail detail-value" v-else>-</span></p>
                <p class="detail detail-title">Dostarczono: <span class="detail detail-value" v-if="item.order.delivery.delivery_date">{{item.order.delivery.delivery_date}}</span>
                <span class="detail detail-value" v-else>-</span></p>
              </div>
            </div>
            
            <v-divider  inset class="ml-10 mr-10 mt-2" />

            <div class="cluster mt-4 mb-4 ml-5">
              <Complaint :complaint="item" @pdateComplaintsDetails="reloadData()" />
              <v-btn outlined @click="showDetails(item.order.order.order_id)">Wyświetl podsumowanie zamówienia</v-btn>
            </div>

            <v-divider  inset class="ml-10 mr-10 mt-2" />

            <div class="cluster details-container ml-5">
              <p class="cluster-title">Komentarz do zamówienia:</p>
              <p class="detail detail-title"><span class="detail detail-value">{{item.complaint.comment}}</span></p>
              
            </div>

          </div>
        </td>
      </template>
      
      </v-data-table>

      
    </v-card>
  </div>
</template>

<script>
import Complaint from '@/components/Popups/ComplaintResponse - Manager.vue'


export default {

    components: {
      Complaint,
    },

    data () {
    return {
      search: '',
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'Numer reklamacji',
          align: 'start',
          value: 'complaint.complaint_id',
        },
        { text: 'Status reklamacji', value: 'complaint.state_display' },
        { text: "Data złożenia reklamacji", value: "complaint.send_date", align:'center'},
        {
          text: 'Numer zamówienia',
          align: 'start',
          value: 'order.order.order_id',
        },
        { text: 'Zamawiający', value: 'customer_name' },
        { text: "Kwota zamówienia", value: "order.payment.value_display", align:'right'},
        { text: 'Status płatności', value: 'order.payment.payment_state_display',  },
        
        
      ],
      complaints: [],
      expanded: [],
      selected: [],
      // loading_data: true,
    }  
  },


  methods: {

      showDetails(id){
        
        this.$router.push({ name: 'Order_Details_2', params: {id: id}});
        
      },

      reloadData(){
        this.$store.dispatch('getAllComplaints');
      }
      
  },

  computed: {
    loading_data(){
      if(this.$store.getters.getNoConnection){
        return true;
      }else{
        return this.$store.getters.getComplaintsLoading;
      }
    },
    reconnected(){
      return this.$store.getters.getReconnected;
    },



  },

  created() {
    this.$store.watch(
      ()=>{
        return this.$store.getters.getComplaints // could also put a Getter here
      },
      (newValue)=>{
        //Update data when changed

        let complaints = newValue.map((o) => {
          
          //order state change for displaying
          if(o.order.order.order_state == "PENDING"){
                o.order.order.order_state_display =  "Oczekujące";
            }else if(o.order.order.order_state == "REGISTERED"){
                o.order.order.order_state_display =  'Przyjęte';
            }else if(o.order.order.order_state == "CANCELED"){
                o.order.order.order_state_display =  'Anulowane';
            }else if(o.order.order.order_state == "COMPLETING"){
                o.order.order.order_state_display =  'W trakcie kompletacji';
            }else if(o.order.order.order_state == "READY TO DELIVER"){
                o.order.order.order_state_display =  'Gotowy do dostarczenia';
            }else if(o.order.order.order_state == "OUT FOR DELIVERY"){
                o.order.order.order_state_display =  'W drodze do klienta';
            }else if(o.order.order.order_state == "DELIVERED"){
                o.order.order.order_state_display =  'Dostarczono';
            }else if(o.order.order.order_state == "RETURNED"){
                o.order.order.order_state_display =  'Zwrócone';
            }else{
                o.order.order.order_state_display =  'Nieznany';
          }

          //payment state for diplaying
          if(o.order.payment.payment_state == "IN PROGRESS"){
                o.order.payment.payment_state_display =  "W trakcie";
            }else if(o.order.payment.payment_state == "COMPLETED"){
                o.order.payment.payment_state_display =  'Opłacona';
            }else if(o.order.payment.payment_state == "REJECTED"){
                o.order.payment.payment_state_display =  'Odrzucona';
            }else if(o.order.payment.payment_state == "CANCELED"){
                o.order.payment.payment_state_display =  'Wycofana';
            }else if(o.order.payment.payment_state == "WAITING FOR PAYMENT"){
                o.order.payment.payment_state_display =  'Oczekuje na uregulowanie';
            }else{
                o.order.payment.payment_state_display =  'Nieznany';
          }

          //complaint state
          
          if(o.complaint.state == 'REGISTERED'){
              o.complaint.state_display =  'zarejestrowana'
          }else if(o.complaint.state == 'READ'){
              o.complaint.state_display =  'odczytana'
          }else if(o.complaint.state == 'ACCEPTED'){
              o.complaint.state_display =  'rozpatrzona pozytywnie'
          }else if(o.complaint.state == 'REJECTED'){
              o.complaint.state_display =  'odrzucona'
          }else if(o.complaint.state == 'DECISION'){
              o.complaint.state_display =  'wydano decyzję'
          }else if(o.complaint.state == 'CANCELED'){
              o.complaint.state_display =  'wycofana'
          }else{
              o.complaint.state_display =  'nierozpoznano'
          }
        

          o.customer_name = o.order.customer.name + ' ' + o.order.customer.surname + ' ' + o.order.customer.firm_name;
          o.order.payment.value_display = o.order.payment.value + " zł";


            return o;

        })






        this.complaints = complaints;
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
        this.$store.dispatch('getAllComplaints',true);
      }
    }
  },

  mounted() {
    
    this.complaints = this.$store.getters.getComplaints;
    this.$store.dispatch('getAllComplaints');
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