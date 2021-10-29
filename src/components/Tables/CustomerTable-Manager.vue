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
          label="Wyszukaj klienta"
          single-line
          hide-details
        ></v-text-field>

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="customers"
        :search="search"
        :expanded.sync="expanded"
        :show-select="delete_many_mode" 
        v-model="selected"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="personal_data.customer_id"
      >

      <!-- insert table controls -->
      <template v-slot:[`item.discount`]="props">
        <Discount
          :id="props.item.personal_data.customer_id"
          :discount="props.item.personal_data.discount" 
        />
      </template>

      <!-- insert into item expand slot -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <p class="detail details-name">{{item.personal_data.name}} {{item.personal_data.surname}}</p>
              <p class="detail details-id">ID: {{item.personal_data.customer_id}}</p>
            </div>
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">Dane klienta:</p>
                <p class="detail detail-title">Telefon: <span class="detail detail-value">{{item.personal_data.phone_number}}</span></p>
                <p class="detail detail-title">E-mail: <span class="detail detail-value">{{item.account.email}}</span></p>
                <p class="detail detail-title">Rabat: <span class="detail detail-value" v-if="item.personal_data.discount > 0">{{item.personal_data.discount}} %</span><span class="detail detail-value" v-else>brak</span></p>
              </div>
              <v-divider vertical inset class="mr-10" />
              <div class="cluster fix">
                <p class="cluster-title">Firma:</p>
                <p class="detail detail-title">Firma: <span class="detail detail-value" v-if="item.personal_data.firm_name" >{{item.personal_data.firm_name}}</span><span v-else class="detail detail-value">-</span></p>
                <p class="detail detail-title">NIP: <span class="detail detail-value" v-if="item.personal_data.tax_id" >{{item.personal_data.tax_id}}</span><span v-else class="detail detail-value">-</span></p>
              </div>
              <v-divider vertical inset class="ml-2 mr-10" />
              <div class="cluster ">
                <p class="cluster-title">Adres:</p>
                <p class="detail detail-value"><span v-if="item.address.street" class="detail detail-value" >{{item.address.street}}</span>
                {{item.address.building_number}}
                <span v-if="item.address.apartment_number" class="detail detail-value" >/ {{item.address.apartment_number}}</span>
                </p>
                <p class="detail detail-value">{{item.address.postal_code}}, {{item.address.town}}</p>
                <p class="detail detail-value">{{item.address.country}}</p>
              </div>
            </div>
            

          </div>
        </td>
      </template>
      
      </v-data-table>

      <!-- <div v-if="delete_many_mode" class="right-buttons">
                <v-btn text class="mb-3 mr-2" @click="disableDeleteManyMode()">{{ $t("common.cancel") }}</v-btn>
                <delete-many name="Usuwanie zaznaczonych klientów" :count="selected.length" type="klientów" v-on:deleteConfirm="deleteMany()"  ref="delMany"></delete-many>
      </div> -->
    </v-card>
  </div>
</template>

<script>
// import Delete from '@/components/Popups/DeleteConfirmation.vue';
// import Edit from '@/components/PopupContents/CustomerPopup.vue';
// import DeleteMany from '@/components/Popups/DeleteManyConfirmation.vue';
import Discount from '@/components/Popups/DiscountEdit.vue'


export default {

    components: {
      // Delete,
      // Edit,
      // DeleteMany,
      Discount,
    },

    data () {
    return {
      search: '',
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'Imię',
          align: 'start',
          value: 'personal_data.name',
        },
        { text: 'Nazwisko', value: 'personal_data.surname' },
        { text: 'Telefon', value: 'personal_data.phone_number' },
        { text: 'Firma', value: 'personal_data.firm_name' },
        { text: 'Rabat', value: 'discount', align:'center' },
      ],
      customers: [],
      expanded: [],
      selected: [],
      delete_many_mode: false,
      // loading_data: true,
    }  
  },


  methods: {

      disableDeleteManyMode(){
        this.delete_many_mode = false;
        this.selected = [];
      },

      deleteMany(){
        let delete_ids = this.selected.map( (customer) => {
            return customer.personal_data.customer_id;
        })
        // console.log(delete_ids);
        this.$store.dispatch('deleteManyCustomers',delete_ids)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllCustomers');
            this.$refs['delMany'].dialogClose();
            this.selected = [];
            this.delete_many_mode = false;
            
        })
        .catch((err) => {
            console.log(err);
            this.$refs['delMany'].dialogClose();
        })
      },

      deleteOne(id){
        console.log(id)
        this.$store.dispatch('deleteCustomer',id)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllCustomers');
            this.$refs['del' + id ].dialogClose();
            
        })
        .catch((err) => {
            if(err === "serverBlockDelete"){
              alert("Nie można usunąć z bazy danych")
            }
            console.log(err);
            this.$refs['del' + id ].dialogClose();
        })
      },
      
  },

  computed: {
    loading_data(){
      if(this.$store.getters.getNoConnection){
        return true;
      }else{
        return this.$store.getters.getCustomersLoading;
      }
    },
    reconnected(){
      return this.$store.getters.getReconnected;
    }
  },

  created() {
    this.$store.watch(
      ()=>{
        return this.$store.getters.getCustomers // could also put a Getter here
      },
      (newValue)=>{
        //Update data when changed
        this.customers = newValue;
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
        this.$store.dispatch('getAllCustomers',true);
      }
    }
  },

  mounted() {
    
    this.customers = this.$store.getters.getCustomers;
    this.$store.dispatch('getAllCustomers');
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
    min-width: 30%;
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