<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-card class="pt-3 pl-3 pb-3 d-flex align-center justify-center" @click="dialog = true" v-on="on">
                <v-icon class="plus-ico">mdi-plus</v-icon>
            </v-card>
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">Nowy adres dostawy</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    <AddressEditor 
                        :pid="-1" 
                        :validate="validate_trigger_a" 
                        @dataUpdate="updateDataAddress" 
                        @allValidated="validateA"
                    />

                    <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-btn text class="mr-2 mb-5" @click="closeDialog()">{{ $t("common.cancel") }}</v-btn>
                            <v-btn 
                            color="#1877F2" 
                            class="mb-5" 
                            dark 
                            @click="validate()"
                            >{{ $t("common.save") }}</v-btn>
                        </div>
                    </div>
            
                </simplebar>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import simplebar from 'simplebar-vue';
import AddressEditor from '@/components/Editors/AddressEditor.vue'

export default {

    name: "NewAddress",


    components: {
        simplebar,
        AddressEditor,
    },

    data() {
        return {
            dialog: false,
            a_validated: false,
            validate_trigger_a: false,
            address: null,
        }
    },

    methods: {

        updateDataAddress(data){
            this.address = data;
        },

        validateA(value){
            this.a_validated = value;
            this.validate_trigger_a = false;
            if(value == true && this.address != null){
                this.saveAddress();
            }
        },

        validate(){
            this.a_validated = false;
            this.validate_trigger_a = true;
        },

       saveAddress(){
           this.address.address_id = -5;
           this.$emit('newAddress');
            this.$store.commit('addAddress',this.address);
           this.clear();
           this.closeDialog();
       },

       clear(){
            this.validate_trigger_a = false;
            this.address = null;
            this.a_validated = false;
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

    .cell__popup-buttons{
        float: right;
        margin-bottom: 1rem;
    }

</style>