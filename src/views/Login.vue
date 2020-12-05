<template>
    <div class="login">
        <div class="card">
            <v-label>Login</v-label>
            <v-text-field
              class="input"
              label="Login"
              solo
            ></v-text-field>
            <v-label>Hasło</v-label>
            <v-text-field
              class="input"
              label="Solo"
              solo
            ></v-text-field>
        </div>
    </div>
</template>




<style scoped>

    .login{
        width: 100%;
        height: 100%;
        background-color: aquamarine;
        display: flex;
        justify-content: center;
    }

    .card{
        width: 50%;
        height: 60%;
        background-color: rgb(251, 252, 253);
        margin: 0 auto;
        align-self: center;
        border-radius: 10px;
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .input{
        margin: 0 25;
    }


</style>