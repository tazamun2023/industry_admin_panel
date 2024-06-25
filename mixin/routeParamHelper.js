export default {
  data() {
    return {
      listParams: {
        orderbyType:'',
        orderby: '',
        page: 0,
        search: null
      }
    }
  },
  methods: {
    settingRouteParam() {
      this.listParams = {
        ...this.listParams,
        ...{
          orderbyType: this.$route.query.orderbyType || 'desc',
          orderby: this.$route.query.orderby || 'updated_at',
          page: Number(this.$route.query.page) || 1,
          search: this.$route.query.search|| null
        }
      }
    }
  }
}
