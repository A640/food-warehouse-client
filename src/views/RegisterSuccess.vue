<template>
    <div class="login">
       <Message/>
    </div>
</template>

<script>
import Message from '@/components/RegisterSuccessComponent.vue'

export default {
    components: {
        Message,
    }
}
</script>


<style scoped>

    .login{
        width: 100%;
        min-height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        justify-content: center;
    }


</style>