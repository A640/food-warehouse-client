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
        <edit :edit="Boolean(false)" />

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="employees"
        :search="search"
        :expanded.sync="expanded"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="personal_data.employee_id"
      >
      <template v-slot:[`item.controls`]="props">
        <delete :id=props.item.personal_data.employee_id :name="props.item.personal_data.name + ' ' + props.item.personal_data.surname" type="user" />
        <edit :edit="Boolean(true)" :account_id="props.item.account.userId" :employee_id="props.item.personal_data.employee_id" />
      </template>
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
                <p class="detail detail-title">Login: <span class="detail detail-value">{{item.account.username}}</span></p>
                <p class="detail detail-title">E-mail: <span class="detail detail-value">{{item.account.email}}</span></p>
                <p class="detail detail-title">Poziom uprawnień: <span class="detail detail-value">{{item.account.permission}}</span></p>
              </div>
            </div>
            

          </div>
        </td>
      </template>
      
      </v-data-table>

     
    </v-card>
  </div>
</template>

<script>
import Delete from '@/components/Popups/DeleteConfirmation.vue';
import Edit from '@/components/PopupContents/EditEmployeePopup.vue';


export default {

    components: {
      Delete,
      Edit,
    },

    data () {
    return {
      search: '',
      headers: [
        {
          text: 'Imię',
          align: 'start',
          value: 'personal_data.name',
        },
        { text: 'Nazwisko', value: 'personal_data.surname' },
        { text: 'Stanowisko', value: 'personal_data.position' },
        { text: 'Pensja', value: 'personal_data.salary', align:'right' },
        { text: "Akcje", value: "controls", sortable: false, align:'center'}
      ],
      employees: [],
      expanded: [],
      // loading_data: true,
    }  
  },


  methods: {
      deleteEmployee(id){
          console.log(id)
          console.log("Delete employee: " + id)
      }
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
</style>