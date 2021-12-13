<template>
  <div>
    
    <!-- placeholder while loading data -->
    <v-card v-if="loading_data">
      <v-skeleton-loader 
        class="pr-5 pl-5"
        type="table-heading,  table-row@4,  table-tfoot"
      >
      </v-skeleton-loader>
    </v-card>
    

    <!-- after load show actual data -->
    <v-card v-else>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('tables.product.searchForProduct')"
          single-line
          hide-details
        ></v-text-field>
       

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        :expanded.sync="expanded"
        :show-select="delete_many_mode" 
        v-model="selected"
        show-expand
        :fixed-header="true"
        :single-expand="false"
        item-key="product.product_id"
      >

      <!-- insert table controls -->
      <!-- <template v-slot:[`item.controls`]="props">
        
      </template> -->

      <!-- insert into item expand slot -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length+1" class="pa-0 details" >
          <div class="mb-5">
            <div class="bg">
              <v-img class="mini-img" height="5rem" max-width="5rem" contain :src="item.product.image"></v-img>
              <div class="ml-5">
                <p class="detail details-name">{{item.product.name}}</p>
                <p class="detail details-id mb-0">{{ $t("common.id") }}: {{item.product.product_id}}</p>
              </div>
            </div>
            <div class="details-container mb-5">
              <div class="cluster fix ml-5">
                <p class="cluster-title">{{ $t("tables.product.productDetails") }}:</p>
                <p class="detail detail-title">{{ $t("products.category") }}: <span class="detail detail-value">{{item.product.category}}</span></p>
                <p class="detail detail-title">{{ $t("products.requiresRefrigeration") }}: <span class="detail detail-value">{{ item.product.needs_cold ? $t("common.yes") : $t("common.no") }}</span></p>
                <p class="detail detail-title">{{ $t("products.buyPrice") }}: <span class="detail detail-value">{{item.product.buy_price}}</span></p>
                <p class="detail detail-title">{{ $t("tables.product.sellPrice") }}: <span class="detail detail-value">{{item.product.sell_price}}</span></p>
              </div>
              <v-divider vertical inset class="ml-10 mr-10 " />
              <div class="cluster ">
                <p class="cluster-title">{{ $t("products.manufacturer") }}</p>
                <p class="detail detail-title"><span class="detail detail-value">{{item.maker.maker_data.firm_name}}</span></p>
                <p class="detail detail-title">{{ $t("common.phone") }}: <span class="detail detail-value">{{item.maker.maker_data.phone}}</span></p>
                <p class="detail detail-title">{{ $t("common.email") }}: <span class="detail detail-value">{{item.maker.maker_data.email}}</span></p>
              </div>
            </div>
            <v-divider />
            <div class="details-container">
              
              <div class="ml-5">
                <p class="detail detail-value">{{ $t("products.shortDescription") }}</p>
                <p class="detail details-id mb-0">{{item.product.short_description}}</p>
                <p class="detail detail-value">{{ $t("products.description") }}</p>
                <p class="detail details-id mb-0 multiline">{{item.product.description}}</p>
              </div>
            </div>
            

          </div>
        </td>
      </template>
      
      </v-data-table>

    </v-card>
  </div>
</template>

<script>



export default {

    components: {
    
    },

    data () {
    return {
      search: '',
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: this.$t('common.name'),
          align: 'start',
          value: 'product.name',
        },
        { text: this.$t('products.category'), value: 'product.category' },
        { text: this.$t('products.requiresRefrigerationShort'), value: 'product.cold', align:'center' },
        { text: this.$t('products.manufacturer'), value: 'maker.maker_data.firm_name' },
        { text: this.$t('tables.product.buyPrice'), value: 'product.buy_price', align:'right' },
        { text: this.$t('tables.product.sellPrice'), value: 'product.sell_price', align:'right' },
      ],
      products: [],
      expanded: [],
      selected: [],
      delete_many_mode: false,
      // loading_data: true,
    }  
  },


  methods: {

      disableDeleteManyMode(){
        this.delete_many_mode = false;
        this.selected = [];
      },

      deleteMany(){
        let delete_ids = this.selected.map( (product) => {
            return product.product.product_id;
        })
        // console.log(delete_ids);
        this.$store.dispatch('deleteManyProducts',delete_ids)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllProducts');
            this.$refs['delMany'].dialogClose();
            this.selected = [];
            this.delete_many_mode = false;
            
        })
        .catch((err) => {
            console.log(err);
            this.$refs['delMany'].dialogClose();
        })
      },

      deleteOne(id){
        console.log(id)
        this.$store.dispatch('deleteProduct',id)
        .then( () => {
            // if added  successfully (resolved promise) clear popup and close
            
            this.$store.dispatch('getAllProducts');
            this.$refs['del' + id ].dialogClose();
            
        })
        .catch((err) => {
            if(err === "serverBlockDelete"){
              alert(this.$t('errors.unableToDeleteFromDatabase'))
            }
            console.log(err);
            this.$refs['del' + id ].dialogClose();
        })
      },
      
  },

  computed: {
    loading_data(){
      if(this.$store.getters.getNoConnection){
        return true;
      }else{
        return this.$store.getters.getProductsLoading;
      }
    },
    reconnected(){
      return this.$store.getters.getReconnected;
    }
  },

  created() {
    this.$store.watch(
      ()=>{
        return this.$store.getters.getProducts // could also put a Getter here
      },
      (newValue)=>{
        //Update data when changed
        let prod = newValue.map((product) => {
          product.product.cold = product.product.needs_cold ? this.$t("common.yes") : this.$t("common.no");
          return product;
        })
        this.products = prod;
      },
      //To detect nested value changes inside Objects
      {
        deep:true
      }
      )      
  },

  watch:{
    reconnected(val){
      if(val){
        this.$store.dispatch('getAllProducts',true);
      }
    }
  },

  mounted() {
    
    this.products = this.$store.getters.getProducts;
    this.$store.dispatch('getAllProducts');
  }

}
</script>

<style scoped>
  .details{
    margin: 0;
    padding: 0;
    background-color: white;
    background-color: #F0F2F5;
  }

  .details-container{
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    /* justify-content: center; */
    align-items: flex-start;
    margin-top: 2rem;
  }

  .detail{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: none;
    margin-bottom: 0.4rem;
  }

  .details-name{
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
    
  }

  .details-id{
    font-weight: 400;
    font-size: 0,8rem;
    margin-bottom: 1.5rem;
  }

  .cluster{
    /* width: 50%; */
    display: block;
  }

  .cluster-title{
    color: #acacac;
    font-family: 'Segoe UI';
    font-weight: 400;
    font-size: 0.8rem;
    margin-bottom: 0.9rem;
    /* margin-top: 2rem; */
  }

  .detail-title{
    font-weight: 400;
    font-size: 0.8rem;
  }
  .detail-value{
    font-weight: 600;
    font-size: 1rem;
  }
  .fix{
    min-width: 40%;
  }
  .bg{
    /* background-color: #F0F2F5; */
    /* background-color: rgb(184, 184, 184); */
    background-color: white;
    width: 100%;
    padding: 2rem;
    padding-bottom: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .right-buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem;
  }
  .mini-img{
    /* border: solid 1px rgba(0, 0, 0, 0.5); */
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .multiline {
        white-space: pre-wrap;
  }
</style>