<template>
    <!-- Generate popup -->
    <popup :edit="edit" v-slot="scope" ref="popup" >
        <div>
            <!-- content of popup inserted into popup slot -->
        <div class="cell ">
            <p class="section-title">Partia produktu</p>
        </div>

        <batch-editor
            :pid="batch_id" 
            :validate="validate_trigger_v" 
            @dataUpdate="updateDataBatch" 
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
import BatchEditor from '../Editors/BatchInWarehouseEditor.vue'

export default {

    name:'Add-Edit-BatchPopupContent',

    components:{
        Popup,
        BatchEditor,
    },

    props:{
        batch_id:{
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
            batch: null,
            
            v_validated: false,

            overlay: false,
        }

    },

    methods: {

        updateDataBatch(data){
            this.batch = data;
        },


        validate(){
            this.v_validated = false;
            this.validate_trigger_v = true;
        },

        validateV(value){
            this.v_validated = value;
            this.validate_trigger_v = false;
            if(value == true){
                this.eSave();
            }
        },


        eSave(){
            this.overlay = true;
            let obj = {
                batch_no: Number.parseInt(this.batch.batch_number),
                eat_by_date: this.batch.eat_by_date,
                product_id: Number.parseInt(this.batch.product_id),
                packages_quantity: Number.parseInt(this.batch.prod_quantity),
                storage_id: Number.parseInt(this.batch.warehouse),
                quantity: Number.parseInt(this.batch.warehouse_quantity),
            }
            
           
            if(this.edit){

                obj.batch_id = Number.parseInt(this.batch_id);
                console.log("edit batch attempt");
                console.log(obj);
                this.$store.dispatch('editBatch',obj)
                    .then( () => {
                        // if edited successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllBatches');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })

            }else{
                console.log("save new batch attempt");
                console.log(obj);
                this.$store.dispatch('addBatch',obj)
                    .then( () => {
                        // if added  successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllBatches');
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
            this.batch = null;
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