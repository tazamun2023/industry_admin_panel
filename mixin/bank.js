
export default {
  data(){
    return {

    }
  },

  methods:{
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
           this.$store.commit('bank/SET_VENDOR_BANK_DATA', {...this.bankData})
           this.setToastMessage(data.message)
           this.Cardmodal = false

         } else if(data?.status >  200) {
           this.setToastError(data.data?.form?.join(', '))

         }

       }
    },


    async deleting(value) {
      const data = await this.vendorBankDelete({
        params: value.id,
        api: "DeleteVendorBank",
      })

      this.deleteModal = false

      if(data?.status === 200){
        this.setToastMessage(data.message)
      }else {
        this.setToastError(data.data.form.join(', '))
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
    },


  }
}


