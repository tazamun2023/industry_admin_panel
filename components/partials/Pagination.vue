<template>
<!--  <div class="dply-felx j-right">-->
<!--    <ul class="pagination" v-if="totalPage > 1">-->
<!--      <li :class="{disabled: currentPage === 1}" @click.prevent="navigate(-1)">-->
<!--        <i class="icon arrow-left black"></i>-->
<!--      </li>-->

<!--      <li class="page" :class="{disabled: currentPage === value}"-->
<!--          v-for="(value, index) in allPages.slice(getActivePages[0], getActivePages[1])"-->
<!--          :key="index"-->
<!--          @click.prevent="paginate(value)"><span>{{ value }}</span>-->
<!--      </li>-->
<!--      <li :class="{disabled: currentPage === totalPage}" @click.prevent="navigate(1)">-->
<!--        <i class="icon arrow-right black">&nbsp;</i>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
  <div class="mt-10 text-end">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <li
         v-if="totalPage > 1"
         :class="{disabled: currentPage === 1}" @click.prevent="navigate(-1)"
         class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
        <span class="sr-only">Previous</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"/>
        </svg>
      </li>
      <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
      <li aria-current="page"
         :class="{disabled: currentPage === value}"
         v-for="(value, index) in allPages.slice(getActivePages[0], getActivePages[1])"
         :key="index"
         @click.prevent="paginate(value)"
         class="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold cursor-pointer text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ value }}</li>

      <li
         :class="{disabled: currentPage === totalPage}" @click.prevent="navigate(1)"
         class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 cursor-pointer ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span class="sr-only">Next</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"/>
        </svg>
      </li>
    </nav>
  </div>

</template>

<script>
  export default {
    name: 'Pagination',
    data() {
      return {
        sortByType: this.$route.query.orderByType || 'desc',
        sortBy: this.$route.query.orderBy || 'created_at',
        currentPage: Number(this.$route.query.page) || this.page,
        search: this.$route.query.q || null
      }
    },
    props: {
      changingRoute: {
        type: Boolean,
        default: true
      },
      page: {
        type: Number,
        default: 1
      },
      totalPage: {
        type: Number
      },
      pagePer: {
        type: Number,
        default: 5
      }
    },
    watch:{
    },
    directives: {},
    components: {},
    mixins: [],
    computed: {
      getActivePages(){
        let maxPage = this.getPage + (this.pagePer - 1)
        if(maxPage % this.pagePer !== 0){
          maxPage = (((parseInt( maxPage / this.pagePer)) ) * this.pagePer)
        }
        const currentPage = maxPage - (this.pagePer - 1)
        if(maxPage >= this.totalPage){
          maxPage = this.totalPage
        }
        return [currentPage - 1, maxPage ]
      },
      getPage(){
        return this.currentPage
      },
      allPages(){
        const allP = []
        for(let i = 1; i <= this.totalPage; i++){
          allP.push(i)
        }
        return allP
      }
    },
    methods: {
      routeParam() {
        if(this.isDefaultPage()){
          this.resettingRoute()
        }else{
          this.clearQuery()
          this.$emit('fetching-data')
        }

        this.scrollToTop()
      },
      resettingRoute(routeParams = {}){
        this.clearQuery()
        this.$router.push({
          query: {
            ...routeParams,
            ...{
              orderBy: this.orderBy,
              orderByType: this.orderByType,
              page: this.currentPage,
              q: this.search,
            }
          }
        })
        this.$emit('fetching-data')
      },
      clearQuery(){
        this.orderByType = 'desc'
        this.orderBy = 'created_at'
        this.currentPage = 1
      },
      isDefaultPage(){
        return (this.orderByType === 'desc' && this.orderBy === 'created_at' && this.currentPage === 1)
      },
      settingRoute() {
        this.$router.push({
          query: {
            ...this.$route.query,
            ...{
              orderBy: this.orderBy,
              orderByType: this.orderByType,
              page: this.currentPage,
              q: this.search,
            }
          }
        })
      },
      dropdownSelected(isOrderType, data) {
        this.currentPage = 1
        if (isOrderType)
          this.orderByType = data.key
        else
          this.orderBy = data.key

        this.getDataWithRoute()
      },
      scrollToTop() {
        window.scrollTo(0,0);
      },
      getDataFromRoute() {
        this.sortByType = this.$route.query.orderByType || 'desc'
        this.sortBy = this.$route.query.orderBy || 'created_at'
        this.currentPage = Number(this.$route.query.page) || 1
        this.search = this.$route.query.q || null

        this.$emit('fetching-data')
      },
      getDataWithRoute() {
        if(this.changingRoute){
          this.settingRoute()
          this.scrollToTop()
        }
        this.$emit('fetching-data', {
          orderBy: this.orderBy,
          orderByType: this.orderByType,
          page: this.currentPage,
          q: this.q
        })
      },
      navigate(param) {
        if ((param > 0 && this.currentPage >= this.totalPage) || (param < 0 && this.currentPage <= 1))
          return

        this.currentPage += param

        this.getDataWithRoute()
      },
      paginate(page) {
        if (this.currentPage !== page) {
          this.currentPage = page
          this.getDataWithRoute()
        }
      },
      loadData(){
        this.getDataFromRoute()
      },
    },
    destroyed() {
      window.removeEventListener('popstate', this.loadData)
    },
    mounted() {
      window.addEventListener('popstate', this.loadData)
    }
  }
</script>
<style lang="stylus">
  @import "~/assets/styles/pagination.styl"
</style>
