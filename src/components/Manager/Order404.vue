<template>
    <div class="component-wrapper">
        <div class="component-404">
            <v-icon class="ico">mdi-close-circle</v-icon>

            <h2 class="title">{{ $t("errors.orderNotFound") }}</h2>
            

            <div class="cell align-center footer">
                
            </div>       
        </div>
    </div>
    
</template>

<script>
export default {
    

    methods: {
        
    },
}
</script>

<style scoped>

    .component-wrapper{
        width: 100%;
        height: 100%;
       
        /* background-color: rgb(251, 252, 253); */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .component-404{
        width: 50%;
        min-height: 60%;
        background-color: rgb(251, 252, 253);
        
        align-self: center;
        border-radius: 10px;
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        color: #00617e;
    }

    .ico{
        margin-top: 20%;
        font-size: 9rem;
        color: #b85c5c;
    }

</style>