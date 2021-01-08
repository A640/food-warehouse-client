<template>
    <!-- Generate popup -->
    <popup :edit="edit" v-slot="scope" ref="popup" >
        <div>
            <!-- content of popup inserted into popup slot -->
        <div class="cell ">
            <p class="section-title">Pojazd</p>
        </div>

        <vehicle-editor
            :pid="vehicle_id" 
            :validate="validate_trigger_v" 
            @dataUpdate="updateDataVehicle" 
            @allValidated="validateV"
        />

        <div class="cell">
            <div class="cell__popup-buttons">
                <v-btn text class="mr-2 mb-5" @click="scope.close_popup">Anuluj</v-btn>
                <v-btn 
                color="#1877F2" 
                class="mb-5" 
                dark 
                @click="validate()"
                >Zapisz</v-btn>
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
import VehicleEditor from '../Editors/VehicleEditor.vue'

export default {

    name:'Add-Edit-VehiclePopupContent',

    components:{
        Popup,
        VehicleEditor,
    },

    props:{
        vehicle_id:{
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
            validate_trigger_v: false,
            vehicle: null,
            
            v_validated: false,

            overlay: false,
        }

    },

    methods: {

        updateDataVehicle(data){
            this.vehicle = data;
        },


        validate(){
            this.v_validated = false;
            this.validate_trigger_v = true;
        },

        validateV(value){
            this.v_validated = value;
            this.validate_trigger_v = false;
            if(value == true &&  this.vehicle.driver != null && this.vehicle.driver != ''){
                this.eSave();
            }
        },

        validateE(value){
            this.e_validated = value;
            this.validate_trigger_e = false;
            if(value == true && this.v_validated == true && this.c_user_type != null && this.c_user_type != ''){
                this.eSave();
            }
        },

        eSave(){
            this.overlay = true;
            let obj = {
                insurance: new Date(this.vehicle.insurance),
                inspection: new Date(this.vehicle.inspection),
                prod_year: Number.parseInt(this.vehicle.prod_year),
                brand: this.vehicle.brand,
                model: this.vehicle.model,
                driver_id: this.vehicle.driver,
                reg_no: this.vehicle.reg_no,
            }
            
           
            if(this.edit){

                obj.car_id = this.vehicle_id;
                console.log("edit vehicle attempt");
                console.log(obj);
                this.$store.dispatch('editVehicle',obj)
                    .then( () => {
                        // if edited successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllVehicles');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })

            }else{
                console.log("save new vehicle attempt");
                console.log(obj);
                this.$store.dispatch('addVehicle',obj)
                    .then( () => {
                        // if added  successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllVehicles');
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
            this.validate_trigger_v = false;
            this.vehicle = null;
            this.v_validated = false;
        },

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