
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
         const data = await this.updateAddress({
             id: value.id,
           })

         if(data.status == 200){

           this.addressmodal = true

           this.addressData.id = data.data.id
           this.addressData.vendor_id = data.data.vendor_id
           this.addressData.email = data.data.email
           this.addressData.name = data.data.name
           this.addressData.phone = data.data.phone
           this.addressData.country_id = data.data.country_id
           this.addressData.city_id = data.data.city_id
           this.addressData.zip = data.data.zip
           this.addressData.address_name = data.data.address_name
           this.addressData.district = data.data.district
           this.addressData.street = data.data.street
           this.addressData.building_number = data.data.building_number
           this.addressData.nearest_landmark = data.data.nearest_landmark
           this.addressData.type = data.data.type
           this.addressData.default = data.data.default
           this.addressData.phone_code = data.data.phone_code
         }else if(data?.status === 201) {
           this.setToastError(data.data?.form?.join(', '))

         }

       },

       async deleting(address) {
           const data = await this.userAddressDelete({
             id: address.id,
           })

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


