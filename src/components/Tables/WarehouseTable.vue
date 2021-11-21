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
          label="Wyszukaj magazyn"
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
        :items="warehouses"
        :search="search"
        :expanded.sync="expanded"
        :show-select="delete_many_mode" 
        v-model="selected"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="storage.storage_id"
      >
      
      <!-- insert table controls -->
      <template v-slot:[`item.controls`]="props">
        <delete 
          :id="props.item.storage.storage_id" 
          :name="props.item.storage.name" 
          type="magazyn"
          :ref="'del' + props.item.storage.storage_id"
          v-on:DeleteConfirm="deleteOne"
         />
        <edit :edit="Boolean(true)" :warehouse_id="props.item.storage.storage_id" />
      </template>

      <!-- insert into item expand slot -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <p class="detail details-name">{{item.storage.name}}</p>
              <p class="detail details-id">{{ $t("common.id") }}: {{item.storage.storage_id}}</p>
            </div>
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">Dane magazynu:</p>
                <p class="detail detail-title">Pojemność: <span class="detail detail-value">{{item.storage.capacity}}</span></p>
                <p class="detail detail-title">Chłodnia: <span class="detail detail-value">{{item.storage.is_cold_storage ? 'TAK' : 'NIE'}}</span></p>
              </div>
              <v-divider vertical inset class="ml-2 mr-10" />
              <div class="cluster fix">
                <p class="cluster-title">{{ $t("address.address") }}:</p>
                <p class="detail detail-value"><span v-if="item.address.street" class="detail detail-value" >{{item.address.street}}</span>
                {{item.address.building_number}}
                <span v-if="item.address.apartment_number" class="detail detail-value" >/ {{item.address.apartment_number}}</span>
                </p>
                <p class="detail detail-value">{{item.address.postal_code}}, {{item.address.town}}</p>
                <p class="detail detail-value">{{item.address.country}}</p>
              </div>
              <v-divider vertical inset class="ml-2 mr-10" />
              <div class="cluster ">
                <p class="cluster-title">Zarządca:</p>
                <p class="detail detail-value">{{item.manager.personal_data.name}} {{item.manager.personal_data.surname}}
                <p class="detail detail-title">{{ $t("employee.jobPosition") }}: <span class="detail detail-value">{{item.manager.personal_data.position}}</span></p>
                <p class="detail detail-title">{{ $t("common.email") }}: <span class="detail detail-value">{{item.manager.account.email}}</span></p>
              </div>
            </div>
            

          </div>
        </td>
      </template>
      
      </v-data-table>

      <div v-if="delete_many_mode" class="right-buttons">
                <v-btn text class="mb-3 mr-2" @click="disableDeleteManyMode()">{{ $t("common.cancel") }}</v-btn>
                <delete-many name="Usuwanie zaznaczonych magazynów" :count="selected.length" type="magazynów" v-on:deleteConfirm="deleteMany()"  ref="delMany"></delete-many>
      </div>
    </v-card>
  </div>
</template>

<script>
import Delete from '@/components/Popups/DeleteConfirmation.vue';
import Edit from '@/components/PopupContents/WarehousePopup.vue';
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
        { text: 'Nazwa', value: 'storage.name' },
        { text: 'Pojemność', value: 'storage.capacity', align:'end' },
        { text: 'Chłodnia', value: 'storage.cold', align:'center' },
        { text: 'Zarządca', value: 'storage.manager_ns' },
        { text: 'Miasto', value: 'address.town' },
        { text: this.$t('common.actions'), value: "controls", sortable: false, align:'center'}
      ],
      warehouses: [],
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
        let delete_ids = this.selected.map( (warehouse) => {
            return warehouse.storage.storage_id;
        })
        // console.log(delete_ids);
        this.$store.dispatch('deleteManyWarehouses',delete_ids)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllWarehouses');
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
        this.$store.dispatch('deleteWarehouse',id)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllWarehouses');
            this.$refs['del' + id ].dialogClose();
            
        })
        .catch((err) => {
            if(err === "serverBlockDelete"){
              alert(this.$t('errors.unableToDeleteFromDatabase'))
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
        return this.$store.getters.getWarehousesLoading;
      }
    },
    reconnected(){
      return this.$store.getters.getReconnected;
    }
  },

  created() {
    this.$store.watch(
      ()=>{
        return this.$store.getters.getWarehouses // could also put a Getter here
      },
      (newValue)=>{
        //Update data when changed
        let wareh = newValue.map((warehouse) => {
          //prepare boolean value and 2 string value to display AND SEARCH in table
          warehouse.storage.cold = warehouse.storage.is_cold_storage ? 'TAK' : 'NIE';
          warehouse.storage.manager_ns = warehouse.manager.personal_data.name + ' ' + warehouse.manager.personal_data.surname;
          return warehouse;
        })
        this.warehouses = wareh;
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
        this.$store.dispatch('getAllWarehouses',true);
      }
    }
  },

  mounted() {
    
    this.warehouses = this.$store.getters.getWarehouses;
    this.$store.dispatch('getAllWarehouses');
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
    min-width: 28%;
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