export default {
  data() {
    return {
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {

   async fromSubmit(){

     if(this.submit){
       let {data, status} = await this.submitData({id: this.fromData.id, params: this.fromData, api:'updateVendor'})
       if(status === 200){
         this.submit = false
         this.errors = null
       }else if(status > 200){
         this.errors = data.form
         this.submit = false
       }
     }
    }



  }
}
