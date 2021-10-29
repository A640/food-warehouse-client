<template>
    <!-- Generate popup -->
    <popup :edit="edit" v-slot="scope" ref="popup" >
        <div>
            <!-- content of popup inserted into popup slot -->
 

        <div class="cell ">
            <p class="section-title">{{ $t("common.foodProducer") }}</p>
        </div>

        <edit-producer
            :pid="producer_id" 
            :validate="validate_trigger_p" 
            @dataUpdate="updateDataProducer" 
            @allValidated="validateP"
        />

         <div class="cell ">
            <p class="section-title">{{ $t("address.address") }}</p>
        </div>

        <edit-address
            :pid="-1"
            :address_obj="loaded_address" 
            :validate="validate_trigger_ad" 
            @dataUpdate="updateDataAddress" 
            @allValidated="validateAD"
        />

        <div class="cell">
            <div class="cell__popup-buttons">
                <v-btn text class="mr-2 mb-5" @click="scope.close_popup">{{ $t("common.cancel") }}</v-btn>
                <v-btn 
                color="#1877F2" 
                class="mb-5" 
                dark 
                @click="validate()"
                >{{ $t("common.save") }}</v-btn>
            </div>
        </div>

        <!-- loading overlay (show only on loading)-->
        <v-overlay
            :absolute="true"
            :value="overlay"
          >
            <v-progress-circular
                indeterminate
                color="amber"
            ></v-progress-circular>
          </v-overlay>
        </div>
        
     </popup>
</template>

<script>
import Popup from '@/components/Popups/Popup.vue'
import EditProducer from '@/components/Editors/ProducerEditor.vue'
import EditAddress from '@/components/Editors/AddressEditor.vue'

export default {

    name:'Add-Edit-ProducerPopupContent',

    components:{
        Popup,
        EditProducer,
        EditAddress,
    },

    props:{
        producer_id:{
            type: Number,
            default: -1,
        },
        edit:{
            type: Boolean,
            default: false,
        },
    },

    data() {
        return{

            validate_trigger_p: false,
            validate_trigger_ad: false,

            producer: null,
            address: null,

            p_validated: false,
            ad_validated: false,

            address_id: -1,
            loaded_address: null,
            overlay: false,
        }

    },

    methods: {

        updateDataAccount(data){
            this.account = data;
        },

        updateDataProducer(data){
            this.producer = data;
        },

        updateDataAddress(data){
            this.address = data;
        },

        validate(){
            this.p_validated = false;
            this.ad_validated = false;
            this.validate_trigger_p = true;
            this.validate_trigger_ad = true;
        },

        validateP(value){
            this.p_validated = value;
            this.validate_trigger_p = false;
            if(value == true &&  this.ad_validated == true){
                this.eSave();
            }
        },

        validateAD(value){
            this.ad_validated = value;
            this.validate_trigger_ad = false;
            if(value == true && this.p_validated == true){
                this.eSave();
            }
        },

        eSave(){
            this.overlay = true;
            let obj = {
                maker_data: this.producer,
                address: this.address, 
            };
            
            if(this.edit){

                obj.maker_data.maker_id = this.producer_id;
                obj.address.address_id = this.address_id;

                console.log("edit producer attempt");
                console.log(obj);
                this.$store.dispatch('editProducer',obj)
                    .then( () => {
                        // if edited successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllProducers');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })

            }else{
                console.log("save new producer attempt");
                console.log(obj);
                this.$store.dispatch('addProducer',obj)
                    .then( () => {
                        // if added  successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllProducers');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })
            }
            
        },

        dialogClose(){
            // call method in child component (popup component) using ref
            this.$refs.popup.closeDialog();
        },

        clear(){
            this.validate_trigger_p = false;
            this.validate_trigger_ad = false;
            this.producer = null;
            this.address = null;
            this.loaded_address = null;
            this.address_id = -1;
            this.p_validated = false;
            this.ad_validated = false;

        },


    },

    mounted() {
        if(this.producer_id != -1){
            this.$store.dispatch('getProducerAddress',this.producer_id)
            .then( (address) => {
                this.loaded_address = address;
                this.address_id = address.address_id;
            })
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

    .cell__label{
        font-family: 'Segoe UI';
        font-weight: 450;
        margin-bottom: 1rem;
    }

    .align-right{
        text-align: right;
    }

    

    .align-center{
        text-align: center;
    }


    .section-title {
        color: #acacac;
        font-family: 'Segoe UI';
        font-weight: 400;
        font-size: 1rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }
   
    .cell__popup-buttons{
        float: right;
        margin-bottom: 1rem;
    }

    .flex{
        display: flex;
        flex-direction: row;
        align-content: flex-end;
    }
</style>