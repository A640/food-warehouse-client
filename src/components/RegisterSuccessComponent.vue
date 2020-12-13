<template>
    <div class="register-success-component">
        

        <v-icon class="ico">mdi-check-circle</v-icon>

        <h2 class="title">Konto zostało utworzone</h2>
        

        <div class="cell align-center footer">
            <p>Teraz możesz przejść do 
            <router-link :to="{name: 'Login'}" class="cell__link">strony logowania</router-link>
            </p>
        </div>

        
    </div>
</template>

<script>
export default {
    

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
                if(result == true){
                    console.log("przechodzimy na admina");
                    this.$router.push({ name: 'Admin'});
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

    .register-success-component{
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

   

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

    .ico{
        margin-top: 20%;
        font-size: 9rem;
        color: #5cb85c;
    }

</style>