<template>
    <!-- Generate popup -->
    <popup :edit="edit" v-slot="scope" ref="popup" >
        <div>
            <!-- content of popup inserted into popup slot -->
        <div class="cell ">
            <p class="section-title">{{ $t("common.account") }}</p>
        </div>

        <edit-account 
            :pid="account_id" 
            :validate="validate_trigger_a" 
            @dataUpdate="updateDataAccount" 
            @allValidated="validateA"
            v-on:setPermission="setPermission"
        />

        
        <div class="cell">
            <label class="cell__label">{{ $t("common.userType") }}</label>
            <v-autocomplete
                solo
                v-model="c_user_type"
                :items="u_types"
            ></v-autocomplete>
        </div>
        

        <div class="cell ">
            <p class="section-title">{{ $t("employee.employee") }}</p>
        </div>

        <edit-employee
            :pid="employee_id" 
            :validate="validate_trigger_e" 
            @dataUpdate="updateDataEmployee" 
            @allValidated="validateE"
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
import EditEmployee from '@/components/Editors/EmployeeEditor.vue'
import EditAccount from '@/components/Editors/AccountEditor.vue'

export default {

    name:'Add-Edit-EmployeePopupContent',

    components:{
        Popup,
        EditAccount,
        EditEmployee,
    },

    props:{
        account_id:{
            type: Number,
            default: -1,
        },
        employee_id:{
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
            validate_trigger_a: false,
            validate_trigger_e: false,
            account: null,
            employee: null,
            a_validated: false,
            e_validated: false,

            c_user_type: 'Employee',
            u_types: [],

            overlay: false,
        }

    },

    methods: {

        updateDataAccount(data){
            this.account = data;
        },

        updateDataEmployee(data){
            this.employee = data;
        },

        validate(){
            this.a_validated = false;
            this.e_validated = false;
            this.validate_trigger_a = true;
            this.validate_trigger_e = true;
        },

        validateA(value){
            this.a_validated = value;
            this.validate_trigger_a = false;
            if(value == true && this.e_validated == true && this.c_user_type != null && this.c_user_type != ''){
                this.eSave();
            }
        },

        validateE(value){
            this.e_validated = value;
            this.validate_trigger_e = false;
            if(value == true && this.a_validated == true && this.c_user_type != null && this.c_user_type != ''){
                this.eSave();
            }
        },

        eSave(){
            this.overlay = true;
            let obj = {
                account: this.account,
                personal_data: this.employee, 
            };
            obj.account.permission = this.c_user_type;
            if(this.edit){

                obj.account.user_id = this.account_id;
                obj.personal_data.employee_id = this.employee_id;

                console.log("edit employee attempt");
                console.log(obj);
                this.$store.dispatch('editEmployee',obj)
                    .then( () => {
                        // if edited successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllEmployees');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })

            }else{
                console.log("save new employee attempt");
                console.log(obj);
                this.$store.dispatch('addEmployee',obj)
                    .then( () => {
                        // if added  successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllEmployees');
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

        nextStep(validated){
            if(validated){
                this.$emit('next',this.address);
            }
            this.validate_trigger = false;
        },

        dialogClose(){
            // call method in child component (popup component) using ref
            this.$refs.popup.closeDialog();
        },

        clear(){
            this.validate_trigger_a = false;
            this.validate_trigger_e = false;
            this.account = null;
            this.employee = null;
            this.a_validated = false;
            this.e_validated = false;

            this.c_user_type = 'Employee';
            this.u_types = [];
        },

        setPermission(permission){
            this.c_user_type = permission;
        }
    },

    mounted() {
        // let module = require("@/assets/userTypes.js");
        // this.u_types = module.array;
        this.u_types = [{
            "text": this.$t('common.userTypes.admin'),
            "value": "Admin"
        }, {
            "text": this.$t('common.userTypes.manager'),
            "value": "Manager"
        }, {
            "text": this.$t('common.userTypes.employee'),
            "value": "Employee"
        }, {
            "text": this.$t('common.userTypes.courier'),
            "value": "Supplier"
        }, {
            "text": this.$t('common.userTypes.customer'),
            "value": "Customer"
        }];
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