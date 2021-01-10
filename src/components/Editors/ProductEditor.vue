<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">Nazwa</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_name"
                :rules="r_name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Kategoria</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_category"
                :rules="r_category"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Skrócony opis</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_short_description"
                :rules="r_short_description"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Opis</label>
            <v-textarea
                class="input"
                label=""
                solo
                v-model="i_description"
                v-on:keyup.enter.stop
            ></v-textarea>
        </form>

        <div class="cell">
            <v-img
                v-if="image"
                class="img"
                contain
                height="20rem"
                :src="image"
            />
        </div>

        <v-file-input 
            v-model="upload_image"
            class="cell"
            label="Zdjęcie produktu"
            filled
            show-size
            :rules="r_image"
            prepend-icon="mdi-camera"
        ></v-file-input>

        

        <div class="cell">
            <label class="cell__label">Producent</label>
            <v-autocomplete
                solo
                class="mt-4"
                v-model="i_producer"
                :items="producers"
                :rules="r_producer"
                auto-select-first
            ></v-autocomplete>
        </div>


        <form class="cell">
            <v-switch inset v-model="i_needs_cold" label="Wymaga przechowywania w chłodni"></v-switch>
        </form>

        <form class="cell">
            <label class="cell__label">Cena po jakiej magazyn <b>kupuje</b> jednostkę produktu </label>
            <v-text-field
                class="input"
                type="number"
                label=""
                solo
                v-model="i_buy_price"
                :rules="r_price"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Cena po jakiej magazyn <b>sprzedaje</b> jednostkę produktu </label>
            <v-text-field
                class="input"
                type="number"
                label=""
                solo
                v-model="i_sell_price"
                :rules="r_price"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

       

    </v-form>
</template>

<script>
export default {

    name: 'ProductEditor',

    props: {
        pid: {
            default: -1,
        },
        validate: {
            type: Boolean,
            default: false,
        },
    },
    
    data() {
        return{
            i_name: '',
            i_category: '',
            i_needs_cold: false,
            i_buy_price: 0,
            i_sell_price: 0,
            i_producer: '',
            i_short_description: '',
            i_description: '',
            i_photo_b64: null,
            upload_image: null,
            image: null,

            r_name: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 32 || 'Maksymalnie 32 znaków',
                value => (value || '').length >= 1 || 'Minimum 1 znak',
            ],

            r_category: [
                value => !!value || 'To pole jest wymagane!',
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                value => (value || '').length <= 32 || 'Maksymalnie 32 znaków',
                value => (value || '').length >= 3 || 'Minimum 3 znaki',
            ],

            r_price: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '') >= 0 || 'Cena nie może być ujemna',
            ],

            r_producer: [
                value => !!value || 'To pole jest wymagane!',
            ],

            r_short_description: [
                value => (value || '').length <= 64 || 'Maksymalnie 64 znaki',
            ],

            r_image: [
                value => !value || value.size < 5000000 || 'Obraz powinien być mniejszy niż 5 MB!',
                value => !value || (value.type == 'image/jpeg' || value.type == 'image/jpg' || value.type == 'image/png' || value.type == 'image/gif') || 'Obsługiwane formaty plików to: JPG, JPEG, PNG, GIF'
            ],


        }
    },

    methods: {

        allValidated(){
            if(this.$refs.detailsForm.validate()){
                return true;
            }
            return false
        },

        loadData(id){ 
           this.$store.dispatch('getProductData',id)
           .then( (product) => {
               //load data from vuex store
                this.i_name = product.product.name;
                this.i_category = product.product.category;
                this.i_needs_cold = product.product.needs_cold;
                this.i_buy_price = product.product.buy_price;
                this.i_sell_price = product.product.sell_price;
                this.i_producer = product.maker.maker_data.maker_id
                this.image = product.product.image;
                this.i_description = product.product.description;
                this.i_short_description = product.product.short_description;
           })
        },

        //convert image to BASE64
        encodeImage() {
            var file = this.upload_image;
            var reader = new FileReader();
            reader.onloadend = () => {
                this.image = reader.result
                console.log(reader.result)
            }
            reader.readAsDataURL(file);
        }

       
    },

    computed:{
        producers(){
            //load possible producers

            let producers = this.$store.getters.getProducers.map( (producer) => {
                return {text: producer.maker_data.firm_name, value: producer.maker_data.maker_id}
            })
            return producers;
            
        }
    },

    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let product = {
                        name: this.i_name,
                        category: this.i_category,
                        needs_cold: this.i_needs_cold,
                        buy_price: this.i_buy_price,
                        sell_price: this.i_sell_price,
                        maker_id: this.i_producer,
                        short_description: this.i_short_description,
                        description: this.i_description,
                        image: this.image,
                    }

                    this.$emit('dataUpdate',product);
                    this.$emit('allValidated',true);
                }
                else{
                    this.$emit('allValidated',false);
                }
            }
        },

        upload_image(val){
            if(val){
                console.log(val);
                this.encodeImage();
            }
            else{
                this.image = null;
            }
            
            // let reader = new FileReader();

            // this.image = URL.createObjectURL(this.upload_image);
            //         this.image.onload = function() {
            //             URL.revokeObjectURL(this.image.src); 
            //         }
            
        }

    },

    mounted() {
        if(this.pid == -1){
            this.i_name = '';
            this.i_category = '';
            this.i_needs_cold = false;
            this.i_buy_price = 0;
            this.i_sell_price = 0;
            this.i_producer = '';
            this.i_description = '';
            this.i_short_description = '',
            this.image = null;
        }
        else{
            this.loadData(this.pid);
        }
        this.$store.dispatch('getAllProducers');
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
        padding-bottom: 1.5rem;
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
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
        height: 5rem;
        /* border: solid 1px rgb(209, 33, 33); */
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
    .date-picker{
        margin: 0 auto;
    }
    .img{
        border: solid 1px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

</style>