
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
           })

           this.addressmodal = false

           if(data?.status === 200){
             this.setToastMessage(data.message)

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
           this.addressData.default = value.default
           this.addressData.phone_code = value.phone_code
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
           this.addressData.default = ''
           this.addressData.phone_code = ''

         },

       async deleting(address) {
           const data = await this.userAddressDelete({
             id: address.id,
           })
            this.deleteModal = false
           if(data?.status === 200){
             this.setToastMessage(data.message)
             await this.getAllAddress()
           }else {
             this.setToastError(data.data.form.join(', '))
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


