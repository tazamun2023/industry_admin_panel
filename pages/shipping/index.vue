<template>
  <div>


    <list-edit-page
      card-class="p-4"
      table-class="lg:border border-cardb rounded-[8px]"
      ref="listPage"
      list-api="getSaShipping"
      btn-class="w-full lg:w-[100px]"
      delete-api="deleteShippingRule"
      set-api="storeSaFreeShipping"
      method="post"
      route-name="shipping-rules"
      empty-store-variable="allShippingRules"
      :name="$t('brand.shipRule')"
      :order-options="orderOptions"
      :another-data="{settings:settings}"
      @delete-bulk="deleteBulk"
      @list="itemList = $event"
      @res="getSettings"
    >
      <template v-slot:table-top>
        <p class="button primary-btn">{{ $t('shipping.est') }}</p>
        <h3 class="text-[35px] uppercase font-medium py-4">Shipping faivorate</h3>
      </template>

      <template v-slot:table="{list}">
        <tr class="lite-bold capitalize">
          <th class="w-[150px]">
            {{ $t('shipping.free_shipping') }}
          </th>
          <th class="">{{ $t('city.city') }}</th>
          <th class="col w-1/4"><span class="flex gap-2 items-center">{{ $t('shipping.est_days') }}
        <QuestionTooltip :title="$t('shipping.est')"/>

        </span>
          </th>
          <th class="col w-1/4">{{ $t('shipping.est_hours') }}</th>
          <!--        <th>{{ $t('shipping.price') }}</th>-->
        </tr>

        <tr v-for="(value, index) in list" :key="index">
          <td>
            <SwitchToggle v-model="value.status"/>

            <!--          // <input type="checkbox" :value="1" v-model="value.status">-->
          </td>
          <td>
            <input type="hidden" v-model="value.id">
            {{ value.city_name }}
          </td>
          <td><input class="w-3/4" :disabled="!value.status" type="number" min="0" v-model="value.est_days"></td>
          <td><input class="w-3/4" :disabled="!value.status" type="number" min="0" max="23" v-model="value.est_hours">
          </td>
          <!--        <td><input type="number" v-model="value.default_price"></td>-->

        </tr>
      </template>
      <template v-slot:checkboxArea>
        <div class="lg:p-4 py-10">
          <div class="flex w-full  gap-2">
            <input id="nearest" :onchange="changeDefalutAddress()" v-model="settings.allow_find_nearest_pickup_address"
                   type="checkbox">
            <label for="nearest"
                   class="text-[16px] text-black capitalize">{{ $t('shipping.message') }}</label>
          </div>
          <div class="w-full py-4">
            <p>Shipping Default Address</p>
            <div class="lg:flex w-full gap-4 items-center">
              <div class="relative">
                <select :disabled="settings.allow_find_nearest_pickup_address" v-model="settings.default_address_id"
                        class="border border-cardb lg:w-[602px] w-full rounded-[10px] p-2 h-[44px]" name="" id="">
                  <option :selected="settings.allow_find_nearest_pickup_address" disabled value=""><< Choose Address
                    >>
                  </option>
                  <option v-for="address in addressList?.filter(a=>a.type!='billing')" :value="address.id">{{ address.address_name }}</option>
                </select>
                <label class="absolute top-[16px] ltr:right-1 rtl:left-1" for="">
                  <img class="h-3" src="~/assets/icon/arrow-down-green.svg" alt="">
                </label>
              </div>
              <button :disabled="settings.allow_find_nearest_pickup_address" type="button" @click="addAddress"
                      class="bg-primary h-[44px] text-white flex gap-3 w-full justify-center my-2 lg:my-0 lg:w-[200px] items-center">
                <img class="w-5" src="~/assets/icon/add-square.svg" alt="">
                New Address
              </button>
            </div>
          </div>
          <div class="w-full  md:w-1/2   lg:w-2/5   xl:w-1/3 py-4 ">
            <p class="text-[16px] py-2">Working Days</p>
            <div class="grid grid-cols-2 gap-4 py-2">
              <div v-for="(checked, day) in days" :key="day" class="flex gap-4 select-none items-center">
                <div class="relative">
                  <input
                    :id="day"
                    :value="day"
                    v-model="days[day]"
                    type="checkbox"
                    hidden
                    class="sr-only"
                    @click="toggleDay(day)"
                  />
                  <label
                    :for="day"
                    :class="{ '!bg-primary': days[day] }"
                    class="block cursor-pointer h-6 w-10 rounded-full bg-[#E5E7EB]"

                  ></label>
                  <label
                    :for="day"
                    :class="{ 'translate-x-full': days[day] }"
                    class="dot absolute ltr:left-1 rtl:right-1 cursor-pointer top-1 h-4 w-4 rounded-full bg-white transition"
                  ></label>
                </div>
                <label class="uppercase text-[14px] font-medium" :for="day">{{
                    day.charAt(0).toUpperCase() + day.slice(1)
                  }}</label>
              </div>
            </div>
            <p class="text-[16px] py-2">Working Hourse</p>
            <div class=" grid grid-cols-2 gap-4">
              <div class="flex gap-4 items-center">
                <label class="uppercase text-[14px] font-medium" for="fromTime">From</label>
                <input v-model="settings.working_start_time" id="fromTime" type="time">
              </div>
              <div class="flex gap-4 items-center">
                <label class="uppercase text-[14px] font-medium" for="toTime">To</label>
                <input v-model="settings.working_end_time" id="toTime" type="time">
              </div>
            </div>
          </div>
        </div>
      </template>
    </list-edit-page>

    <add-address></add-address>
    <!--    <AddAddressModel :show-modal="addressmodal" @close="closeModelAddAddress" :address="addressSelected">-->
    <!--    </AddAddressModel>-->
  </div>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import bulkDelete from "~/mixin/bulkDelete";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import ListEditPage from "../../components/partials/ListEditPage.vue";
