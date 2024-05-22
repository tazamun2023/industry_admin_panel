export default {
  data() {
    return {
      listParams: {
        type: '',
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
          type: this.$route.query.orderbyType || 'desc',
          orderby: this.$route.query.orderby || 'created_at',
          page: Number(this.$route.query.page) || 1,
          search: this.$route.query.search|| null
        }
      }
    }
  }
}
