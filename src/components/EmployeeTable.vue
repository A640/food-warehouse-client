<template>
    <v-card>
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
      >
      <template v-slot:[`item.controls`]="props">
        <delete :id=props.item.id :name="props.item.name + ' ' + props.item.surname" type="user" />
        <edit :edit="Boolean(true)" />
      </template>
      
      </v-data-table>
      
    </v-card>
</template>

<script>
import Delete from '@/components/DeleteConfirmation.vue';
import Edit from '@/components/EditEmployeePopup.vue';


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
        { text: 'Pensja', value: 'personal_data.salary' },
        { text: "Akcje", value: "controls", sortable: false}
      ],
      employees: [],
    }  
  },


  methods: {
      deleteEmployee(id){
          console.log(id)
          console.log("Delete employee: " + id)
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

  mounted() {
    this.employees = this.$store.getters.getEmployees;
    this.$store.dispatch('getAllEmployees')
  }

}
</script>