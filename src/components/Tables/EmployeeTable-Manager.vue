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
          label="Wyszukaj pracownika"
          single-line
          hide-details
        ></v-text-field>
        <!-- <edit :edit="Boolean(false)" />
        <v-btn :text="!delete_many_mode" :outlined="!delete_many_mode" elevation="0" class="ml-5" @click="delete_many_mode ? disableDeleteManyMode() : delete_many_mode=true">
                <v-icon>mdi-delete</v-icon>
        </v-btn> -->

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="employees"
        :search="search"
        :expanded.sync="expanded"
        :show-select="delete_many_mode" 
        v-model="selected"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="personal_data.employee_id"
      >

      <!-- insert table controls -->
      <!-- <template v-slot:[`item.discount`]="props">
          
      </template> -->

      <!-- insert into item expand slot -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <p class="detail details-name">{{item.personal_data.name}} {{item.personal_data.surname}}</p>
              <p class="detail details-id">ID: {{item.personal_data.employee_id}}</p>
            </div>
            <div class="details-container">
              <div class="cluster fix ml-5">
                <p class="cluster-title">Dane pracownika:</p>
                <p class="detail detail-title">Stanowisko: <span class="detail detail-value">{{item.personal_data.position}}</span></p>
                <p class="detail detail-title">Pensja: <span class="detail detail-value">{{item.personal_data.salary}}</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10" />
              <div class="cluster ">
                <p class="cluster-title">Konto:</p>
                <p class="detail detail-title">E-mail: <span class="detail detail-value">{{item.account.email}}</span></p>
                <p class="detail detail-title">Poziom uprawnień: <span class="detail detail-value">{{item.account.permission}}</span></p>
              </div>
            </div>
            

          </div>
        </td>
      </template>
      
      </v-data-table>

      <!-- <div v-if="delete_many_mode" class="right-buttons">
                <v-btn text class="mb-3 mr-2" @click="disableDeleteManyMode()">Anuluj</v-btn>
                <delete-many name="Usuwanie zaznaczonych pracowników" :count="selected.length" type="pracowników" v-on:deleteConfirm="deleteMany()"  ref="delMany"></delete-many>
      </div> -->
    </v-card>
  </div>
</template>

<script>
// import Delete from '@/components/Popups/DeleteConfirmation.vue';
// import Edit from '@/components/PopupContents/EmployeePopup.vue';
// import DeleteMany from '@/components/Popups/DeleteManyConfirmation.vue';



export default {

    components: {
      // Delete,
      // Edit,
      // DeleteMany,
      
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
        { text: 'Stanowisko', value: 'personal_data.position' },
        { text: 'Pensja', value: 'personal_data.salary', align:'center' },
        
        
      ],
      employees: [],
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
        this.$store.dispatch('deleteManyEmployees',delete_ids)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllEmployees');
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
        this.$store.dispatch('deleteEmployee',id)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllEmployees');
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
        return this.$store.getters.getEmployeesLoading;
      }
    },
    reconnected(){
      return this.$store.getters.getReconnected;
    }
  },

  created() {
    this.$store.watch(
      ()=>{
        return this.$store.getters.getEmployees // could also put a Getter here
      },
      (newValue)=>{
        //Update data when changed
        this.employees = newValue;
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
        this.$store.dispatch('getAllEmployees',true);
      }
    }
  },

  mounted() {
    
    this.employees = this.$store.getters.getEmployees;
    this.$store.dispatch('getAllEmployees');
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
    min-width: 40%;
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