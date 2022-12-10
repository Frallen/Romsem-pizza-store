import { useFetch,useRuntimeConfig } from "nuxt/app";



export const useCatalog=defineStore("catalog",{
 state:()=> ({
   stuff:[],
   isLoading:
   false
 }),
getters:{

},
  actions: {
   /// параметры к api https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html
    async getDeals( ) {
      try {
        let data = await $fetch(
           `http://localhost:1337/api/catalog-items/?populate=*`
        );//
        console.log(data)
        this.stuff=data
      } catch (e) {
        console.error(e);
      } finally {
      }
    },
  }
})
export const actions = {

};
