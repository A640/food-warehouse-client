<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn v-if="edit" v-on="on" class="mx-2" icon  small  @click="dialog=true">
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-else v-on="on" text outlined class="ml-5" @click="dialog=true">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">{{ title() }}</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    <slot :close_popup="closeDialog" ></slot>
            
                </simplebar>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import simplebar from 'simplebar-vue';

export default {

    name: "Add-Edit-Popup",

    props: {
        edit:{
            type: Boolean,
            default: false,
        },
    },

    components: {
        simplebar,
    },

    data() {
        return {
            dialog: false,
        }
    },

    methods: {

        title(){
            let title='';
            if(this.edit){
                title = this.$t('common.edit');
            }
            else{ 
                title = this.$t('common.add');
            }


            return title;
        },

        closeDialog(){
            this.dialog=false;
        }
    },
    
}
</script>

<style scoped>

    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        /* border: 1px solid red; */
    }
    .pop-card{
        padding-top: 2rem;
        background-color: white;
    }

    .pop-wrapper{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .pop-title{
        /* margin-top: 1rem; */
        margin-bottom: 1rem;
        order: 1;
    }

     .pop-title__text{
        /* margin-top: 1rem; */
        margin-bottom: 1rem;
        order: 1;
        flex-grow: 0;
    }

    .pop-content{
        order: 2;
        flex-grow: 1;
    }

</style>