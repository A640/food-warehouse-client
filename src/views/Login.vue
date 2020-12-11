<template>
    <div class="login">
       <Login/>
    </div>
</template>

<script>
import Login from '@/components/LoginComponent.vue'

export default {
    components: {
        Login,
    }
}
</script>


<style scoped>

    .login{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        justify-content: center;
    }


</style>