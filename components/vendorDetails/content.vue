<template>
  <div>
    <ul class="lg:flex mb-10 list-none rounded shadow flex-wrap mb-4 flex-row">
      <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 1, 'border-b-2 border-primary': openContentTab === 1}">
          News
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 2, 'border-b-2 border-primary': openContentTab === 2}">
          Video
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 3, 'border-b-2 border-primary': openContentTab === 3}">
          Faq
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(4)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 4, 'border-b-2 border-primary': openContentTab === 4}">
          Certificate
        </a>
      </li>
    </ul>
    <div>
      <div v-bind:class="{'hidden': openContentTab !== 1, 'block': openContentTab === 1}">

        <News :vendorId="$route.params.id" />
      </div>
      <div v-bind:class="{'hidden': openContentTab !== 2, 'block': openContentTab === 2}">

        <Video :vendorId="$route.params.id" />

      </div>
      <div v-bind:class="{'hidden': openContentTab !== 3, 'block': openContentTab === 3}">
       <Faq :vendorId="$route.params.id" />
      </div>
      <div v-bind:class="{'hidden': openContentTab !== 4, 'block': openContentTab === 4}">
        <certificate :vendorId="$route.params.id" />
      </div>
    </div>
  </div>
</template>
<script>
  import News from "@/components/vendorContent/news.vue";
  import Video from "@/components/vendorContent/video.vue";
  import Faq from "@/components/vendorContent/faq.vue";
  import Certificate from "@/components/vendorContent/certificate.vue";

  export default {
    name:"content",
    components: {Certificate, Faq, Video, News},
    data(){
      return{
        openTab:1,
        openContentTab: 1,
      }
    },
    methods:{
      toggleTabs: function(tabNumber){
        this.openTab = tabNumber
      },
      toggleContentTabs: function(tabContentNumber){
        this.openContentTab = tabContentNumber
      }
    }
  }
</script>
