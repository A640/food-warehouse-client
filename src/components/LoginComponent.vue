<template>
    <div class="login-component">
        <h2 class="title">Zaloguj się</h2>

        <div class="cell credentials_error" v-if="c_error">
            <p>Podano niewłaściwe dane logowania. Popraw dane i spróbuj ponownie.</p>
        </div>

        <form class="cell">
            <label class="cell__label">Login</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_login"
                v-on:keyup.enter="login()"
            ></v-text-field>
        </form>
        
        <form class="cell">
            <label class="cell__label">Hasło</label>
            <v-text-field
                class="input"
                label=""
                solo
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password"
                v-on:keyup.enter="login()"
            ></v-text-field>
        </form>

        <div class="cell relative">
            <v-btn class="submit__btn" @click="login()">Zaloguj się</v-btn>
        </div>

        <div class="cell align-center footer">
            <p>Nie masz konta?
            <router-link :to="{name: 'Register'}" class="cell__link">Zarejestruj się</router-link>
            </p>
        </div>

        
    </div>
</template>

<script>
export default {
    
    data() {
        return{
            passwd_show: false,
            c_login: '',
            c_password: '',
            c_error: false,
        }

    },

    methods: {
        login(){
            let credentials = {
                username: this.c_login,
                password: this.c_password,
            };
            console.log(credentials);
            this.$store.dispatch('login',credentials)
            .then((result) =>{
                console.log(result);
                if(result == 'Admin'){
                    console.log("przechodzimy na admina");
                    this.$router.push({ name: 'Admin'});
                } else if(result == 'Manager'){
                    console.log("przechodzimy na menedżera");
                    this.$router.push({ name: 'Manager'});
                } else if(result == 'Employee'){
                    console.log("przechodzimy na pracownika");
                    this.$router.push({ name: 'Employee'});
                } else if(result == 'Supplier'){
                    console.log("przechodzimy na dostawcę");
                    this.$router.push({ name: 'Supplier'});
                } else if(result == 'Customer'){
                    console.log("przechodzimy na klienta");
                    this.$router.push({ name: 'Store_Grid'});
                } else{
                    console.log("Nie rozpoznano typu użytkownika");
                }
            },(error) =>{
                if(error == "bad credentials"){
                    console.log("nieprawidłowe dane logowania");
                    this.c_error = true;
                }
                else{
                    console.log("problem z połączeniem");
                }
            })
            
        }
    },
}
</script>

<style scoped>

    .login-component{
        width: 50%;
        min-height: 60%;
        background-color: rgb(251, 252, 253);
        
        align-self: center;
        border-radius: 10px;
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        max-width: 550px;
    }

    .input{
        margin-top: 1rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .title{
        margin: 0 auto;
        margin-top: 4rem;
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
        margin-bottom: 2rem;
        /* border: solid 1px red; */
    }

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

    .credentials_error{
        margin-bottom: 1.5rem;
    }

    .credentials_error > p{
        font-size: 0.8rem;
        color: rgb(209, 33, 33);
    }

</style>