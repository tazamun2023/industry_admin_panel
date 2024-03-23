
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

    async customerRegister(){
      this.loading = true
      const data = await this.registerCustomer({
        params:{
          ...this.formData
        },
      })

      this.loading = false

      if(data?.status === 200){
        this.setToastMessage(data.message)
        this.errors = []
      }else{
        this.errors = data.data.form
        this.setToastError(data.message)
      }

    },


    checkPassword(){
      this.passwordCon.containsUppercase = /[A-Z]/.test(this.formData.password)
      this.passwordCon.containsLowercase = /[a-z]/.test(this.formData.password)
      this.passwordCon.containsNumber = /[0-9]/.test(this.formData.password)
      this.passwordCon.containsSpecial = /[#?!@$%^&*-]/.test(this.formData.password)
    },

    async sentOtpInMail(){
      this.loading = true
      try {
        const  data = await this.sentOtpToMail({
          params:{
            "email": this.formData.email,
          }
        })
        this.loading = false

        if(data?.status === 200){
          this.otpForm = true
          this.emailMobileForm=false
          this.errors = []
          this.setToastMessage(data.message)
        }else{
          this.setToastError('Email Already Used')
          this.errors = data.data.form
        }


      }catch (e){
        return this.$nuxt.error(e)
      }
    },


    async verifyEmail(){
      this.loading = true
      try {
        const  data = await this.verifyCustomerEmail({
          params:{
            "email": this.formData.email,
            'code': this.formData.otpValue
          }
        })
        this.loading = false
        if(data?.status === 200){
          this.passwordSet = true
          this.otpForm = false
          this.setToastMessage(data.message)
        }else{
          this.setToastError(data.message)
          this.errors = data.data.form
        }


      }catch (e){
        return this.$nuxt.error(e)
      }
    },



  }
}
