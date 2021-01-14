<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-card class="pa-5">
                        
                        <v-chip
                            v-for="category in categories" 
                            :key="category.value"  
                            class="mr-1 ml-1"
                            label
                            dark
                            :outlined="path != category.link"
                            @click="swichChart(category.link)"
                            :color="path == category.link ? category.color : 'rgba(0,0,0,0.6)' "
                        > 
                            {{category.text}} 
                            
                        </v-chip>
                        
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
                {text: 'zysk', value: 2 , link:'Manager_Stats_Sell-Profit', color:'#82b4aa'},
                {text: 'produkty', value: 3, link: 'Manager_Stats_Top-Products', color:'#4795bf'},
            ],
        }
    },

    methods: {
        swichChart(link){
            if(this.$route.name != link){
                this.$router.push({ name: link});
            }
        }
    },

    computed:{
        path(){
            return this.$route.name;
        }
    },


    mounted(){
        //this.swichChart('Manager_Stats_Orders');
    },

}
</script>