<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-card class="pa-5">
                        <v-item-group mandatory>
                            <v-item v-slot="{ active, toggle }" v-for="category in categories" :key="category.value" class="mr-1 ml-1">
                                <v-chip
                                    label
                                    dark
                                    :outlined="!active"
                                    @click="toggle; swichChart(category.link)"
                                    :color="active ? category.color : 'rgba(0,0,0,0.6)' "
                                > 
                                    {{category.text}} 
                                </v-chip>
                            </v-item>
                        </v-item-group>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="pa-5">
                        <router-view :key="$route.path" /> 
                    </v-card>
                </v-col>
            </v-row>
            
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Stats',


    data() {
        return {
            categories:[
                {text: 'zamówienia', value: 1, link: 'Manager_Stats_Orders', color: '#f69119'},
                {text: 'zysk', value: 2},
                {text: 'produkty', value: 3},
            ]
        }
    },

    methods: {
        swichChart(link){
            if(this.$route.name != link){
                this.$router.push({ name: link});
            }
        }
    },

    mounted(){
        this.swichChart('Manager_Stats_Orders');
    },

}
</script>