<template>
    <div class="login-component">
        <h2 class="title">Zaloguj się</h2>
        <form class="cell">
            <label class="cell__label">Login</label>
            <v-text-field
                class="input"
                label=""
                solo
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
            ></v-text-field>
        </form>

        <div class="cell relative">
            <v-btn class="submit__btn">Zaloguj się</v-btn>
        </div>

        <div class="cell align-center footer">
            <p>Nie masz konta?
            <router-link to="/rejestracja" class="cell__link">Zarejestruj się</router-link>
            </p>
        </div>

        
    </div>
</template>

<script>
export default {
    
    data() {
        return{
            passwd_show: false,
        }

    },
}
</script>

<style scoped>

    .login-component{
        width: 50%;
        height: 60%;
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
        margin-top: 2rem;
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
    }

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

</style>