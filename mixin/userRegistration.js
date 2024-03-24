
export default {
  data(){
    return {
      passwordCon:{
        containsUppercase:false,
        containsLowercase:false,
        containsNumber:false,
        containsSpecial:false,
        checkLicence:false
      },
      loading: false
    }
  },

  methods:{

    async userRegister(){
      const data = await this.registerUser({
        params:{
          'first_name': this.first_name,
          'last_name': this.last_name,
          'email': this.email,
          'vendor_id': this.vendor_id,
          'roles': this.roles,
          'password': this.password,
          'admin_id': this.admin_id,
          'customer_id': this.customer_id,
        },
        api:'userRegistration'
      })


      if(data?.status === 200){
        this.setToastMessage('', data.message)
        this.errors = []
      }else{
        this.errors = data.data.form
        this.setToastError( '', 'Error Available')
      }

    },


    checkPassword(){
      this.passwordCon.containsUppercase = /[A-Z]/.test(this.formData.password)
      this.passwordCon.containsLowercase = /[a-z]/.test(this.formData.password)
      this.passwordCon.containsNumber = /[0-9]/.test(this.formData.password)
      this.passwordCon.containsSpecial = /[#?!@$%^&*-]/.test(this.formData.password)
    },



  }
}
