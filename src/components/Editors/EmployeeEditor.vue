<template>
    <v-form ref="employeeForm" @submit.prevent="nextStep">
        <form class="cell">
            <label class="cell__label">{{ $t("common.firstName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_name"
                :rules="r_name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("common.lastName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_surname"
                :rules="r_surname"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("employee.jobTitle") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_position"
                :rules="r_position"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>


        <form class="cell">
            <label class="cell__label">{{ $t("employee.salary") }}</label>
            <v-text-field
                class="input"
                label=""
                type="number"
                solo
                v-model="c_salary"
                :rules="r_salary"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>


        


        
    </v-form>
</template>

<script>
export default {

    name: 'EmployeeEditor',

    props: {
        pid:{
            default: -1,
        },
        validate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return{
            c_name: '',
            c_surname: '',
            c_position: '',
            c_salary: 0,

            r_name: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_surname: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_position: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_salary: [
                value => !!value || this.$t('errors.required'),
                value => value < 100000 || this.$t('errors.tooHigh'),
                value => value >= 0 || this.$t('errors.negativeValue'),
            ],

        }

    },

   

    methods: {
        
        allValidated(){
            if(this.$refs.employeeForm.validate()){
                return true;
            }
            return false
        },

        loadData(id){
            this.$store.dispatch('getEmployeeData',id)
            .then((result) => {
                console.log(result);
                this.c_name = result.name;
                this.c_surname = result.surname;
                this.c_position = result.position;
                this.c_salary = result.salary;
            })
        }

    },


    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                  

                    let employee = {
                        name: this.c_name,
                        surname: this.c_surname,
                        position: this.c_position,
                        salary: this.c_salary,
                    }

                   

                    this.$emit('dataUpdate',employee);
                    this.$emit('allValidated',true);
                }
                else{
                    this.$emit('allValidated',false);
                }
            }
        },

    },

    mounted() {
        
        if(this.pid == -1){
            
            this.c_name = '';
            this.c_surname = '';
            this.position = '';
            this.salary = 0;
        }
        else{
            this.loadData(this.pid);
        }

    },
}
</script>

<style scoped>

    .register-component{
        width: 100%;
        /* height: 60%; */
        background-color: rgb(251, 252, 253);
        
        align-self: center;
        /* border-radius: 10px; */
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        max-width: 550px;
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .pc-input{
        width: 3rem;
    }

    .title{
        /* margin: 0 auto; */
        margin-top: 2rem;
        margin-bottom: 3rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        font-size: 1.3rem;
    }

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

    .submit__btn{
        position: absolute;
        top: 0;
        right: 0;
        font-family: 'Segoe UI';
        font-weight: 500;
        background-color: #007E33;
    }

    .align-center{
        text-align: center;
    }

    .footer{
        margin: auto;
        margin-bottom: 2rem;
        margin-top: 2rem;
    }

    .cell > p {
        font-family: 'Segoe UI';
        font-weight: 500;
        font-size: 1rem;
    }

    .relative{
        position: relative;
        height: 3rem;
        margin-top: 1rem;
    }

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

    .error{
        margin-bottom: 1.5rem;
    }

    .error > p{
        font-size: 0.8rem;
        color: rgb(209, 33, 33);
    }

    .inline{
        display: inline;
    }

    .double{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    

</style>