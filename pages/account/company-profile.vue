<template>
  <div class="lg:p-3" v-if="$can('edit_company')">
    <h3 class="py-2 px-3 lg:text-[35px] text-black text-[18px] uppercase semi-bold">{{ $t('CompanyProfiles.Company Profiles') }}</h3>
    <ValidationObserver class="w-full lg:card lg:p-4" v-slot="{ invalid }">
      <form class="lg:grid lg:grid-cols-6 gap-6" @submit.prevent="fromSubmit">
        <div class="relative">
          <div class="border-dashed absolute lg:opacity-0 top-[12px] w-[70%] flex items-center justify-content-center  border-t-2 border-smooth ltr:ml-[60px] rtl:mr-[60px]"></div>
          <ul class="lg:px-3 lg:py-4 tab-bg xs:w-[251px] lg:h-[726px] lg:border  border-smooth rounded-3xl">
            <li class="cursor-pointer lg:block z-20 flex-auto text-center">
              <a class="text-xs font-bold uppercase lg:px-5 lg:py-4  block leading-normal"
                 v-on:click="toggleTabs(1, invalid)">
                <div class="lg:flex items-center gap-2">
                  <span class="rounded-full  lg:p-[7px] p-[2px] lg:text-[16px] text-[10px] lg:w-[40px] w-[24px] h-[24px] lg:h-[40px]"
                        v-bind:class="{' border-primary border-2 text-primary bg-white': openTab !== 1, 'border-2 border-theem bg-theem text-white': openTab === 1}">1</span>
                  <div class="lg:ltr:text-start lg:rtl:text-end text-center">
                    <span class="lg:block hidden">STEP 1</span>
                    <span class="lg:font-10px text-[8px]" v-bind:class="{'text-primary': openTab !== 1, 'text-theem': openTab === 1}">{{
                        $t('CompanyProfiles.GENERAL INFO')
                      }}</span>
                  </div>
                </div>
              </a>
            </li>
            <li class="cursor-pointer z-20 lg:block flex-auto text-center">
              <a class="text-xs font-bold uppercase lg:px-5 lg:py-4  block leading-normal"
                 v-on:click="toggleTabs(2, invalid)">
                <div class="lg:flex items-center gap-2">
                  <span class="rounded-full lg:p-[7px] p-[2px] lg:text-[16px] text-[10px] lg:w-[40px] w-[24px] h-[24px] lg:h-[40px]"
                        v-bind:class="{' border-primary border-2 text-primary bg-white': openTab !== 2, 'border-2 border-theem bg-theem text-white': openTab === 2}">2</span>
                  <div class="lg:ltr:text-start lg:rtl:text-end text-center">
                    <span class="lg:block hidden">STEP 2</span>
                    <span class="lg:font-10px text-[8px]" v-bind:class="{'text-primary': openTab !== 2, 'text-theem': openTab === 2}">{{
                        $t('CompanyProfiles.PRIMARY INFO')
                      }}</span>
                  </div>
                </div>
              </a>
            </li>
            <li class="cursor-pointer z-20  lg:block flex-auto text-center">
              <a class="text-xs font-bold  uppercase lg:px-5 lg:py-4  block leading-normal"
                 v-on:click="toggleTabs(3, invalid)">
                <div class="lg:flex items-center gap-2">
                  <span class="rounded-full  lg:p-[7px] p-[2px] lg:text-[16px] text-[10px] lg:w-[40px] w-[24px] h-[24px] lg:h-[40px]"
                        v-bind:class="{' border-primary border-2 text-primary bg-white': openTab !== 3, 'border-2 border-theem bg-theem text-white': openTab === 3}">3</span>
                  <div class="lg:ltr:text-start lg:rtl:text-end text-center">
                    <span class="lg:block hidden">STEP 3</span>
                    <span class="lg:font-10px text-[8px]" v-bind:class="{'text-primary': openTab !== 3, 'text-theem': openTab === 3}">{{
                        $t('CompanyProfiles.LOCATION INFO')
                      }}</span>
                  </div>
                </div>
              </a>
            </li>

            <li class="cursor-pointer z-20 lg:block flex-auto text-center">
              <a class="text-xs font-bold uppercase lg:px-5 lg:py-4  block leading-normal"
                 v-on:click="toggleTabs(4, invalid)">
                <div class="lg:flex items-center gap-2">
                  <span class="rounded-full  lg:p-[7px] p-[2px] lg:text-[16px] text-[10px] lg:w-[40px] w-[24px] h-[24px] lg:h-[40px]"
                        v-bind:class="{' border-primary border-2 text-primary bg-white': openTab !== 4, 'border-2 border-theem bg-theem text-white': openTab === 4}">4</span>
                  <div class="lg:ltr:text-start lg:rtl:text-end text-center">
                    <span class="lg:block hidden">STEP 4</span>
                    <span class="lg:font-10px text-[8px]" v-bind:class="{'text-primary': openTab !== 4, 'text-theem': openTab === 4}">SOCIAL INFO</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>

        </div>
        <div class="w-full col-span-5 px-4">
          <div class="tab-content input-wrapper tab-space">

            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <div class="lg:p-4 py-2">
                <div class="title pb-4">
                  <h4 class="uppercase text-primary lg:text-[30px] text-[16px] font-bold">{{
                      $t('CompanyProfiles.General Information')
                    }}</h4>
                  <p class="lg:text-normal text-[10px]">Please, provide company name, details, sub domain,
                    email, mobile, and CR number </p>
                </div>

                <div class="form-group">
                  <!-- <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="fromData.subdomain" :IsReadOnly="true"
                        @updateInput="updateInput">
                      </lang-input> -->
                  <div class="input-wrapper mb-2">
                    <label class="semi-bold" for="">{{ $t('CompanyProfiles.Company Name') }}</label>
                    <input type="text" placeholder="Slug" v-model="fromData.company_name" readonly>
                  </div>

                  <lang-input :hasError="hasError" type="short_description" :title="$t('vendor.details')"
                              :valuesOfLang="fromData.details"
                              @updateInput="updateInput"></lang-input>


                  <div class="input-wrapper mb-2">
                    <label class="semi-bold" for="">{{ $t('vendor.subdomain') }}</label>
                    <input type="text" :placeholder="$t('vendor.subdomain')" v-model="fromData.subdomain" readonly>
                  </div>


                  <div class="input-wrapper   mb-2">
                    <label for="">{{ $t('CompanyProfiles.Logo Upload') }}</label>
                    <div class="flex gap-4">

                      <upload-files :old_images="getLogo" class="w-full" accept="image/*"
                                    @updateInput="saveLogoAttachment"></upload-files>
                    </div>
                  </div>


                  <div class="input-wrapper mb-2">
                    <!-- component -->
                    <label for="">{{ $t('CompanyProfiles.Licence Upload') }}</label>
                    <div class="flex gap-4">
                      <upload-files :old_images="getLicence" class="w-full" accept=".pdf,image/*"
                                    @updateInput="saveLicenceAttachment"></upload-files>
                    </div>
                  </div>

                  <div class="input-wrapper mb-2">
                    <!-- component -->
                    <label for="">{{ $t('CompanyProfiles.VatCertificate Upload') }}</label>
                    <div class="flex gap-4">
                      <upload-files :old_images="getVatCertificate" class="w-full" accept="image/*"
                                    @updateInput="saveVatCertificateAttachment"></upload-files>
                    </div>
                  </div>


                  <ValidationProvider name="CR Number" class="w-full" rules="numeric|required" v-slot="{ errors }">
                    <div class="input-wrapper  mb-2">
                      <label for="">{{ $t('vendor.cr_number') }}</label>
                      <input type="text" placeholder="CR Number" v-model="fromData.crNumber"
                             :class="{invalid: errors[0]}" readonly>
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>


                  <div class="ltr:text-right rtl:text-start">
                    <button v-on:click="toggleTabs(2)" :disabled="!step1Check"
                            class="p-1 text-[14px] font-semibold px-4 text-[14px] font-semibold h-[36px] bg-primary rounded-[10px] leading-3  text-white ">
                      <span class="flex justify-between gap-2"><span>{{ $t('CompanyProfiles.Next') }}</span> <img
                        class="w-3 h-3 rtl:rotate-180"
                        src="~/assets/icon/arrow-white.svg"></span>
                    </button>
                  </div>
                </div>

              </div>

              <!-- --------------- -->
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <div class="p-4">
                <div class="title pb-4">
                  <h4 class="uppercase text-primary text-[30px] font-bold">{{
                      $t('CompanyProfiles.Primary Information')
                    }}</h4>
                  <p class="text-normal">Please, provide company logo, licence, foundation date,
                    production start date, email, mobile, and facility </p>
                </div>
                <div class="form-group">
                  <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.email") }}</label>
                    <div class="flex">
                      <div class="w-full">
                        <ValidationProvider name="email" class="w-full" rules="email|required" v-slot="{ errors }">
                          <input type="text" placeholder="Email" v-model="fromData.contact_json.email">
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>

                  <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.mobile") }}</label>
                    <div class="flex">
                      <div class="w-full">
                        <ValidationProvider class="w-full" name="Mobile" rules="required" v-slot="{ errors }">
                          <input type="text" placeholder="Mobile" v-model="fromData.contact_json.mobile">
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>

                  <div class="input-wrapper mb-2">
                    <label for="">{{ $t('vendor.foundation_date') }}</label>
                    <input type="date" v-model="fromData.founded_date">

                  </div>
                  <div class="input-wrapper mb-2">
                    <label for="">{{ $t('vendor.production_start') }}</label>
                    <input type="date" v-model="fromData.production_start_date">
                  </div>

                  <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.primary_email") }}</label>
                    <div class="w-full">
                      <ValidationProvider name="primary email" class="w-full" rules="email|required"
                                          v-slot="{ errors }">
                        <input type="text" placeholder="Email" v-model="fromData.primary_email">
                        <span v-if="errors.length" class="error">
                  {{ $t('global.req', {type: $t('vendor.primary_email')}) }}
                </span>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.primary_mobile") }}</label>
                    <div class="w-full">
                      <ValidationProvider class="w-full" name="Primary mobile" rules="required" v-slot="{ errors }">
                        <input type="text" placeholder="Mobile" v-model="fromData.primary_mobile">
                        <span v-if="errors.length" class="error">
                      {{ $t('global.req', {type: $t('vendor.primary_mobile')}) }}
                    </span>
                      </ValidationProvider>
                    </div>
                  </div>

                  <ValidationProvider class="w-full" name="Facility" rules="required" v-slot="{ errors }">
                    <div class="input-wrapper  mb-2">
                      <label for="">{{ $t("vendor.facility") }}</label>
                      <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.facility_type_id">
                        <option value="1">Individual</option>
                        <option value="2">Establishment</option>
                      </select>
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <!--                  <ValidationProvider name="status" class="w-full" rules="numeric|required" v-slot="{ errors }">-->
                  <!--                    <div class="input-wrapper  mb-2">-->
                  <!--                      <label for="">{{ $t('vendor.status') }}</label>-->
                  <!--                      <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">-->
                  <!--                        <option value="1" :selected="fromData.status">Enable</option>-->
                  <!--                        <option value="0" :selected="fromData.status === 0">Disable</option>-->
                  <!--                      </select>-->
                  <!--                      <span class="error">{{ errors[0] }}</span>-->
                  <!--                    </div>-->
                  <!--                  </ValidationProvider>-->

                  <div class="flex justify-between">
                    <button v-on:click="toggleTabs(1)"
                            class="p-1 px-2 bg-white border text-[14px] font-semibold border-primary rounded-[10px] leading-3 h-[36px]  text-primary ">
                      <span class="flex justify-between gap-2"><img class="w-3 h-3 rtl:rotate-180"
                                                                    src="~/assets/icon/arowgreen.svg"><span>{{
                          $t('CompanyProfiles.Previous')
                        }}</span> </span>
                    </button>
                    <button v-on:click="toggleTabs(3)" :disabled="!step2Check"
                            class="p-1 px-4  text-[14px] font-semibold bg-primary rounded-[10px] leading-3 h-[36px]  text-white ">
                      <span class="flex justify-between gap-2"><span>{{ $t('CompanyProfiles.Next') }}</span> <img
                        class="w-3 h-3 rtl:rotate-180"
                        src="~/assets/icon/arrow-white.svg"></span>
                    </button>
                  </div>
                </div>

              </div>
              <!-- --------------- -->
            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <div class="p-4">
                <div class="title pb-4">
                  <h4 class="uppercase text-primary  text-[30px] font-bold">{{
                      $t('CompanyProfiles.Location Information')
                    }}</h4>
                  <p class="text-normal">Please, provide country, city, area,
                    street, building information</p>
                </div>
                <div class="form-group">
                  <div class="grid grid-cols-2 gap-4">
                    <ValidationProvider class="w-full" name="Country" rules="required" v-slot="{ errors }">
                      <div class="input-wrapper  mb-2">
                        <label for="">{{ $t("vendor.country") }}</label>
                        <select class="border border-smooth w-100 p-2 rounded cursor-not-allowed"
                                v-model="fromData.country_id">
                          <option value="194" disabled>{{ $t('app.Saudi Arabia') }}</option>
                          <!--                          <option :value="countryList.id" v-for="countryList in allCountries"-->
                          <!--                                  :selected="countryList.id === fromData.country_id">{{ countryList.name }}-->
                          <!--                          </option>-->
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>


                    <ValidationProvider class="w-full" name="City" rules="required" v-slot="{ errors }">
                      <div class="input-wrapper  mb-2">
                        <label for="">{{ $t("vendor.city") }}</label>
                        <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.city_id">
                          <option value="" disabled>Choose City</option>
                          <option :value="cityList.id" v-for="cityList in allCitiesById"
                                  :selected="cityList.id === fromData.city_id">{{ cityList.name }}
                          </option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <ValidationProvider class="w-full" name="Area" rules="required" v-slot="{ errors }">
                    <div class="input-wrapper mb-2">
                      <label for="">{{ $t("vendor.area") }}</label>
                      <input type="text" placeholder="Area name" v-model="fromData.contact_json.area">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider class="w-full" name="Street" rules="required" v-slot="{ errors }">
                    <div class="input-wrapper mb-2">
                      <label for="">{{ $t('vendor.street') }}</label>
                      <input type="text" placeholder="Street name" v-model="fromData.contact_json.street">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider class="w-full" name="Building" rules="required|numeric" v-slot="{ errors }">
                    <div class="input-wrapper  mb-2">
                      <label for="">{{ $t('vendor.building') }}</label>
                      <input type="text" placeholder="Building name" v-model="fromData.contact_json.building">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <div class="flex justify-between mt-[200px]">
                    <button v-on:click="toggleTabs(2)"
                            class="p-1 px-2 bg-white border border-primary  text-[14px] font-semibold rounded-[10px] leading-3 h-[36px] text-primary ">
                      <span class="flex justify-between gap-2"><img class="w-3 h-3 rtl:rotate-180"
                                                                    src="~/assets/icon/arowgreen.svg"><span>{{
                          $t('CompanyProfiles.Previous')
                        }}</span> </span>
                    </button>
                    <button v-on:click="toggleTabs(4)" :disabled="!step3Check"
                            class="p-1 px-4 bg-primary text-[14px] font-semibold rounded-[10px] leading-3 h-[36px]  text-white ">
                      <span class="flex justify-between gap-2"><span>{{ $t('CompanyProfiles.Next') }}</span> <img
                        class="w-3 h-3 rtl:rotate-180"
                        src="~/assets/icon/arrow-white.svg"></span>
                    </button>
                  </div>
                </div>

              </div>
              <!-- --------------- -->
            </div>
            <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
              <div class="p-4">
                <div class="title pb-4">
                  <h4 class="uppercase text-primary text-[30px] font-bold">{{
                      $t('CompanyProfiles.Social Information')
                    }}</h4>
                  <p class="text-normal">Please, provide whatsapp, facebook, linkedin,
                    and youtube</p>
                </div>
                <div class="form-group">
                  <div class="input-wrapper  mb-2">
                    <ValidationProvider class="w-full" name="whatsapp"
                                        :rules="{ regex:  /^https?:\/\/(wa\.)?me/ }"
                                        v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
                      <label for="">{{ $t('vendor.whatsapp') }}</label>
                      <input type="text" placeholder="http://" v-model="fromData.links_json.whatsapp">
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper mb-2">
                    <ValidationProvider class="w-full" name="facebook"
                                        :rules="{ regex: /^https?:\/\/(www\.)?facebook\.com/}"
                                        v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
                      <label for="">{{ $t('vendor.facebook') }}</label>
                      <input type="text" placeholder="http://" v-model="fromData.links_json.facebook">
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper mb-2">
                    <ValidationProvider class="w-full" name="linkedin"
                                        :rules="{ regex:  /^https?:\/\/(www\.)?linkedin\.com/ }"
                                        v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
                      <label for="">{{ $t('vendor.linkedin') }} </label>
                      <input type="text" placeholder="http://" v-model="fromData.links_json.linkedin">
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper  mb-2">
                    <ValidationProvider class="w-full" name="youtube"
                                        :rules="{ regex:  /^https?:\/\/(www\.)?youtube\.com/ }"
                                        v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
                      <label for="">{{ $t('vendor.youtube') }}</label>
                      <input type="text" placeholder="http://" v-model="fromData.links_json.youtube">
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper flex justify-between mt-[200px] text-end mb-2">
                    <button v-on:click="toggleTabs(3)"
                            class="p-1 px-2 bg-white border border-primary rounded-[10px] text-[14px] font-semibold leading-3 h-[36px]  text-primary ">
                      <span class="flex justify-between gap-2"><img class="w-3 rtl:rotate-180 h-3"
                                                                    src="~/assets/icon/arowgreen.svg"><span>{{
                          $t('CompanyProfiles.Previous')
                        }}</span> </span>
                    </button>
                    <button @click="submit = true" :disabled="!step4Check || invalid"
                            class="btn bg-primary hover:text-primary text-[14px] font-semibold leading-3  h-[36px] text-white border-secondary lg:mt-20 mt-0">
                      <span class="flex justify-center items-center gap-2"> <span>{{
                          $t('CompanyProfiles.Save')
                        }}</span> <img class="h-3 w-3"
                                       src="~/assets/icon/archive-add.svg"
                                       alt=""></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <!-- --------------------successfull modal---------- -->
    <template v-if="successModal">
      <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-50 bg-white popbg p-6 relative rounded-md shadow w-[396px] h-[220px]">
          <!-- <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg> -->
          <!-- Modal Content -->
          <div class="mb-4 text-center">
            <img class="w-[72px] h-[72px] mx-auto" src="~/assets/icon/like-shapes.svg" alt="">
            <h3 class="text-[24px] leading-5 text-primary capitalize font-medium tracking-wider">{{
                $t('vendor.Awesome')
              }}</h3>
            <p class="text-[12px] leading-5 capitalize tracking-wider">
              {{ $t('vendor.Company Profile Saved Succesfully') }}</p>
            <button @click="closePopup" tyle="box-shadow: -7px 7px 20px -3px #01A78180;"
                    class="leading-3  rounded-[12px] bg-primary text-white mt-[20px] w-[91px] h-[36px] uppercase">
              {{ $t('vendor.Ok') }}
            </button>
          </div>
          <!-- Close Button -->


        </div>
      </div>
    </template>
  </div>

