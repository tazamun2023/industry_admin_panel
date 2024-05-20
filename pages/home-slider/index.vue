<template>
  <list-page
    ref="listPage"
    list-api="getSliderImages"
    delete-api="deleteSliderImage"
    route-name="home-slider"
    :name="$t('admin.hSlid')"
    gate="view_ui_settings"
    manage_gate="manage_ui_settings"
    class="banner-table"
  >

    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th>{{ $t('admin.img') }}</th>
        <th>{{ $t('app.lang') }}</th>
        <th>{{ $t('index.title') }}</th>
        <th>{{ $t('category.slug') }}</th>
        <th>{{ $t('category.status') }}</th>
        <th/>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td>

          <nuxt-link
            :to="`/home-slider/${value.id}`"
          >
            <lazy-image
              class="w-1/4"
              :data-src="getThumbImageURL(value.small_image)"
              alt=""
            />
          </nuxt-link>


        </td>
        <td>{{$t('app.'+value.local)}}</td>
        <td>{{value.title}}</td>
        <td>{{ value.slug }}</td>

        <td
          class="status"
          :class="{active: value.status == 1 }"
        >
          <span>{{ getStatus(value.status) }}</span>
        </td>
        <td>{{  }}</td>
        <td>
          <button
            v-if="$can('manage_ui_settings')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0"><delete-button-icon/></button>
          <button
            v-if="$can('manage_ui_settings')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"> <EditButtonIcon/></button>

        </td>
      </tr>
    </template>
  </list-page>
  <!--main-slider-->
</template>

<script>
import ListPage from "~/components/partials/ListPage"
import util from '~/mixin/util'
import outsideClick from "~/directives/outside-click"
import LazyImage from "../../components/LazyImage";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";

export default {
  name: "banners",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {

      listApi: 'getSliderImages',
      deleteApi: 'deleteSliderImage',
      routeName: 'home-slider',
      loading: false,
      result:[]
    }
  },
  directives: {outsideClick},
  components: {
    DeleteButtonIcon,
    LazyImage,
    ListPage,
    EditButtonIcon
  },
  mixins: [util],
  computed: {
  },
  methods: {
  },
  async mounted() {
  }
}
</script>
<style lang="stylus">
.banner-table
img
max-width 300px
             max-height 300px
</style>

