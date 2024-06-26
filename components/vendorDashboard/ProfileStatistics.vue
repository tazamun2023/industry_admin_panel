<template>
  <div>
    <div v-if="profileData" class="card p-4">

      <div v-if="!profileData?.verified " class="lg:grid  lg:grid-cols-4 ">
        <div class="text-center">
          <p class="text-[20px] font-semibold">{{ profileData?.statistics?.title }}</p>
          <div>
            <div class="frame">
              <div>
                <vue-ellipse-progress
                  :progress="profileData?.statistics?.percent"
                  :angle="-90"
                  :size="120"
                  color="#01A781"
                  emptyColor="#343035"
                >
                  <div class="text">
                    <lazy-image v-if="profileData?.logo" class="profile-image  mx-auto"
                                :lazySrc="profileData?.logo"
                                :datasrc="profileData?.logo"
                                alt=""/>
                    <img v-else class="profile-image mx-auto" src="~/assets/images/vendorprofile.svg" alt="">
                  </div>

                </vue-ellipse-progress>


              </div>
            </div>
          </div>

          <p class=""
             :class="{' text-primary':profileData?.statistics?.percent>=100 ,'text-prograss':profileData?.statistics?.percent<100}">
            {{ profileData?.statistics?.percent }}%</p>
          <!--        <p v-if="profileData?.percent<100" class="text-prograss"><span-->
          <!--          @click="showModal=true"-->
          <!--          :class="{'bg-sucesslight text-primary':profileData?.percent>50,'bg-warninglight':profileData?.percent<50}"-->
          <!--          class=" rounded-[15px] px-2 font-medium"> {{ $t('CompanyProfiles.complete company profile') }}</span>-->
          <!--        </p>-->
          <p class="text-prograss"><span

            :class="{'bg-sucesslight text-primary':profileData?.statistics?.percent>50,'bg-warninglight':profileData?.statistics?.percent<50}"
            class="bg-sucesslight  rounded-[15px] px-2 font-medium"> {{ profileData?.statistics?.message }}</span>
          </p>


          <CompleteProfileModal v-if="$can('edit_company')"
                                :show-modal="showModal"
                                :links="profileData?.statistics?.links"
                                @close="showModal=false"/>
        </div>
        <div class="col-span-2">
          <div class="lg:grid lg:w-[500px] lg:grid-cols-2 gap-4 py-4">
            <nuxt-link
              v-for="(link,index) in profileData?.statistics?.links"
              :to="showLinks?link.link:''"
              class="flex mx-auto my-2 w-[247px] lg:m-0 gap-3 p-[5px] items-center capitalize border border-cardb rounded-[16px]">
              <img class="h-[36px] w-[36px]" :src="link.icon" alt=""> {{ link.name }}
            </nuxt-link>

          </div>
        </div>
      </div>


      <vendor-profile-data  class="my-2" v-if="profileData?.verified  || showProfile" :vendor="profileData"></vendor-profile-data>

    </div>
  </div>
</template>
<script>
import CustomeModal from "../CustomeModal.vue";
import OrderApprovedModal from "../OrderApprovedModal.vue";
import CompleteProfileModal from "./CompleteProfileModal.vue";
import VendorProfileData from "../vendorDetails/profileData.vue";
import {mapGetters} from "vuex";
import LazyImage from "../LazyImage.vue";

export default {
  components: {LazyImage, VendorProfileData, CompleteProfileModal, OrderApprovedModal},

  data() {
    return {
      showModal: false,
    }
  },

  props: ['profileData', 'showProfile', 'showLinks'],

};
</script>


