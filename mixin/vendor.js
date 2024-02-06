export default {
  data() {
    return {
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {

   async fromSubmit(){

     let {data, status} = await this.submitData({id: 1, params: this.fromData, api:'updateVendor'})

      if(status === 200){
        this.errors = null
      }else if(status === 201){
        this.errors = data.form
      }


    }


  }
}
