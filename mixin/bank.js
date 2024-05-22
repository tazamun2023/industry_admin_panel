
export default {
  data(){
    return {
      disabled: false
    }
  },

  methods:{
  //  ...mapActions('common', ['swetAlertFire']),
    async  getAllVendorBank(){
      await this.getVendorBank({
        params:{
          "vendor_id" : this.profile.vendor_id
        },
        api:"getVendorBank"
      })
    },
    async BankAction() {

       if(this.bankData.id){
         const data = await this.putVendorBank({
           id: this.bankData.id,
           params:{
             ...this.bankData,
           },
           api:"getVendorBank"
         })
         this.Cardmodal = false

         if(data?.status === 200){
           this.setToastMessage(data.message)
           this.getAllVendorBank()
         } else if(data?.status === 201) {
           this.setToastError(data.data?.form?.join(', '))
         }

       }else{
        const data = await this.storeVendorBank({
           params:{
             ...this.bankData,
           },
           api:"getVendorBank"
         })


         if(data?.status === 200){
          //  this.$store.commit('bank/SET_VENDOR_BANK_DATA', {...this.bankData})
          this.getAllVendorBank()
           this.setToastMessage(data.message)
           this.Cardmodal = false

         } else if(data?.status >  200) {
          this.getAllVendorBank()
           this.setToastError(data.data?.form?.join(', '))

         }

       }
    },


    async deleting(value) {
      const res = await this.swetAlertFire({
        params :{
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
        })
        if(res) { 
          const data = await this.vendorBankDelete({
            params: value.id,
            api: "DeleteVendorBank",
          })
          if(data?.status === 200){
            this.setToastMessage(data.message)
          //  this.getAllVendorBank()
          }else {
            this.setToastError(data.data.form.join(', '))
          //  this.getAllVendorBank()
          }
        } 

    },

    addPayment(){
      this.Cardmodal = true
      this.bankData.id = ''
      this.bankData.name = ''
      this.bankData.bank_name = ''
      this.bankData.holder_name = ''
      this.bankData.account_number = ''
      this.bankData.iban_number = ''
      this.bankData.swift_code = ''
      this.bankData.is_default = ''
      if(this.bankList.length < 1) {
        this.bankData.is_default= true;
        this.disabled = true;
      } else {
        this.bankData.is_default= false;
        this.disabled = false;
      }

    },
    editing(value) {
      this.Cardmodal = true
        this.bankData.id = value.id
        this.bankData.name = value.name
        this.bankData.bank_name = value.bank_name
        this.bankData.holder_name = value.holder_name
        this.bankData.account_number = value.account_number
        this.bankData.iban_number = value.iban_number
        this.bankData.swift_code = value.swift_code
        this.bankData.is_default = value.is_default
        if(this.bankList.length <= 1) {
          this.bankData.is_default= true;
          this.disabled = true;
        } else {
          this.bankData.is_default= false;
          this.disabled = false;
        }
    },


  }
}


