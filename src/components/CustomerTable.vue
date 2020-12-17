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
        :items="customers"
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
        { text: 'Imię', align: 'start', value: 'name' },
        { text: 'Nazwisko', value: 'surname' },
        { text: 'E-mail', value: 'salary' },
        { text: 'Telefon', value: 'salary' },
        { text: 'Firma', value: 'position' },
        { text: 'Telefon', value: 'salary' },
        { text: 'Telefon', value: 'salary' },
        { text: "Akcje", value: "controls", sortable: false},
      ],
      employees: [
        {
          id: 1,
          name: 'Albert',
          surname: 'Kanak',
          position: 'Sprzątaczka',
          salary: 12000,
        },
        {
          id: 2,
          name: 'Kamil',
          surname: 'Bawaban',
          position: 'Sprzątaczka',
          salary: 20,
        },
        {
          id: 3,
          name: 'Bartłomiej',
          surname: 'Liszek',
          position: 'Sprzątaczka',
          salary: 10000,
        },
        {
          id: 4,
          name: 'Tomasz',
          surname: 'Dudzic',
          position: 'SQL Genius',
          salary: 12000,
        },
        {
          id: 5,
          name: 'Myster',
          surname: 'Bujak',
          position: 'Sprzątaczka',
          salary: 100,
        },
        {
          id: 6,
          name: 'Dominik',
          surname: 'Baran',
          position: 'Sprzątaczka',
          salary: 4600,
        },
        
      ],
    }  
  },


    methods: {
        deleteEmployee(id){
            console.log(id)
            console.log("Delete employee: " + id)
        }
    },



}
</script>