</template>
<script>
import vendor from "@/mixin/vendor";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import Modal from '~/components/Modal.vue';
import LangInput from "~/components/langInput.vue";
import UploadFiles from "../../components/UploadFiles.vue";


export default {
  middleware: ['common-middleware', 'auth'],
  mixins: [vendor],
  name: "company-profile",
  components: {
    UploadFiles,
    ValidationProvider,
    ValidationObserver,
    Modal,
    LangInput
  },
  data() {
    return {
      openTab: 1,
      phoneModal: false,
      emailModal: false,
      fromData: {
        id: '',
        name: {'ar': '', 'en': ''},
        details: {'ar': '', 'en': ''},
        subdomain: '',
        company_name: '',
        crNumber: '',
        status: '',
        founded_date: '',
        production_start_date: '',
        primary_email: '',
        primary_mobile: '',
        facility_type_id: '',
        country_id: 194,
        city_id: '',
        contact_json: {
          area: '',
          street: '',
          building: '',
          email: [''],
          mobile: [''],
        },

        links_json: {
          whatsapp: '',
          facebook: '',
          linkedin: '',
          youtube: '',
        },
        logo: [],
        newLogo: '',
        licence: [],
        newLicence: '',
        newVatCertificate: '',

      },
      getLogo: [],
      getLicence: [],
      getVatCertificate: [],
      errors: [],
      hasError: false,
      submit: false,
      fileExt: '',
      // successModal:false
    }
  },
  watch: {
    vendorList() {
      this.fromData.name.ar = this.vendorList?.data.name.ar
      this.fromData.name.en = this.vendorList?.data.name.en
      this.fromData.details.ar = this.vendorList?.data.details.ar
      this.fromData.details.en = this.vendorList?.data.details.en
      this.fromData.subdomain = this.vendorList?.data.subdomain
      this.fromData.company_name = this.vendorList?.data.company_name
      this.fromData.crNumber = this.vendorList?.data.crNumber
      this.fromData.status = this.vendorList?.data.status
      this.fromData.founded_date = this.vendorList?.data.founded_date
      this.fromData.production_start_date = this.vendorList.data.production_start_date
      this.fromData.primary_email = this.vendorList.data.primary_email
      this.fromData.primary_mobile = this.vendorList.data.primary_mobile
      this.fromData.facility_type_id = this.vendorList.data.facility_type_id
      this.fromData.country_id = this.vendorList.data.country_id
      this.fromData.city_id = this.vendorList.data.city_id

      this.getLogo = this.vendorList.data.logo
      this.getLicence = this.vendorList.data.licence
      this.getVatCertificate = this.vendorList.data.vat_certificate
      // console.log('getLicence', this.getLicence)
      //getExtension name
      this.fileExt = this.getLicence?.split('.').pop();


      this.fromData.contact_json.area = this.vendorList.data.contact_json.area
      this.fromData.contact_json.street = this.vendorList.data.contact_json.street
      this.fromData.contact_json.building = this.vendorList.data.contact_json.building
      this.fromData.contact_json.email = this.vendorList.data.contact_json.email
      this.fromData.contact_json.mobile = this.vendorList.data.contact_json.mobile
      this.fromData.links_json.whatsapp = this.vendorList.data.links_json.whatsapp
      this.fromData.links_json.facebook = this.vendorList.data.links_json.facebook
      this.fromData.links_json.linkedin = this.vendorList.data.links_json.linkedin
      this.fromData.links_json.youtube = this.vendorList.data.links_json.youtube


    }

  },
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('vendor', ['vendorList', 'vendorProfile']),
    ...mapGetters('common', ['allCountries', 'allCitiesById']),
    checkNameValue() {
      if (!this.fromData.company_name || !this.fromData.details.ar || !this.fromData.details.en) {
        this.hasError = true
        return true
      } else {
        return false
      }
    },
    successModal() {
      return this.$store.state.vendor.SuccessModal;
    },

    step1Check() {
      const company_name = this.fromData.company_name
      const details_t = this.fromData.details
      const subdomain = this.fromData.subdomain
      const getLogo = this.getLogo
      const getNewLogo = this.fromData.logo
      const getLicence = this.getLicence
      const NewLicence = this.fromData.licence
      const crNumber = this.fromData.crNumber


      const details = details_t.en && details_t.ar;
      const logoCheck = getLogo || getNewLogo;
      const licenceCheck = getLicence || NewLicence;
      // console.log('logoCheck', logoCheck)
      // console.log('licenceCheck', licenceCheck)
      const isValid = company_name && details && subdomain && logoCheck && licenceCheck && crNumber;

      return !!isValid;
    },

    step2Check() {
      const email = this.fromData.contact_json.email;
      const mobile = this.fromData.contact_json.mobile
      const founded_date = this.fromData.founded_date
      const production_start_date = this.fromData.production_start_date
      const primary_email = this.fromData.primary_email
      const primary_mobile = this.fromData.primary_mobile
      const facility_type_id = this.fromData.facility_type_id
      const status = this.fromData.status

      const isValid = email && mobile && founded_date && production_start_date && primary_email && primary_mobile && facility_type_id && status;
      return !!isValid;
    },

    step3Check() {
      const country_id = this.fromData.country_id
      const city_id = this.fromData.city_id
      const area = this.fromData.contact_json.area
      const street = this.fromData.contact_json.street
      const building = this.fromData.contact_json.building

      const isValid = country_id && city_id && area && street && building;
      return !!isValid;
    },
    step4Check() {
      return true
      // const whatsapp = this.fromData.links_json.whatsapp
      // const facebook = this.fromData.links_json.facebook
      // const linkedin = this.fromData.links_json.linkedin
      // const youtube = this.fromData.links_json.youtube
      //
      // const isValid = whatsapp && facebook && linkedin && youtube;
      // return !!isValid;
    },


  },
  methods: {
    ...mapActions('vendor', ['submitData', 'getVendorData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),
    ...mapActions('ui', ['setToastMessage']),

    saveLogoAttachment(logo) {
      console.log('sssssss', logo)
      this.getLogo = logo[0]
      this.fromData.newLogo = logo
    },
    saveLicenceAttachment(attachments) {
      this.getLicence = attachments[0]
      this.fromData.newLicence = attachments
    },

    saveVatCertificateAttachment(attachments) {
      this.getVatCertificate = attachments[0]
      this.fromData.newVatCertificate = attachments
    },

    toggleTabs: function (tabNumber, invalid) {
      // this.$router.push({
      //   query: {
      //     ...this.$route.query,
      //
      //     step: tabNumber
      //   }
      // })
      if (!this.fromData.company_name) {
        this.hasError = true
      } else {
        this.openTab = tabNumber
      }
    },

    async countrySelected() {
      let countryId = this.fromData.country_id;
      if (countryId) {
        try {
          await this.getCitiesById({id: 194, api: 'getAllCityById', mutation: 'SET_ALL_Cities'})
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    },

    closeModal() {
      this.emailModal = false;
      this.phoneModal = false;
    },
    closePopup() {
      this.successModal = this.$store.commit('vendor/SET_SUCCESS_MODAL', false)
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
  },

  async mounted() {

    if (!this.fromData.id) {
      this.fromData.id = this.profile?.vendor_id
    }
    try {
      // if (!this.vendorList)
        await this.getVendorData({id: this.fromData.id, params: '', api: 'getVendorProfile'})
      this.openTab = parseInt(this.$route.query.step??1)

      if (this.allCountries.length == 0) {
        this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(() => {
          this.fromData.country_id = this.vendorList.data.country_id
          this.countrySelected()
        })
        await this.countrySelected()
      }

    } catch (e) {
      return this.$nuxt.error(e)
    }
  }

}
</script>

<style scoped>
.container-c {
  min-width: 650px;
  max-width: 1200px;
}

.g_info > span {
  width: 100%;
}

.file-wrapper .file-input img {
  /* height: 178px; */
  width: 100%;
}

.tab-bg {
  background-image: url('~/assets/images/cbg.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 100%;
}

.popbg {
  background-image: url('~/assets/images/popbg.svg');
  background-size: 108%;
  background-repeat: no-repeat;
  background-position: 95% 25%;
  border-radius: 16px;
}

.font-10px {
  font-size: 10px;
}

/* .top-100px{
  top:400px !important;
} */
label {
  font-weight: 600;
}
@media only screen and (max-width: 992px) {
  .tab-bg{
    display: flex;
    background: none;
  }
  .input-wrapper >>> label{
    font-size: 14px;
    font-weight: normal;
  }
  label{
    font-weight: normal !important;
  }
}

</style>
