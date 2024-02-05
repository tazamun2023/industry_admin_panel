<template>
  <form @submit.prevent="fromSubmit">
   <div class="grid grid-cols-2 container-c mx-auto gap-4">
        <div class="card p-4">
            <div class="title">
                <h4>General Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">Name</label>
                    <input type="text" placeholder="Name Arabic" v-model="fromData.name.ar">
                    <input type="text" placeholder="Name English" v-model="fromData.name.en">
                </div>

              <div class="input-wrapper mb-2">
                <label for="">Details</label>
                <input type="text" placeholder="Details Arabic" v-model="fromData.details.ar">
                <input type="text" placeholder="Details English" v-model="fromData.details.en">
              </div>

              <div class="input-wrapper mb-2">
                <label for="">Slug/Subdomain</label>
                <input type="text" placeholder="Slug" v-model="fromData.subdomain" readonly>
              </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Email</label>
                    <input type="email" placeholder="Email" v-model="fromData.email">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Mobile</label>
                    <input type="number" placeholder="Mobile" v-model="fromData.mobile">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">CR number</label>
                    <input type="text" placeholder="CR Number" v-model="fromData.cr_number">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Status</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">
                        <option value="">Enable</option>
                        <option value="">Disable</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Primary Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">Foundation date</label>
                    <input type="date"  v-model="fromData.foundation_date" readonly>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Production start date</label>
                    <input type="date"  v-model="fromData.production_date"  readonly>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Primary email</label>
                    <input type="email" placeholder="Email" v-model="fromData.primary_email">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Primary mobile</label>
                    <input type="number" placeholder="Mobile" v-model="fromData.primary_mobile">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Facility Type</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.facility_type">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
            </div>
        </div>
                <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Location Information</h4>
            </div>
            <div class="form-group">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-wrapper  mb-2">
                    <label for="">Country</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.country_id">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">City</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.city_id">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Area name</label>
                    <input type="text" placeholder="Area name" v-model="fromData.area">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Street name</label>
                    <input type="text"  placeholder="Street name" v-model="fromData.street">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Building name</label>
                    <input type="text" placeholder="Building name" v-model="fromData.building">
                </div>


            </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Social Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper  mb-2">
                    <label for="">Whatsapp</label>
                    <input type="url" placeholder="Whatsapp number" v-model="fromData.links_json.whatsapp">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Facebook</label>
                    <input type="url" placeholder="http://" v-model="fromData.links_json.facebook">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">linkedin </label>
                    <input type="url" placeholder="http://" v-model="fromData.links_json.linkedin">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Youtube</label>
                    <input type="url" placeholder="http://" v-model="fromData.links_json.youtube">
                </div>
                <div class="input-wrapper text-end mb-2">
                    <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20">Save Change</button>
                </div>
            </div>
        </div>

   </div>
  </form>
</template>
<script>
import vendor from "@/mixin/vendor";

export default {
  mixins:[vendor],
  name:"company-profile",
  data(){
    return {
       fromData:{
             name: {'ar':'', 'en':''},
             details:{'ar':'', 'en':''},
             subdomain:'',
             cr_number:'',
             status:'',
             foundation_date:'',
             production_date:'',
             primary_email:'',
             primary_mobile:'',
             facility_type:'',
             country_id:'',
             city_id:'',
             area:'',
             street:'',
             building:'',
             email:[],
            mobile:[],

           links_json:{
             whatsapp:'',
             facebook:'',
             linkedin:'',
             youtube:'',
           }



       }
    }
  },
  computed:{

  },
  methods:{



  },
  mounted() {

  }

}
</script>

<style>
.container-c{
    min-width: 650px;
    max-width: 1200px;
}
</style>
