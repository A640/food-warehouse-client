<template>
    <div class="cell">
        <v-card class="flex-row">
            
                
                
                   
                <v-img src="@/assets/b.jpg" class="round-fix"  max-height="100%" max-width="6rem" />
                <!-- <div class="mini-img">

                </div> -->
                
                <div class="details">
                    <h3 class="details-mini-title" >Lays wiejskie ziemniaczki</h3>
                    <p  class=" details-price ">Jakiś krótki opis o Rossetta i klasie A ziemniaków</p>
                </div>
                
            
        </v-card>
    </div>
    
</template>

<script>
export default {

    props:{
        name:{
            type: String,
            default: "Produkt",
        },
        added:{
            type: Boolean,
            default: false,
        },
        price:{
            type: Number,
            default: null,
        }
    },
    
    data() {
        return{
           
        }

    },

    methods: {
        
    },
}
</script>

<style scoped>

    .card-container{
        width: 100%;
        height: 100%;
        display: flex;
    }

    .flex-row{
        display: flex;
        flex-direction: row;
        height: 6rem;
    }



    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        /* border: 1px solid red; */
    }

    .mini-img{
        height: 100%;
        width: 20%;
        max-width: 10rem;
        background-image: url("../../assets/b.jpg");
        background-size: cover;
        background-position: center;
    }

    .details{
        margin-left: 2rem;
    }

    .details-mini-title{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        
    }

    .round-fix{
        border-bottom-left-radius: 4px;
        border-top-right-radius: 0 !important;
    }

  

</style>