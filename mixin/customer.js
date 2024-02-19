export default {
  data() {
    return {
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {
    async fromSubmit() {
      // let {data, status} = await this.submitData({id: this.fromData.id, params: this.fromData, api: 'updateCustomer'})

      let data = await this.submitData({id: this.fromData.id, params:{...this.fromData}, api:"updateCustomer"})
      if (status === 200) {
        this.errors = null
      } else if (status === 201) {
        this.errors = data.form
      }
    }
  }
}
