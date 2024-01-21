<template>
  <data-page
    ref="dataPage"
    set-api="setWareHouse"
    get-api="getWareHouse"
    empty-store-variable="airPort"
    route-name="warehouses"
    :name="$t('warehouses.create')"
    gate="brand"
    :validation-keys="['name.ar','name.en']"
    :result="result"
    @result="result = $event"
  >

    <template v-slot:form="{hasError}">

      <lang-input :hasError="hasError" type="text" :title="$t('city.name')" :valuesOfLang="result.name"
                  @updateInput="updateInput"></lang-input>

      <div class="input-wrapper">
        <label>{{ $t('unite.manager_number') }}</label>
        <input
          type="text"
          :placeholder="$t('unit.manager_number')"
          v-model="result.manager_number"
          ref="manager_number"
          :class="{invalid: !!!result.manager_number && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.manager_number && hasError"
        >
          {{ $t('category.req', { type: $t('unit.manager_number')}) }}
        </span>
      </div>



      <div class="input-wrapper">
        <span class="mr-15">{{$t('wirehouse.nearest_air_port')}}</span>
        <v-select
          :dir="$t('app.dir')"
          v-model="result.nearest_air_port_id"
          :options="airPort"
          label="name"
          :reduce="c => c.id"
          :placeholder="$t('unit.nearest_air_port')"
          class="custom-select"
        ></v-select>

        <span
          class="error"
          v-if="!!!result.nearest_air_port_id && hasError"
        >
          {{ $t('category.req', { type: $t('unit.nearest_air_port_id')}) }}
        </span>

      </div>



      <div class="input-wrapper">
        <span class="mr-15">{{$t('unit.nearest_sea_port')}}</span>
        <v-select
          :dir="$t('app.dir')"
          v-model="result.nearest_sea_port_id"
          :options="seaPort"
          label="name"
          :reduce="c => c.id"
          :placeholder="$t('unit.nearest_sea_port')"
          class="custom-select"
        ></v-select>

        <span
          class="error"
          v-if="!!!result.nearest_sea_port_id && hasError"
        >
          {{ $t('category.req', { type: $t('unit.nearest_sea_port_id')}) }}
        </span>

      </div>

      <div class="input-wrapper">
         <span class="mr-15">{{$t('unit.is_open_friday')}}</span>
          <v-select
            :dir="$t('app.dir')"
            v-model="result.is_open_friday"
            :options="is_open"
            label="name"
            :reduce="c => c.id"
            :placeholder="$t('unit.is_open_friday')"
            class="custom-select"
          ></v-select>
      </div>

      <div class="input-wrapper">
        <span class="mr-15">{{$t('unit.is_open_saturday')}}</span>
        <v-select
          :dir="$t('app.dir')"
          v-model="result.is_open_saturday"
          :options="is_open"
          label="name"
          :reduce="c => c.id"
          :placeholder="$t('unit.is_open_saturday')"
          class="custom-select"
        ></v-select>


      </div>

      <div class="input-wrapper">
        <label>{{ $t('unite.lang') }}</label>
        <input
          type="text"
          :placeholder="$t('unit.lang')"
          v-model="result.lang"
          ref="lang"
        >

      </div>

      <div class="input-wrapper">
        <label>{{ $t('unite.lat') }}</label>
        <input
          type="text"
          :placeholder="$t('unit.lat')"
          v-model="result.lat"
          ref="lat"
        >
      </div>

    </template>
  </data-page>
</template>

<script>

import Dropdown from "~/components/Dropdown"
import DataPage from "~/components/partials/DataPage"
import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "warehouses",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        name: {'ar': '', 'en': ''},
        manager_number: '',
        is_open_friday: '',
        is_open_saturday: '',
        lat: '',
        lang: '',
        nearest_air_port_id: '',
        nearest_sea_port_id: '',
      },
      is_open:[
        {id:1 , name: 'yes'},
        {id:2 , name: 'no'},
      ]

    }
  },
  mixins: [util],
  components: {
    DataPage,
    Dropdown
  },
  computed: {
    ...mapGetters('warehouse', ['airPort', 'seaPort']),

  },
  methods: {
      updateInput(input, language, value) {
        this.$set(input, language, value);
      },

    ...mapActions('warehouse', ['nearAirPort', 'nearSeaPort']),
  },
  async mounted() {

      try {
        await this.nearAirPort({id: 'air', api: 'getPortData', mutation: 'SET_ALL_AIR_PORT'})
      } catch (e) {
        return this.$nuxt.error(e)
      }


      try {
        await this.nearSeaPort({id: 'sea',api: 'getPortData', mutation: 'SET_ALL_SEA_PORT'})
      } catch (e) {
        return this.$nuxt.error(e)
      }

  }
}
</script>

<style scoped>

</style>
