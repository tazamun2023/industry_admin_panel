<template>
    <div class="tab-sidebar">
        <div class="card">
            <div class="title p-2 border-b border-smooth flex justify-between">
                <h3>Add Video </h3>
                <nuxt-link :to="`/video`" class="button primary-btn">List</nuxt-link>
            </div>
            <form class="p-4" @submit.prevent="fromSubmit">
                <!-- <div class="my-2 input-wrapper">
                    <label for="">Video Title</label>
                <input type="text" placeholder="Title here" v-model="fromdata.title">
                </div> -->
                <div  class="my-2 input-wrapper">
                 <label for="">Video Link</label>
                <input type="url"  placeholder="Video Link" v-model="fromdata.url">
                </div>
                <!-- <div  class="my-2 input-wrapper">
                 <label for="">Video Ordering</label>
                <input type="number"  placeholder="example 1" v-model="fromdata.ordering">
                </div> -->
                <div class="text-end">
                    <button class="button primary-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'
export default { 
  name: "Video",
  data() {
    return {
       fromdata:{
        url:'',
        vendor_id:1,
       }
    }
  },
 
  methods: {
   
    ...mapActions('video', ['submitData']),

   async fromSubmit(){
        try {
            this.submitData({
        params:{
          url: this.fromdata.url,
          vendor_id:this.fromdata.vendor_id
       },
       api: "setVideo"
       })
       this.$router.push('/video');
        } catch (error) {
            console.error('Error submitting data:', error); 
        }        
    }, 
  }
}

</script>