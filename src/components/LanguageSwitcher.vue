<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            small
            v-bind="attrs"
            v-on="on"
            :class="{'mr-5':true, 'ml-5':true, 'absolute':absolute }"
          >
          <country-flag :country="currentLanguageIcon" size='normal'/>
            {{ currentLanguageName }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="changeLanguage(item)"
          >
            
            <country-flag :country="item.icon" size=''/>
            {{ item.text }}
               
          </v-list-item>
        </v-list>
      </v-menu>
</template>
      
<script>
import CountryFlag from 'vue-country-flag'


export default {
    
    components:{
        CountryFlag,
    },

    props:{
      absolute: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            items:[
                {icon: 'pl', text: 'PL', language: 'pl'},
                {icon: 'gb', text: 'ENG', language: 'en'},
            ],

            currentLanguageIcon: '',
            currentLanguageName: '',
        }
    },


    methods: {
        changeLanguage(languageItem){
            this.currentLanguageIcon = languageItem.icon;
            this.currentLanguageName = languageItem.text;
            this.$i18n.i18next.changeLanguage(languageItem.language);
            localStorage.setItem('foodwarehouseLanguage',languageItem.language);
        }
    },

    mounted(){
        let languageItem = this.items.find(item => item.language == this.$i18n.i18next.language);
        console.log('cl',localStorage.getItem('foodwarehouseLanguage'));
        console.log('llng1',this.$i18n.i18next.language);
        console.log('llng2',languageItem);
        if(languageItem != null){
            this.currentLanguageIcon = languageItem.icon;
            this.currentLanguageName = languageItem.text;
        }

    }
}
</script>


<style>
    
    .country-icon-menu{
        width: 3rem!important;
    }

    .absolute{
      position: absolute;
    }


</style>