<template>
    <!-- Generate popup -->
    <popup :edit="edit" v-slot="scope" ref="popup" >
        <div>
            <!-- content of popup inserted into popup slot -->
        <div class="cell ">
            <p class="section-title">{{ $t("products.product") }}</p>
        </div>

        <product-editor
            :pid="product_id" 
            :validate="validate_trigger_p" 
            @dataUpdate="updateDataProduct" 
            @allValidated="validateP"
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
import ProductEditor from '../Editors/ProductEditor.vue'

export default {

    name:'Add-Edit-ProductPopupContent',

    components:{
        Popup,
        ProductEditor,
    },

    props:{
        product_id:{
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
            product: null,
            p_validated: false,

            overlay: false,
        }

    },

    methods: {

        updateDataProduct(data){
            this.product = data;
        },


        validate(){
            this.p_validated = false;
            this.validate_trigger_p = true;
        },

        validateP(value){
            this.p_validated = value;
            this.validate_trigger_p = false;
            if(value == true){
                this.eSave();
            }
        },

        eSave(){
            this.overlay = true;
            let obj = {
                name: this.product.name,
                category: this.product.category,
                needs_cold: this.product.needs_cold,
                buy_price: Number.parseFloat(this.product.buy_price),
                maker_id: this.product.maker_id,
                sell_price: Number.parseFloat(this.product.sell_price),
                image: this.product.image,
                description: this.product.description,
                short_description: this.product.short_description,
            }
            
           
            if(this.edit){

                obj.product_id = this.product_id;
                console.log("edit product attempt");
                console.log(obj);
                this.$store.dispatch('editProduct',obj)
                    .then( () => {
                        // if edited successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllProducts');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })

            }else{
                console.log("save new product attempt");
                console.log(obj);
                this.$store.dispatch('addProduct',obj)
                    .then( () => {
                        // if added  successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllProducts');
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
            this.product = null;
            this.p_validated = false;
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