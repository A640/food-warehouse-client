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
        <edit :edit="Boolean(false)" />
        <v-btn :text="!delete_many_mode" :outlined="!delete_many_mode" elevation="0" class="ml-5" @click="delete_many_mode ? disableDeleteManyMode() : delete_many_mode=true">
                <v-icon>mdi-delete</v-icon>
        </v-btn>

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
      <template v-slot:[`item.controls`]="props">
        <delete 
          :id="props.item.product.product_id" 
          :name="props.item.product.name"
          :type="$t('tables.product.typeProduct')"
          :ref="'del' + props.item.product.product_id"
          v-on:DeleteConfirm="deleteOne"
         />
        <edit :edit="Boolean(true)" :product_id="props.item.product.product_id" />
      </template>

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
                <p class="detail detail-title">{{ $t("tables.product.buyPrice") }}: <span class="detail detail-value">{{item.product.buy_price}}</span></p>
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
                <p class="detail details-id mb-0">{{item.product.description}}</p>
              </div>
            </div>
            

          </div>
        </td>
      </template>
      
      </v-data-table>

      <div v-if="delete_many_mode" class="right-buttons">
                <v-btn text class="mb-3 mr-2" @click="disableDeleteManyMode()">{{ $t("common.cancel") }}</v-btn>
                <delete-many :name="$t('tables.product.DMName')" :count="selected.length" :type="$t('tables.product.DMType')" v-on:deleteConfirm="deleteMany()"  ref="delMany"></delete-many>
      </div>
    </v-card>
  </div>
</template>

<script>
import Delete from '@/components/Popups/DeleteConfirmation.vue';
import Edit from '@/components/PopupContents/ProductPopup.vue';
import DeleteMany from '@/components/Popups/DeleteManyConfirmation.vue';


export default {

    components: {
      Delete,
      Edit,
      DeleteMany,
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
        { text: this.$t('common.actions'), value: "controls", sortable: false, align:'center'}
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
</style>