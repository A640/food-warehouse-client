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
          :label="$t('tables.customer.searchForCustomer')"
          single-line
          hide-details
        ></v-text-field>
        <edit :edit="Boolean(false)" />
        <v-btn :text="!delete_many_mode" :outlined="!delete_many_mode" elevation="0" class="ml-5" @click="delete_many_mode ? disableDeleteManyMode() : delete_many_mode=true">
                <v-icon>mdi-delete</v-icon>
        </v-btn>

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="customers"
        :search="search"
        :show-select="delete_many_mode" 
        v-model="selected"
        :expanded.sync="expanded"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="personal_data.customer_id"
      >
      <template v-slot:[`item.controls`]="props">
        <delete 
          :id=props.item.personal_data.customer_id 
          :name="props.item.personal_data.name + ' ' + props.item.personal_data.surname" 
          type="klienta"
          v-on:DeleteConfirm="deleteOne" 
        />
        <edit :edit="Boolean(true)" :account_id="props.item.account.user_id" :customer_id="props.item.personal_data.customer_id" />
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <p class="detail details-name">{{item.personal_data.name}} {{item.personal_data.surname}}</p>
              <p class="detail details-id">{{ $t("common.id") }}: {{item.personal_data.customer_id}}</p>
            </div>
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">{{ $t("tables.customer.customerDetails") }}:</p>
                <p class="detail detail-title">{{ $t("common.phone") }}: <span class="detail detail-value">{{item.personal_data.phone_number}}</span></p>
                <p class="detail detail-title">{{ $t("common.company") }}: <span class="detail detail-value" v-if="item.personal_data.firm_name" >{{item.personal_data.firm_name}}</span><span v-else class="detail detail-value">-</span></p>
                <p class="detail detail-title">{{ $t("common.taxID") }}: <span class="detail detail-value" v-if="item.personal_data.tax_id" >{{item.personal_data.tax_id}}</span><span v-else class="detail detail-value">-</span></p>
              </div>
              <v-divider vertical inset class="mr-10" />
              <div class="cluster fix">
                <p class="cluster-title">{{ $t("common.account") }}:</p>
                <p class="detail detail-title">{{ $t("common.login") }}: <span class="detail detail-value">{{item.account.username}}</span></p>
                <p class="detail detail-title">{{ $t("common.email") }}: <span class="detail detail-value">{{item.account.email}}</span></p>
                <p class="detail detail-title">{{ $t("employee.permissionsLevel") }}: <span class="detail detail-value">{{item.account.permission}}</span></p>
              </div>
              <v-divider vertical inset class="ml-2 mr-10" />
              <div class="cluster ">
                <p class="cluster-title">{{ $t("address.address") }}:</p>
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

     <div v-if="delete_many_mode" class="right-buttons">
                <v-btn text class="mb-3 mr-2" @click="disableDeleteManyMode()">{{ $t("common.cancel") }}</v-btn>
                <delete-many name="Usuwanie zaznaczonych klientów" :count="selected.length" type="klientów" v-on:deleteConfirm="deleteMany()"  ></delete-many>
      </div>
    </v-card>
  </div>
</template>

<script>
import Delete from '@/components/Popups/DeleteConfirmation.vue';
import Edit from '@/components/PopupContents/CustomerPopup.vue';
import DeleteMany from '@/components/Popups/DeleteManyConfirmation.vue';


export default {

    components: {
      Delete,
      Edit,
      DeleteMany,
    },

    data () {
    return {
      search: '',
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: this.$t('common.firstName'),
          align: 'start',
          value: 'personal_data.name',
        },
        { text: this.$t('common.lastName'), value: 'personal_data.surname' },
        { text: this.$t('common.phone'), value: 'personal_data.phone_number' },
        { text: this.$t('common.company'), value: 'personal_data.firm_name' },
        { text: this.$t('common.actions'), value: "controls", sortable: false, align:'center'}
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
        let delete_ids = this.selected.map( (employee) => {
            return employee.personal_data.employee_id;
        })
        // console.log(delete_ids);
        this.$store.dispatch('deleteManyCustomers',delete_ids)
      },

      deleteOne(id){
        this.$store.dispatch('deleteCustomer',id)
      }
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