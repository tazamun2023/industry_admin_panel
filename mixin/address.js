import {mapActions} from "vuex";
export default {
     data(){
       return {

       }
     },

     methods:{
       async addressAction() {
         if(this.addressData.type){
           const data = await this.userAddressAction({
             ...this.addressData,
             default: this.addressData.is_default
           })

           this.addressmodal = false

           if(data?.status === 200){
             this.setToastMessage(data.message)
             this.$emit('close')

           } else if(data?.status === 201) {
             this.setToastError(data.data?.form?.join(', '))

           }
         }else{
             this.hasError = true
         }

       },

       async editAddress(value){
           this.addressmodal = true
           this.addressData.id = value.id
           this.addressData.vendor_id = value.vendor_id
           this.addressData.email = value.email
           this.addressData.phone = value.phone
           this.addressData.country_id = value.country_id
           this.addressData.city_id = value.city_id
           this.addressData.zip = value.zip
           this.addressData.address_name = value.address_name
           this.addressData.district = value.district
           this.addressData.street = value.street
           this.addressData.building_number = value.building_number
           this.addressData.nearest_landmark = value.nearest_landmark
           this.addressData.type = value.type
           this.addressData.is_default = value.default
           this.addressData.default = value.default
           this.addressData.phone_code = value.phone_code
           this.addressData.lat = value.lat
           this.addressData.lng = value.lng
       },

         addAddress(){
           this.addressmodal = true
           this.addressData.id = ''
           this.addressData.vendor_id = this.profile.vendor_id
           this.addressData.email = this.profile.email
           this.addressData.phone = ''
           this.addressData.country_id = this.profile.country_id
           this.addressData.city_id = ''
           this.addressData.zip = ''
           this.addressData.address_name = ''
           this.addressData.district = ''
           this.addressData.street = ''
           this.addressData.building_number = ''
           this.addressData.nearest_landmark = ''
           this.addressData.type = ''
           this.addressData.is_default = ''
           this.addressData.phone_code = '',
           this.addressData.lan = ''
           this.addressData.lng = ''

         },

      //  async deleting(address) {
      //      const data = await this.userAddressDelete({
      //        id: address.id,
      //      })
      //       this.deleteModal = false
      //      if(data?.status === 200){
      //        this.setToastMessage(data.message)
      //        await this.getAllAddress()
      //      }else {
      //        this.setToastError(data.data.form.join(', '))
      //      }
      //  },
   ...mapActions('common', ['swetAlertFire']),
   ...mapActions('address', ['userAddressAction', 'getVendorAddress', 'userAddressDelete', 'updateAddress']),
       async deleting(address) {
        const res = await this.swetAlertFire({
          params :{
            title: this.$i18n.t('approvedModal.sure'),
            text: this.$i18n.t('approvedModal.revert'),
          }
          })
          if(res) {
            const data = await this.userAddressDelete({
              id: address.id,
            })
            if(data?.status === 200){
              this.setToastMessage(data.message)
              await this.getAllAddress()
            }else {
              this.setToastError(data.data.form.join(', '))
            }
          } else {
            return false;
          }
      },
  

       shipping(){
         this.addressData.type = "shipping"
       },

       billing(){
         this.addressData.type = "billing"
       },

       both(){
         this.addressData.type = "both"
       },


     }
}