import {mapActions, mapGetters} from "vuex";
import AddAddressModel from "../../components/AddAddressModel.vue";
import AddAddress from "../../components/AddAddress.vue";
import address from "@/mixin/address";


export default {
  name: "categories",
  middleware: ['common-middleware', 'auth'],

  data() {
    return {
      addressmodal: false,
      addressSelected: null,
      settings: {
        allow_find_nearest_pickup_address: false,
        working_days: [],
        working_start_time: "",
        working_end_time: "",
        default_address_id: ""
      },
      orderOptions: {
        title: {title: this.$t('index.title')},
        created_at: {title: this.$t('category.date')}
      },
      days: {
        Saturday: true,
        Sunday: true,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,

      }
    }
  },
  computed: {
    // Convert the object to an array for sending to the server
    workingDays() {
      return Object.keys(this.days).filter(day => this.days[day]);
    },
    ...mapGetters('address', ['addressList']),
    ...mapGetters('admin', ['profile']),


  },
  components: {
    AddAddress,
    AddAddressModel,
    ListEditPage,
    ListPage,
    DeleteButtonIcon,
    EditButtonIcon
  },
  mixins: [util, bulkDelete, address],
  methods: {
    closeModelAddAddress() {
      console.log("close address modal 222")
      this.addressmodal = false
    },
    changeDefalutAddress() {
      if (this.settings.allow_find_nearest_pickup_address)
        this.settings.default_address_id = ""
    },
    toggleDay(day) {
      this.days[day] = !this.days[day];
      this.settings.working_days = this.workingDays
    },
    setDays(newDaysArray) {
      // Reset all days to false
      Object.keys(this.days).forEach(day => {
        this.days[day] = false;
      });
      // Set the days from the server to true
      newDaysArray.forEach(day => {
        if (this.days.hasOwnProperty(day)) {
          this.days[day] = true;
        }
      });
    },

    getSettings(res) {
      this.settings = res?.settings
      if (!this.settings.allow_find_nearest_pickup_address)
        this.settings.allow_find_nearest_pickup_address = false
      this.setDays(this.settings.working_days)
    },
    ...mapActions('address', ['getVendorAddress']),


  },
  mounted() {
    if (!this.addressList)
      this.getVendorAddress();

  }
}
</script>

<style scoped>
.w-3\/4 {
  width: 75% !important;
}

#fromTime {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  background-image: url('~/assets/icon/clock.svg'); /* Custom clock icon */

}

.rtl\:right-1:where([dir="rtl"], [dir="rtl"] *) {
  right: 1.25rem;
}
</style>
