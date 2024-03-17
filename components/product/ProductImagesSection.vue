<script>
export default {
  name: "ProductImagesSection",
  middleware: ['common-middleware', 'auth'],
  props:{
    setById:{

    },
    id:{

    },
    images:{

    },
    isThumb:{

    },
  },

  data() {
    return {
      hasError: false,

      result:{
        product_images: [],
        images: '',
      }
    }
  },

  methods:{
    async setThumb(url) {
      this.loading = true
      try {
        const data = await this.setById({id: this.id, params: {url: url}, api: 'setProductThumbImage'})
        if (data) {
          this.isThumb = data.thumb_image
          this.productImagesSection()
        }
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.loading = false
      console.log(url)
    },
    saveAttachment(images) {
      console.log(images)
      this.result.product_images = images
      this.productImagesSection()
    },
    getThumb(url) {
      return url
    },
    productImagesSection(){
      this.$emit('productImagesSection', this.result);
    }


  },

  mounted() {

  }
}
</script>

<template>
  <div class="tab-sidebar p-3">

    <div class="input-wrapper">
      <label class="pl-4 pt-0 fw-bold">
        {{ $t('prod.Add images and videos of your product to engage customers') }}. <br>
        {{ $t('prod.Images should be square with minimum allowed dimensions to be 500x500 pixels') }}. <br>
        {{ $t('prod.Allowed file extensions are') }} (png, bmp, jpeg, and jpg)<br>
        {{ $t('prod.and allowed video extensions are') }} (mp4, mpeg and webp)
      </label>
    </div>
    <table class="table mb-0">
      <tbody>
      <tr v-if="isThumb">
        <td style="width:20px">
          <div class="custom-control custom-checkbox">
            <input type="radio" checked class="custom-control-input" id="customCheck2">
            <label class="custom-control-label" for="customCheck2"></label>
          </div>
        </td>
        <td style="width:60%">
          <div class="media">
            <lazy-image
              class="mr-20"
              :data-src="getThumb(isThumb)"
              :alt="isThumb"
            />
            <div class="media-body">
              <h6 class="mt-0 mb-0  text-xs">{{ $t('prod.Thumbnail') }}</h6>
              <span class="text-muted  text-xs">Image</span>
            </div>
          </div>
        </td>
        <td class="text-xs">
          <button disabled type="button" class="btn bg-primary text-white">{{ $t('prod.Thumbnail') }}</button>
        </td>
        <td><span class="text-xs"></span></td>
        <td>
          <svg style="height: 20px;" viewBox="0 0 20 21" focusable="false" class="cursor-pointer"
               data-testid="price-tier-remove-cta-0">
            <path
              d="M17 8L16.2414 18.4074C16.2099 18.8399 16.0124 19.2447 15.6885 19.5402C15.3646 19.8357 14.9384 20 14.4958 20H5.50425C5.06162 20 4.63543 19.8357 4.31152 19.5402C3.98762 19.2447 3.79005 18.8399 3.75863 18.4074L3 8"
              stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round"></path>
            <path d="M1 5H19" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                  stroke-linejoin="round"></path>
            <path
              d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2V5"
              stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </td>
      </tr>
      <tr v-for="(image, index) in images" :key="index">
        <td style="width:20px">
          <div class="custom-control custom-checkbox">
            <label class="custom-control-label" for="customCheck2"></label>
          </div>
        </td>
        <td style="width:60%">
          <div class="media">
            <lazy-image
              class="mr-20"
              :data-src="image.image"
              :alt="image.file_name"
            />
            <div class="media-body">
              <h6 class="mt-0 mb-0  text-xs">{{ image.file_name }}</h6>
              <span class="text-muted  text-xs">Image</span>
            </div>
          </div>
        </td>
        <td class="text-xs">
          <input type="radio" class="custom-control-input" id="customCheck2"
                 @click.prevent="setThumb(image.url)">
          <!--                <button type="button" class="btn bg-primary text-white" @click.prevent="setThumb(image.url)">Set Thumbnail</button>-->
        </td>
        <td><span class="text-xs">{{ image.upload_time }}</span></td>
        <td>
          <svg style="height: 20px;" @click.prevent="deleteImage(image.url)" viewBox="0 0 20 21"
               focusable="false"
               class="cursor-pointer" data-testid="price-tier-remove-cta-0">
            <path
              d="M17 8L16.2414 18.4074C16.2099 18.8399 16.0124 19.2447 15.6885 19.5402C15.3646 19.8357 14.9384 20 14.4958 20H5.50425C5.06162 20 4.63543 19.8357 4.31152 19.5402C3.98762 19.2447 3.79005 18.8399 3.75863 18.4074L3 8"
              stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round"></path>
            <path d="M1 5H19" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                  stroke-linejoin="round"></path>
            <path
              d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2V5"
              stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </td>
      </tr>
      </tbody>
    </table>
    <!--          <img :src="result.images" alt="">-->
    <upload-files @updateInput="saveAttachment"></upload-files>
  </div>
</template>

<style scoped>

</style>
