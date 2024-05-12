<template>
  <div>
    <ul class="lg:flex mb-10 list-none rounded shadow flex-wrap mb-4 flex-row">
      <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal"
           v-on:click="toggleContentTabs('news')"
           v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 'news', 'border-b-2 border-primary': openContentTab == 'news'}">
          News
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal"
           v-on:click="toggleContentTabs('videos')"
           v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 'videos', 'border-b-2 border-primary': openContentTab === 'videos'}">
          Video
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal"
           v-on:click="toggleContentTabs('faq')"
           v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 'faq', 'border-b-2 border-primary': openContentTab === 'faq'}">
          Faq
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal"
           v-on:click="toggleContentTabs('certificates')"
           v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 'certificates', 'border-b-2 border-primary': openContentTab === 'certificates'}">
          Certificate
        </a>
      </li>
    </ul>
    <div>


      <div v-if="$route.query.content_type === 'news'" v-bind:class="{'hidden': openContentTab !== 'news', 'block': openContentTab === 'news'}">
        <News :vendorId="$route.params.id"/>
      </div>

      <div v-if="$route.query.content_type === 'videos'" v-bind:class="{'hidden': openContentTab !== 'videos', 'block': openContentTab === 'videos'}">
        <Video :vendorId="$route.params.id"/>
      </div>

      <div v-if="$route.query.content_type === 'faq'" v-bind:class="{'hidden': openContentTab !== 'faq', 'block': openContentTab === 'faq'}">
        <vendor-faq :vendorId="$route.params.id" ></vendor-faq>
      </div>

      <div v-if="$route.query.content_type === 'certificates'" v-bind:class="{'hidden': openContentTab !== 'certificates', 'block': openContentTab === 'certificates'}">
        <certificate :vendorId="$route.params.id"/>
      </div>

    </div>
  </div>
</template>
<script>
import News from "@/components/vendorContent/news.vue";
import Video from "@/components/vendorContent/video.vue";
import Faq from "@/components/vendorContent/faq.vue";
import Certificate from "@/components/vendorContent/certificate.vue";
import VendorFaq from "../vendorContent/faq.vue";

export default {
  name: "content",
  components: {VendorFaq, Certificate, Faq, Video, News},
  data() {
    return {
      openContentTab: 'news',
    }
  },
  mounted() {
    this.openContentTab = this.$route.query.content_type ?? 'news'

  },
  methods: {

    toggleContentTabs: function (tabContentNumber) {
      this.openContentTab = tabContentNumber
      this.$router.push({
        query: {
          ...this.$route.query,
          content_type: this.openContentTab
          // filter: this.checkedFilter.join(','),
        }
      })
    }
  }
}
</script>
