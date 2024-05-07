<template>

  <div v-if="$can('manage_products')">

    <!-- ---------------- -->
    <div v-if="!is_next" class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4 v-if="is_clone">{{ $t('prod.clone_product') }}</h4>
        <h4 v-if="!id & !is_clone">{{ $t('prod.add_new_product') }}</h4>
        <h4 v-if="id">{{ $t('prod.edit_product') }}</h4>
        <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>
      </div>
      <!-- ---------------- -->
      <div v-if="!is_next" class="tab-sidebar">
        <!--      <div class="col-md-12 p-4 title">-->
        <!--        <h4 v-if="is_clone">{{ $t('prod.clone_product') }}</h4>-->
        <!--        <h4 v-if="!id & !is_clone">{{ $t('prod.add_new_product') }}</h4>-->
        <!--        <h4 v-if="id">{{ $t('prod.edit_product') }}</h4>-->
        <!--        <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>-->
        <!--      </div>-->

        <div class="input-wrapper p-3" v-if="!id">
          <input type="checkbox" class="custom-control-input" id="clonecheck_true" v-if="is_clone" v-show="is_clone"
                 v-model="is_clone" @click.prevent="isClone"/>
          <input type="checkbox" class="custom-control-input" id="clonecheck_false" v-else v-model="is_clone"/>
          <label class="custom-control-label fw-bold" for="clonecheck"><strong
            style="line-height: 26px;">{{ $t('prod.Clone from existing product') }}</strong></label>
        </div>

        <product-clone-section
          v-if="is_clone"
          :cloneProduct="cloneProduct"
          @ProductCloneSection="ProductCloneSection"
        />
      </div>

      <div v-if="!is_next && !is_clone">
        <ValidationObserver class="w-full" v-slot="{ handleSubmit }">
          <form>
            <!-- --------------------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <div id="product_form" class="tab-sidebar p-3">

              <div class="d-flex justify-content-between  align-items-center">
                <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic information') }}</h4>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <!-- Main Category Dropdown -->
                <ValidationProvider name="parentCategory" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('rfq.Search by Category')}) }">
                  <div class="form-group input-wrapper for-lang ar-lang">
                    <label class="w-full" for="mainCategory">{{ $t("rfq.Search by Category") }} <strong
                      class="text-error">*</strong></label>
                    <!--              :class="{invalid: !is_draft && !result.selectedMainCategory && hasError}"-->
                    <v-select
                      :dir="$t('app.dir')"
                      v-model="result.parentCategory"
                      :options="allCategoriesTree"
                      label="title"
                      :reduce="cat => cat.id"
                      :placeholder="$t('rfq.Search by Category')"
                      @input="updateLevel2"
                      class="custom-select"
                    ></v-select>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <!-- Sub Category Dropdown -->
                <ValidationProvider name="subCategory" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('rfq.Select Sub Category')}) }">
                  <div class="form-group input-wrapper for-lang ar-lang">
                    <label class="w-full" for="subCategory">{{ $t("rfq.Select Sub Category") }} <strong
                      class="text-error">*</strong></label>
                    <v-select
                      :dir="$t('app.dir')"
                      v-model="result.subCategory"
                      :options="selectedLevel1?.child"
                      label="title"
                      :reduce="cat => cat.id"
                      class="custom-select"
                      :placeholder="$t('rfq.Select Sub Category')"
                      @input="updateLevel3"
                      :class="{invalid:  result.subCategory === '' && hasError}"
                    ></v-select>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <!-- Child Category Dropdown -->
                <ValidationProvider name="childCategory" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('rfq.Select Child Category')}) }">
                  <div class="form-group input-wrapper for-lang ar-lang">
                    <label class="w-full" for="childCategory">{{ $t("rfq.Select Child Category") }} <strong
                      class="text-error">*</strong></label>
                    <v-select
                      :dir="$t('app.dir')"
                      v-model="result.childCategory"
                      :options="selectedLevel2?.child"
                      :reduce="cat => cat.id"
                      :class="{invalid: result.childCategory === '' && hasError}"
                      label="title"
                      class="custom-select"
                      :placeholder="$t('rfq.Select Child Category')"
                    ></v-select>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>

              <div class="input-wrapper mb-10" v-if="is_variant">
                <label for="">{{ $t('prod.parent_sku') }}</label>
                <input class="form-control" name="e.g. Macbook Pro 2019" :placeholder="$t('prod.parent_sku')"
                       type="text"
                       v-model="result.parent_sku" :class="{invalid: result.parent_sku==='' && hasError}">
              </div>

              <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
                          @updateInput="updateInput"></lang-input>

              <lang-input v-if="!is_variant" :hasError="hasError" type="textarea" :title="$t('prod.desc')"
                          :valuesOfLang="result.description"
                          @updateInput="updateInput"></lang-input>
              <ValidationProvider name="brand" :rules="{ required_if: !is_draft }" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('prod.Select Brand')}) }">

                <div class="input-wrapper mt-3 mt-sm-0">
                  <label class="w-full">{{ $t('prod.Select Brand') }} <strong class="text-error">*</strong></label>
                  <select class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                          :class="{ 'has-error': errors[0] }"
                          v-model="result.brand_id">
                    <option value="">{{ $t('prod.Select Brand') }}</option>
                    <option :value="index" v-for="(item, index) in allBrands" :key="index">{{ item.title }}</option>
                  </select>
                </div>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- --------------------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <div class="tab-sidebar p-3" v-if="is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Unit of measure') }}</h4>
              <div class="form-group input-wrapper for-lang ar-lang">
                <label class="w-full" for="name">{{ $t('prod.Unit of measure') }}</label>
                <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="result.unit_id">
                  <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{
                      item.name
                    }}
                  </option>
                </select>
              </div>
            </div>
            <!-- --------------------------- -->
            <div class="my-10"></div>
            <div class="col-md-4"></div>
            <div class="tab-sidebar p-3" v-if="result.product_variant.length!==0">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Variant information') }} </h4>
              <hr>
              <table>
                <tr>
                  <td>{{ $t('prod.Color') }}</td>
                  <td>{{ $t('prod.Size') }}</td>
                </tr>
                <tr>
                  <td>
                    <div class="col-md-4">
                      <div class="form-group">
                        <select class="w-full rounded border mb-10 border-smooth p-3"
                                v-model="result.product_variant.name"
                                v-if="select_attr1 === 'color'">
                          <option v-for="(item, index) in allColors" :key="index" :value="item.id">{{
                              item.name
                            }}
                          </option>
                        </select>
                        <input class="form-control w-100" type="text" placeholder="Enter Value"
                               v-model="result.product_variant.value"
                               v-if="select_attr1 === 'size'"/>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="col-md-4">
                      <div class="form-group">
                        <input class="form-control w-100" type="text" placeholder="Enter Value"
                               v-model="result.product_variant.value"
                               v-if="select_attr2 === 'size'"/>
                        <select class="w-full rounded border mb-10 border-smooth p-3"
                                v-model="result.product_variant.name"
                                v-if="select_attr2 === 'color'">
                          <option v-for="(item, index) in allColors" :key="index" :value="item.id">{{
                              item.name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <!-- ------------------------------------- -->
            <div class="tab-sidebar p-3" v-else>
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Variant information') }}</h4>
              <div class="form-check">
                <input type="checkbox" class="custom-control-input" id="clonecheck_true" v-if="is_variant"
                       v-model="is_variant" :disabled="is_variant_save"
                       :style="is_variant_save?'cursor: not-allowed':''"/>
                <input type="checkbox" class="custom-control-input" id="clonecheck_false" v-else v-model="is_variant"
                       @click.prevent="isVariant" :class="is_variant_save?'cursor-not-allowed':''"/>
                <label class="form-check-label" for="flexCheckDefault">
                  {{ $t('prod.This product has options, like size or color') }}
                </label>
              </div>
              <div class="card-body mt-10" v-if="is_variant">

                <div class="grid grid-cols-3 gap-4 pt-4" v-if="!is_variant_save">
                  <div class="col-md-4">
                    <div class="form-group">
                      <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="select_attr1"
                              @change="isAttr($event, 'color')">
                        <option value="">{{ $t('prod.Select attribute 1') }}</option>
                        <option v-for="(item, index) in product_variant_type" :key="index"
                                :disabled="item === select_attr2">{{ item }}
                        </option>
                      </select>

                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="select_attr2"
                              @change="isAttr($event, 'size')">
                        <option value="">{{ $t('prod.Select attribute 2') }}</option>
                        <option v-for="(item, index) in product_variant_type" :key="index"
                                :disabled="item === select_attr1">{{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-md-4"></div>
                <div class="tab-sidebar p-3" v-if="is_variant_save">
                  <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Variant information') }}</h4>
                  <hr>
                  <table>
                    <tr>
                      <td>{{ $t('prod.Color') }}</td>
                      <td>{{ $t('prod.Size') }}</td>
                      <td>{{ $t('prod.Name') }}</td>
                    </tr>
                    <tr v-for="(variant, index) in result.product_variants" :key="index">
                      <td>{{ variant.color_name }}</td>
                      <td>{{ variant.value || 'NULL' }}</td>
                      <td>{{ variant.color_name }} {{ (variant.color_name && variant.value ? ',' : '') }} {{
                          variant.value
                        }}
                      </td>
                    </tr>
                  </table>
                </div>
                <div v-if="!is_variant_save" class="grid grid-cols-3 gap-4"
                     v-for="(variant, index) in result.product_variants" :key="index">
                  <div class="col-md-4">
                    <div class="form-group">
                      <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="variant.name"
                              @change="setColorName(index, $event)"
                              v-if="select_attr1 === 'color'">
                        <option v-for="(item, index) in allColors" :key="index" :value="item.id">{{
                            item.name
                          }}
                        </option>
                      </select>
                      <input class="form-control w-100" type="text" placeholder="Enter Value" v-model="variant.value"
                             v-if="select_attr1 === 'size'"/>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" :class="{ invalid: variant.value }">
                      <input class="form-control w-100" type="text" placeholder="Enter Value" v-model="variant.value"
                             v-if="select_attr2 === 'size'"/>
                      <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="variant.name"
                              v-if="select_attr2 === 'color'">
                        <option v-for="(item, index) in allColors" :key="index" :value="item.id">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                  </div>


                  <div class="col-md-4" @click.prevent="removeVariantRows(index)">
    <span class="p-3 border border-smooth rounded cursor-pointer">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </span>
                  </div>
                </div>

                <div v-if="!is_variant_save">
                  <div class="col-md-4 pt-4">
                    <button :disabled="select_attr1==='' || select_attr2===''" type="button"
                            @click.prevent="addVariantValueRows()"
                            class="btn mb-10 w-25 btn-outline-secondary">
                      {{ $t('prod.Add Row') }}
                    </button>
                  </div>
                </div>

                <hr class="border-smooth">
                <div class="flex justify-items-start gap-4 pt-3">
                  <!--              <button type="button" class="btn text-white bg-primary" @click.prevent="doSubmitVariant">-->
                  <!--                Send for review-->
                  <!--              </button>-->
                  <button v-if="!is_variant_save && !is_variant_edit" type="button" class="btn text-white bg-primary hover:text-primary" @click.prevent="doVariantSave">
                    {{ $t('prod.Save') }}
                  </button>

                  <button v-if="is_variant_edit && !is_variant_save_after_edit" type="button" class="btn text-white bg-primary hover:text-primary" @click.prevent="doVariantEdit">
                    {{ $t('prod.Edit') }}
                  </button>

                  <button v-if="is_variant_save_after_edit" type="button" class="btn text-white bg-primary hover:text-primary" @click.prevent="doVariantSave">
                    {{ $t('prod.Save') }}
                  </button>
                  <button v-if="is_variant_save_after_edit" type="button" class="btn border-secondary" @click.prevent="doVariantReset">
                    <span>{{ $t('prod.Reset') }}</span>
                  </button>

                  <button v-if="is_variant_save_after_edit" type="button" class="btn border-secondary" @click.prevent="doVariantCancel">
                    <span>{{ $t('prod.Cancel') }}</span>
                  </button>

                </div>
                <div class="my-10"></div>
                <div class="tab-sidebar p-3" v-if="is_variant">
                  <div class="flex justify-end gap-4 pt-3">
                    <button
                      type="button"
                      class="btn text-white bg-primary w-1/4 hover:text-primary"
                      :disabled="!result.product_variants[0]?.color_name || !result.product_variants[0]?.value || !result.childCategory || !result.title.ar || !result.title.en || !result.brand_id || !result.parent_sku"
                      @click.prevent="doNext">
                      {{ $t('prod.Next') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- ------------------------------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          BasicInformationChild-->
            <!--          <basic-information-child-->
            <!--            v-if="!is_variant "-->
            <!--            :result="result"-->
            <!--            @basicInfoChild="basicInfoChild"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic Information') }} </h4>
              <div class="card-body">
                <div class="input-wrapper mb-10">
                  <label for="">{{ $t('prod.Key features - English') }} ?</label>

                <lang-input-multi :hasError="hasError" type="text" :title="$t('prod.Key features - English')"
                                  :valuesOfLang="result.features"
                                  @updateInput="updateInput"></lang-input-multi>
              </div>

              <div class="input-wrapper mb-10">
                <label for="">{{ $t('prod.Keywords - English') }} ?</label>
                <v-select
                  :dir="$t('app.dir')"
                  v-model="result.basic_keyword_en"
                  :options="allKeywords"
                  taggable
                  multiple
                  :placeholder="$t('title.select_type')"
                  class="custom-select"
                ></v-select>
              </div>
              <div class="input-wrapper mb-10">
                <label for="">{{ $t('prod.Keywords - Arabic') }} ?</label>
                <v-select
                  :dir="$t('app.dir')"
                  v-model="result.basic_keyword_ar"
                  :options="allKeywords"
                  taggable
                  multiple
                  :placeholder="$t('title.select_type')"
                  class="custom-select"
                ></v-select>
              </div>
            </div>
          </div>
          <!--          BasicInformationChild-->
          <!-- ------------------------------------- -->
<!--          <div class="my-10"></div>-->
          <!-- ------------------------------------- -->
          <!--          ProductImages-->
          <!--          <product-images-section-->
          <!--            v-if="!is_variant"-->
          <!--            :id="id"-->
          <!--            @productImagesSection="productImagesSection"-->
          <!--            :setById="setById"-->
          <!--            :images="result.images"-->
          <!--            :isThumb="isThumb"-->
          <!--          />-->
<!--          <div class="tab-sidebar p-3" v-if="!is_variant">-->

<!--            <div class="input-wrapper">-->
<!--              <label class="pl-4 pt-0 fw-bold">-->
<!--                {{ $t('prod.Add images and videos of your product to engage customers') }}. <br>-->
<!--                {{ $t('prod.Images should be square with minimum allowed dimensions to be 500x500 pixels') }}. <br>-->
<!--                {{ $t('prod.Allowed file extensions are') }} (png, bmp, jpeg, and jpg)<br>-->
<!--                {{ $t('prod.and allowed video extensions are') }} (mp4, mpeg and webp)-->
<!--              </label>-->
<!--            </div>-->
<!--            <table class="table mb-0">-->
<!--              <tbody>-->
<!--              <tr v-if="isThumb">-->
<!--                <td style="width:20px">-->
<!--                  <div class="custom-control custom-checkbox">-->
<!--                    <input type="radio" checked class="custom-control-input" id="customCheck2">-->
<!--                    <label class="custom-control-label" for="customCheck2"></label>-->
<!--                  </div>-->
<!--                </td>-->
<!--                <td style="width:60%">-->
<!--                  <div class="media" style="width: 100px;">-->
<!--                    <lazy-image-->
<!--                      class="mr-20"-->
<!--                      :data-src="getThumb(isThumb)"-->
<!--                      :alt="isThumb"-->
<!--                    />-->
<!--                    <div class="media-body">-->
<!--                      <h6 class="mt-0 mb-0  text-xs">{{ $t('prod.Thumbnail') }}</h6>-->
<!--                      <span class="text-muted  text-xs">Image</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </td>-->
<!--                <td class="text-xs">-->
<!--                  <button disabled type="button" class="btn bg-primary text-white">{{ $t('prod.Thumbnail') }}</button>-->
<!--                </td>-->
<!--                <td><span class="text-xs"></span></td>-->
<!--                <td>-->
<!--                  <svg style="height: 20px;" viewBox="0 0 20 21" focusable="false" class="cursor-pointer"-->
<!--                       data-testid="price-tier-remove-cta-0">-->
<!--                    <path-->
<!--                      d="M17 8L16.2414 18.4074C16.2099 18.8399 16.0124 19.2447 15.6885 19.5402C15.3646 19.8357 14.9384 20 14.4958 20H5.50425C5.06162 20 4.63543 19.8357 4.31152 19.5402C3.98762 19.2447 3.79005 18.8399 3.75863 18.4074L3 8"-->
<!--                      stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"-->
<!--                      stroke-linejoin="round"></path>-->
<!--                    <path d="M1 5H19" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"-->
<!--                          stroke-linejoin="round"></path>-->
<!--                    <path-->
<!--                      d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2V5"-->
<!--                      stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"-->
<!--                      stroke-linejoin="round"></path>-->
<!--                  </svg>-->
<!--                </td>-->
<!--              </tr>-->
<!--              <tr v-for="(image, index) in result.images" :key="index">-->
<!--                <td style="width:20px">-->
<!--                  <div class="custom-control custom-checkbox">-->
<!--                    <label class="custom-control-label" for="customCheck2"></label>-->
<!--                  </div>-->
<!--                </td>-->
<!--                <td>-->
<!--                  <div class="media" style="width: 100px">-->
<!--                    <lazy-image-->
<!--                      class="mr-20"-->
<!--                      :data-src="image.image"-->
<!--                      :alt="image.file_name"-->
<!--                    />-->
<!--                    <div class="media-body">-->
<!--                      &lt;!&ndash;              <h6 class="mt-0 mb-0  text-xs">{{ image.file_name }}</h6>&ndash;&gt;-->
<!--                      &lt;!&ndash;              <span class="text-muted  text-xs">Image</span>&ndash;&gt;-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </td>-->
<!--                <td class="text-xs">-->
<!--                  <input type="radio" class="custom-control-input" id="customCheck2"-->
<!--                         @click.prevent="setThumb(image.url)">-->
<!--                  &lt;!&ndash;                <button type="button" class="btn bg-primary text-white" @click.prevent="setThumb(image.url)">Set Thumbnail</button>&ndash;&gt;-->
<!--                </td>-->
<!--                <td><span class="text-xs">{{ image.upload_time }}</span></td>-->
<!--                <td>-->
<!--                  <svg style="height: 20px;" @click.prevent="deleteImage(image.url)" viewBox="0 0 20 21"-->
<!--                       focusable="false"-->
<!--                       class="cursor-pointer" data-testid="price-tier-remove-cta-0">-->
<!--                    <path-->
<!--                      d="M17 8L16.2414 18.4074C16.2099 18.8399 16.0124 19.2447 15.6885 19.5402C15.3646 19.8357 14.9384 20 14.4958 20H5.50425C5.06162 20 4.63543 19.8357 4.31152 19.5402C3.98762 19.2447 3.79005 18.8399 3.75863 18.4074L3 8"-->
<!--                      stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"-->
<!--                      stroke-linejoin="round"></path>-->
<!--                    <path d="M1 5H19" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"-->
<!--                          stroke-linejoin="round"></path>-->
<!--                    <path-->
<!--                      d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2V5"-->
<!--                      stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"-->
<!--                      stroke-linejoin="round"></path>-->
<!--                  </svg>-->
<!--                </td>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--            </table>-->
<!--            &lt;!&ndash;          <img :src="result.images" alt="">&ndash;&gt;-->
<!--            <upload-files  @updateInput="saveAttachment"></upload-files>-->


<!--          </div>-->
          <!--          ProductImages-->
          <!-- ------------------------------------- -->

          <!-- ------------------------------------- -->
          <div class="my-10"></div>
            <!--          BasicInformationChild-->
            <!-- ------------------------------------- -->
            <!-- ------------------------------------- -->
            <!--          ProductImages-->
            <ValidationProvider name="Image" :rules="ProductImageValidationRules" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Image')}) }" class="w-full">
            <div class="tab-sidebar p-3" v-if="!is_variant" :class="{ 'has-error': errors[0] }">

              <vue-upload-images v-if="(isAdding || (!isAdding && result.images))" :old_images="result.images" :max-files="5" @updateInput="saveAttachment">></vue-upload-images>

            </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <!--          ProductImages-->
            <!-- ------------------------------------- -->

            <!-- ------------------------------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          ProductIdentifierSection-->
            <!--          <product-identifier-section-->
            <!--            v-if="!is_variant"-->
            <!--            :is_draft="is_draft"-->
            <!--            :allBarcodes="allBarcodes"-->
            <!--            @ProductIdentifierSection="ProductIdentifierSection"-->
            <!--            :result="result"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Product Identifiers') }}</h4>
              <p class="text-sm">
                {{ $t('prod.Enter barcode type and number for improved search/visibility of your product') }}.</p>
              <div class="grid grid-cols-2 gap-4">
                <ValidationProvider name="Barcode type" :rules="NotDraftValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode type')}) }">
                  <div class="input-wrapper mt-3 mt-sm-0">
                    <label class="w-full">{{ $t('prod.Barcode type') }}</label>
                    <select
                      class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                      :class="{ 'has-error': errors[0] }"
                      v-model="result.barcode_type">
                      <option value="">{{ $t('prod.Select Barcode') }}</option>
                      <option :value="index" v-for="(item, index) in allBarcodes" :key="index">{{ item.name }}</option>
                    </select>
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="barcode" :rules="BarcodeValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode')}) }">
                  <div class="form-group input-wrapper mt-3 mt-sm-0 ">
                    <label>{{ $t('prod.Barcode') }}</label>
                    <input
                      type="text" class="form-control"
                      v-model="result.barcode"
                      :placeholder="$t('prod.Barcode')"
                      @keypress="onlyNumber"
                      :disabled="result.barcode_type==4"
                      :class="{ 'has-error': errors[0], 'cursor-not-allowed': result.barcode_type == 4 }"
                    >
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="sku" :rules="skuRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.SKU')}) }">
                  <div class="form-group input-wrapper  mt-3 mt-sm-0">
                    <label>{{ $t('prod.SKU') }} <strong class="text-error">*</strong></label>
                    <input
                      type="text" class="form-control"
                      :class="{ 'has-error': errors[0] }"
                      v-model="result.sku"
                      :placeholder="$t('prod.SKU')"
                    >
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <!--          ProductIdentifierSection-->

            <!-- ------------------------------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          ProductInventorySection-->
            <!--          <product-inventory-section-->
            <!--            v-if="!is_variant"-->
            <!--            :result="result"-->
            <!--            :is_draft="is_draft"-->
            <!--            @ProductInventorySection="ProductInventorySection"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <div class="border-b border-smooth">
                <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Fulfillment') }}</h4>
                <p>{{ $t('prod.Setup shipping and inventory details for this product') }}</p>
              </div>
              <div class="mt-10">
                <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product Inventory') }}</h4>
                <p>{{ $t('prod.Enter the available quantity of your product') }}</p>
              </div>
              <ValidationProvider name="Available quantity" :rules="availableQuantityValidationRules"
                                  v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('prod.Available quantity')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Available quantity') }} ? <strong class="text-error">*</strong></label>
                  <input type="text" class="form-control" :class="{ 'has-error': errors[0] }"
                         v-model="result.available_quantity" @input="availableQuantity" @keypress="onlyNumber">
                  <label>{{ $t('prod.Minimum order quantity') }}: {{ result.product_prices[0].quantity }}</label>
                </div>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!--          ProductInventorySection-->

            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          <packaging-section-->
            <!--            v-if="!is_variant"-->
            <!--            :result="result"-->
            <!--            :is_draft="is_draft"-->
            <!--            :allPackagingUnits="allPackagingUnits"-->
            <!--            :allTransportationModes="allTransportationModes"-->
            <!--            @PackagingSection="PackagingSection"-->
            <!--          />-->

            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
              <div class="grid grid-cols-2 gap-4">
                <ValidationProvider name="Packaging Size" :rules="PackagingValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Size')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Size') }} ? <strong class="text-error">*</strong></label>
                    <div class="relative flex input-group gap-4 mb-3 w-full">

                      <input
                        type="text"
                        class="form-control pr-12"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Size')"
                        @keypress="onlyNumber"
                        v-model="result.pk_size"
                      >
                      <div class="absolute ltr:right-0 rtl:left-0 top-0">
                        <select class="p-[6px] m-1 float-right ltr:border-l rtl:border-r border-smooth uppercase"
                                v-model="result.pk_size_unit"
                                :placeholder="$t('prod.Size Unit')"
                        >
                          <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{
                              item.name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="Number of units per carton" :rules="PackagingValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Number of units per carton')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Number of units per carton') }} <strong
                      class="text-error">*</strong></label>
                    <div class=" mb-3">
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Number of units per carton')"
                        @keypress="onlyNumber" v-model="result.pk_number_of_carton">
                    </div>
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="average lead time" :rules="AverageLeadValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Average lead time(Days)')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label> <strong
                    class="text-error">*</strong>
                    <div class=" mb-3">
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Average lead time(Days)')"
                        @keypress="onlyNumber"
                        v-model="result.pk_average_lead_time">
                    </div>
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Transportation Mode') }}</label>
                  <div class=" mb-3">
                    <select
                      class="border p-3 w-full border-smooth rounded-lg uppercase"
                      v-model="result.pk_transportation_mode"
                    >
                      <option :value="index" v-for="(item, index) in allTransportationModes" :key="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- ----------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          <carton-dimension-section-->
            <!--            v-if="!is_variant"-->
            <!--            :result="result"-->
            <!--            :is_draft="is_draft"-->
            <!--            @CartonDimensionSection="CartonDimensionSection"-->
            <!--            :allWeightUnits="allWeightUnits"-->
            <!--            :allDimensionUnits="allDimensionUnits"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Carton Dimensions & Weight') }}</h4>
              <p>
                {{
                  $t("prod.Enter the dimensions and weight of the carton to help calculate shipping rate These measurements are for the products shipping container")
                }}.</p>
              <div class="grid grid-cols-2 gap-4">
                <ValidationProvider name="carton weight" :rules="CartonDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Weight')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Weight') }} ? <strong class="text-error">*</strong></label>
                    <div class="relative flex input-group gap-4 mb-3">
                      <input
                        type="text"
                        class="form-control pr-12"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Weight')"
                        @keypress="onlyNumber"
                        v-model="result.pc_weight">

                      <div class="absolute ltr:right-0 rtl:left-0 top-0">
                        <select class="p-[6px] m-1 float-right ltr:border-l rtl:border-r border-smooth uppercase"
                                v-model="result.pc_weight_unit_id">
                          <!--                  <option value="0">Select</option>-->
                          <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                              item.name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider name="carton length" :rules="CartonDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Length')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Length') }} ? <strong class="text-error">*</strong></label>
                    <div class="relative flex input-group gap-4 mb-3">
                      <input
                        type="text"
                        class="form-control pr-12"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Length')"
                        @keypress="onlyNumber"
                        v-model="result.pc_length">

                      <div class="absolute ltr:right-0 rtl:left-0 top-0">
                        <select class="p-[6px] m-1 float-right ltr:border-l rtl:border-r border-smooth uppercase"
                                v-model="result.pc_length_unit_id">
                          <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                              item.name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider name="carton height" :rules="CartonDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Height') }} ? <strong class="text-error">*</strong></label>
                    <div class="relative flex input-group gap-4 mb-3">
                      <input
                        type="text" class="form-control pr-12"
                        :class="{ 'has-error': errors[0] }"
                        placeholder="Carton Height"
                        @keypress="onlyNumber"
                        v-model="result.pc_height">
                      <div class="absolute ltr:right-0 rtl:left-0 top-0">
                        <select class="p-[6px] m-1 float-right ltr:border-l rtl:border-r border-smooth uppercase"
                                v-model="result.pc_height_unit_id">
                          <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                              item.name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider name="carton width" :rules="CartonDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Width') }} ? <strong class="text-error">*</strong></label>
                    <div class="relative flex input-group gap-4 mb-3">
                      <input
                        type="text"
                        class="form-control pr-12"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Width')"
                        @keypress="onlyNumber"
                        v-model="result.pc_width">

                      <div class="absolute ltr:right-0 rtl:left-0 top-0">
                        <select class="p-[6px] m-1 float-right ltr:border-l rtl:border-r border-smooth uppercase"
                                v-model="result.pc_width_unit_id">
                          <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                              item.name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

              </div>
            </div>

            <!-- ----------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          <product-dimensions-and-weight-section-->
            <!--            v-if="!is_variant"-->
            <!--            :result="result"-->
            <!--            :is_draft="is_draft"-->
            <!--            @ProductDimensionsAndWeightSection="ProductDimensionsAndWeightSection"-->
            <!--            :allWeightUnits="allWeightUnits"-->
            <!--            :allDimensionUnits="allDimensionUnits"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product dimensions & weight') }}</h4>
              <p>{{ $t("prod.These attributes provide information about the products dimensions and weight") }}.</p>
              <ValidationProvider name="product dimention weight" :rules="ProductDimensionValidationRules" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('prod.Weight')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Weight') }} ? <strong class="text-error">*</strong></label>
                  <div class="relative flex input-group gap-4 mb-3">
                    <input
                      type="text"
                      class="form-control pr-12"
                      :class="{ 'has-error': errors[0] }"
                      :placeholder="$t('prod.Weight')"
                      @keypress="onlyNumber"
                      v-model="result.pdime_weight"
                    >

                    <div class="absolute ltr:right-0 rtl:left-0 top-0">
                      <select
                        class="p-[6px] m-1 float-right ltr:border-l rtl:border-r border-smooth uppercase"
                        v-model="result.pdime_weight_unit_id"
                      >
                        <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div class="grid grid-cols-4 gap-4">
                <ValidationProvider name="product dimention length" :rules="ProductDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Length')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Length') }} ? <strong class="text-error">*</strong></label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Length')"
                        @keypress="onlyNumber"
                        v-model="result.pdime_length">
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider name="product dimention height" :rules="ProductDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Height') }} ? <strong class="text-error">*</strong></label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'has-error': errors[0] }"
                        :placeholder="$t('prod.Height')"
                        @keypress="onlyNumber"
                        v-model="result.pdime_height">
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider name="product dimention width" :rules="ProductDimensionValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Width') }} ? <strong class="text-error">*</strong></label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('prod.Width')"
                        :class="{ 'has-error': errors[0] }"
                        @keypress="onlyNumber"
                        v-model="result.pdime_width"
                      >
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Dimension Unit') }}</label>
                  <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                          v-model="result.pdime_dimention_unit">
                    <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                        item.name
                      }}
                    </option>
                  </select>
                </div>

              </div>

            </div>
            <!-- ----------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          <product-priceing-section-->
            <!--            v-if="!is_variant"-->
            <!--            :result="result"-->
            <!--            :is_draft="is_draft"-->
            <!--            :allPackagingUnits="allPackagingUnits"-->
            <!--            :product_price="product_price"-->
            <!--            @ProductPriceingSection="ProductPriceingSection"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Pricing') }}</h4>
              <ValidationProvider name="unit_id" :rules="NotDraftValidationRules" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('prod.Unit of measure')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Unit of measure') }} ? <strong class="text-error">*</strong></label>
                  <div class="input-group mb-3">
                    <select class="border p-3 border-smooth rounded-lg uppercase"
                            v-model="result.unit_id">
                      <option value="">{{ $t('prod.Unit') }}</option>
                      <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <p><span class="fw-bold">{{ $t('prod.Price list') }}</span> {{ $t('prod.KSA Market(GULF) - SAR') }}</p>
              <p>
                {{
                  $t('prod.Add pricing to your product You can also create bulk pricing rules to offer price discounts based on quantity breaks')
                }}</p>
              <div class="table-responsive">
                <table class="table table-bordered mb-0">
                  <thead>
                  <tr>
                    <th scope="col">{{ $t('prod.Minimum order quantity') }}</th>
                    <th scope="col">{{ $t('prod.Unit price') }}</th>
                    <th scope="col">{{ $t('prod.Sale price') }} ? ({{ $t('prod.optional') }})</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr v-for="(product_price, index) in result.product_prices" :key="index">
                    <td class="p-2">
                      <ValidationProvider name="quantity" :rules="QuantityValidationRules" v-slot="{ errors }"
                                          :custom-messages="{ required: $t('global.req', { type: $t('prod.Minimum order quantity') }) }">
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('prod.Minimum order quantity')"
                        @keypress="onlyNumber"
                        v-model="product_price.quantity"
                        @input="availableQuantity"
                      >
                                          <span class="error">{{ errors[0] }}</span>
                                          </ValidationProvider>
                    </td>
                    <td class="p-2">
                                          <ValidationProvider name="unit price" :rules="UnitPriceValidationRules" v-slot="{ errors }"
                                                              :custom-messages="{required: $t('global.req', { type: $t('prod.Unit price')}) }">
                      <div class="relative flex">
                        <label class="pricename absolute left-0 top-0 p-3" for="">SAR</label>
                        <input type="text" style="padding: 1px 56px;" class="form-control px-20"
                               :placeholder="$t('prod.Unit price')"
                               @keypress="onlyNumber"
                               v-model="product_price.unit_price">
                      </div>
                                            <span class="error">{{ errors[0] }}</span>
                                          </ValidationProvider>
                    </td>
                    <td class="p-2">
                      <ValidationProvider :name="`Sale price`" :rules="PriceValidationRules" v-slot="{ errors }"
                                          :custom-messages="{required: $t('global.req', { type: $t('prod.Sale price')}) }">
                        <div class="relative flex">
                          <label class="pricename absolute left-0 top-0 p-3" for="">{{ $t('prod.SAR') }}</label>
                          <input type="text" style="padding: 1px 56px;" class="form-control px-20"
                                 :class="{ 'has-error': errors[0] }"
                                 :placeholder="$t('prod.Sale price')"
                                 @keypress="onlyNumber"
                                 v-model="product_price.selling_price">
                        </div>
                        <span class="error" >{{ errors[0] }}</span>
                      </ValidationProvider>

                    </td>
                    <td class="p-2">
                      <button type="button" class="btn  btn-outline-secondary"
                              @click.prevent="removePriceingRows(index)">
                               <span><svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                          fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
  </svg></span>
                      </button>
                    </td>
                  </tr>

                  </tbody>
                </table>

                <button v-if="result.product_prices.length <= 2" class="btn btn-link fw-bold"
                        @click.prevent="addPriceingRows()">+ {{ $t('prod.ADD TIER') }}
                </button>
              </div>
            </div>

            <!-- ----------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <!--          <shipping-details-section-->
            <!--            v-if="!is_variant"-->
            <!--            :result="result"-->
            <!--            @ShippingDetailsSection="ShippingDetailsSection"-->
            <!--            :allWarehouses="allWarehouses"-->
            <!--            :allStorageTemperatures="allStorageTemperatures"-->
            <!--            :allCountries="allCountries"-->
            <!--          />-->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Shipping details') }}</h4>
              <div class="grid grid-cols-2 gap-4">
                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Is Ready To Ship') }} ?</label>
                    <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                            v-model="result.is_ready_to_ship"
                    >
                      <option value="1">{{ $t('prod.Yes') }}</option>
                      <option value="0">{{ $t('prod.No') }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Is Buy Now') }} ?</label>
                    <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                            v-model="result.is_buy_now">
                      <option value="1">{{ $t('prod.Yes') }}</option>
                      <option value="0">{{ $t('prod.No') }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Availability') }}</label>
                    <select class="border p-3 w-full border-smooth rounded-lg uppercase" disabled
                            v-model="result.is_availability">
                      <option value="1">{{ $t('prod.In Stock') }}</option>
                      <option value="0">{{ $t('prod.Out of Stock') }}</option>
                    </select>
                  </div>
                </div>
                <ValidationProvider name="storage temperature" :rules="NotDraftValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Storage temperature')}) }">
                  <div class="col-md-6">
                    <div class="input-wrapper">
                      <label for="">{{ $t('prod.Storage temperature') }} <strong class="text-error">*</strong></label>
                      <select
                        class="border p-3 w-full border-smooth rounded-lg"
                        :class="{ 'has-error': errors[0] }"
                        v-model="result.storage_temperature">
                        <option value="" disabled>{{ $t('prod.Select Option') }}</option>
                        <option v-for="(item, index) in allStorageTemperatures" :key="index" :value="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Ware House') }} <strong class="text-error">*</strong></label>
                    <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.stock_location">
                      <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Country of origin') }} <strong class="text-error">*</strong></label>
                    <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.country_of_origin">
                      <option v-for="(item, index) in allCountries" :key="index" :value="index" disabled>{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Dangerous Goods') }}</label>
                    <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                            v-model="result.is_dangerous">
                      <option value="1">{{ $t('prod.Yes') }}</option>
                      <option value="0">{{ $t('prod.No') }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- ----------------- -->
            <div class="my-10"></div>
            <!-- ------------------------------------- -->
            <div class="tab-sidebar p-3" v-if="!is_variant">
              <div class="border-b border-smooth mb-10">
                <h4>{{ $t('prod.Additional details') }}</h4>
                <p>{{ $t('prod.Enter the details listed below for better discoverability of the product') }}</p>
              </div>
              <div class="form-group input-wrapper mb-10 for-lang ar-lang">
                <label for="name">{{ $t("prod.hts_code") }}</label>
                <input class="form-control" :placeholder="$t('prod.hts_code')" type="text" v-model="result.hts_code">
              </div>
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Additional attributes') }} <span
                class="text-xs">({{ $t('prod.optional') }})</span>
              </h4>
              <div class="input-wrapper">

                <div class="flex append-input pt-1" v-for="(item, index) in result.additional_details_row" :key="index">
                  <input style="width:200px" class="form-control mr-2 ml-2" placeholder="Label for Field" type="text"
                         v-model="item.name">
                  <input class="form-control" placeholder="Text to display" type="text" v-model="item.value">
                  <button type="button" @click.prevent="removeAdditionalDetailsRows(index)"
                          v-if="index!=0"
                          class="btn ml-2 mr-2 btn-danger">
                    <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h16"/>
                    </svg>
                  </button>
                  <button type="button" class="btn ml-2 mr-2 btn-primary"
                          v-if="index+1==result.additional_details_row.length"
                          @click.prevent="addAdditionalDetailsRows(index)">
                    <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 1v16M1 9h16"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="button-group border-t border-smooth mt-20">
                <div class="flex justify-end gap-4 pt-3">
                  <button type="button" class="btn text-primary" @click.prevent="handleSubmit(doDraft)">
                    {{ $t('prod.Save Draft') }}
                  </button>
                  <button type="button" class="btn bg-primary text-white border-secondary"
                          @click.prevent="handleSubmit(doSubmit)">
                    {{ $t('prod.Send for review') }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div v-if="is_next">
      <Variant
        :result="result"
        :selectedLevel1="selectedLevel1"
        :selectedLevel2="selectedLevel2"
        :selectedLevel3="selectedLevel3"
        :select_attr1="select_attr1"
        :select_attr2="select_attr2"
        :variant_uu_id="variant_uu_id"
      ></Variant>
    </div>
  </div>
</template>
<style scoped>
select option {
  padding: 0.5rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.has-error {
  border: 1px solid red !important;
}
</style>
<script>
import {mapGetters, mapActions} from 'vuex'
import ErrorFormatter from '~/components/ErrorFormatter'
import WYSIWYGEditor from '~/components/WYSIWYGEditor'
import ProductImages from '~/components/partials/ProductImages'
import FileUpload from '~/components/FileUpload'
import VideoUpload from '~/components/VideoUpload'
import TagSearch from '~/components/TagSearch'
import AjaxButton from '~/components/AjaxButton'
import ProductInventory from '~/components/partials/ProductInventory'
import DataPage from '~/components/partials/DataPage'
import Dropdown from '~/components/Dropdown'
import Spinner from '~/components/Spinner'
import util from '~/mixin/util'
import ImageInput from "~/components/ImageInput";
import VideoInput from "~/components/VideoInput";
import outsideClick from '~/directives/outside-click.js';
import LangInput from "../../components/langInput.vue";
import Service from "~/services/service";
import ProductSearch2 from "~/components/partials/ProductSearch2.vue";
import ProductSearch from "~/components/partials/ProductSearch.vue";
import Variant from "@/components/variant/Variant.vue";
import {validate, ValidationObserver, ValidationProvider} from 'vee-validate';
import {extend} from 'vee-validate';
import BasicInformationChild from "@/components/product/BasicInformationChild.vue";
import PackagingSection from "@/components/product/PackagingSection.vue";
import CartonDimensionSection from "@/components/product/CartonDimensionSection.vue";
import ShippingDetailsSection from "@/components/product/ShippingDetailsSection.vue";
import VueUploadImages from "../../components/product/uploadImages.vue";
import error from "@/layouts/error.vue";
import tr from "vue2-datepicker/locale/es/tr";
import th from "vue2-datepicker/locale/es/th";


extend('min', {
  validate(value, {length}) {
    return value.length >= length;
  },
  params: ['length'],
  message: 'The {_field_} field must have at least {length} characters'
});

extend('uniqueSku', {
  validate: (value, {allSKus}) => {
    // Check if the provided SKU value already exists in allSKus
    return !Object.values(allSKus).find(item => item.sku === value);
  },
  params: ['allSKus'], // Define the parameter name as allSKus
  message: 'SKU must be unique'
});
extend('validatePrice', {
  validate: (value, {allPrices}) => {
    for (let i = 0; i < allPrices.length; i++) {
      const up = allPrices[i]?.unit_price;
      const usp = allPrices[i]?.selling_price;

      if (!(up && usp && usp <= up)) {
        return false; // If any item doesn't meet the condition, return false
      }
    }

    return true; // If all items meet the condition, return true
  },
  params: ['allPrices'],
  message: 'Selling price must be smaller than or equal to the unit price'
});


// Custom rule for quantity comparison
extend('quantityComparison', {
  validate(value, { first, second, third }) {
    if (!first || !second) {
      return true; // If any quantity is missing, let required rule handle it
    }

    if (first > second) {
      return 'Second quantity must be greater than the first';
    }

    if (third && second > third) {
      return 'Third quantity must be greater than the second';
    }

    return true;
  },
  params: ['first', 'second', 'third'],
  message: 'Invalid quantities comparison'
});
// Custom rule for quantity comparison
extend('priceComparison', {
  validate(value, { unit_prices, selling_prices }) {
    for (let i = 0; i < unit_prices.length; i++) {
      if (selling_prices[i] > unit_prices[i]) {
        return 'The selling price must be smaller than the unit price!';
      }
    }
    return true;
  },
  params: ['unit_prices', 'selling_prices'],
  message: 'Invalid price comparison'
});




export default {
  name: "pink-tabs",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_next: false,
      variant_uu_id: '',
      is_variant_save: false,
      is_variant_edit: false,
      is_variant_save_after_edit: false,
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      isThumb: null,
      allKeywords: [],
      isFirstThumb: null,
      openTab: 1,
      uploadModal: false,
      is_clone: false,
      is_variant: false,
      is_draft: true,
      pv_type: false,
      isColor: false,
      isSize: false,
      licence: null,
      selectedAttribute1: null,
      selectedAttribute2: null,
      disableAttribute2: false,
      disableAttribute1: false,
      is_barcode: false,
      search_sku: '',
      tableShow: false,
      clone_product: null,
      uploadNewText: false,
      select_attr1: '',
      select_attr2: '',

      productFormOpen: true,
      showCategories: false,
      validLicence: false,
      routeName: 'products',
      getApi: 'getProduct',
      getColorApi: 'getColors',
      setApi: 'setProduct',
      setImageApi: 'setProductImage',
      setVideoApi: 'setProductVideo',
      fileKeys: ['id', 'tax_rule_id', 'shipping_rule_id'],
      validationKeys: ['title.en'],
      validationKeysIfIsDraft: ['parentCategory', 'subCategory', 'childCategory'],
      validationKeysIfNotVariant: ['parentCategory', 'subCategory', 'childCategory', 'brand_id', 'basicInfoEng', 'basic_keyword_en', 'barcode_type', 'sku', 'pk_size', 'pk_size_unit', 'pk_number_of_carton', 'pk_average_lead_time', 'pk_transportation_mode', 'pc_weight', 'pc_weight_unit_id', 'pc_length', 'pc_length_unit_id', 'pc_height', 'pc_height_unit_id', 'pc_width', 'pc_width_unit_id', 'pdime_weight', 'pdime_weight_unit_id', 'pdime_length', 'pdime_height', 'pdime_width', 'pdime_dimention_unit', 'unit_id', 'storage_temperature'],
      validationKeysIfVariantNext: ['parentCategory', 'subCategory', 'childCategory', 'brand_id', 'parent_sku'],
      subCategories: [],
      childCategories: [],
      features: {"ar": "", "en": ""},
      errorMessage: '',
      product_price: {
        "quantity": "",
        "unit_price": "",
        "selling_price": "",
      },

      product_variant: {
        "name": "",
        "color_name": "",
        "value": "",
        "product_id": ""
      },
      product_variant_type: {
        "color": "color",
        "size": "size",
      },
      additional_details: {
        "name": "",
        "value": "",
      },
      min_qty: null,
      result: {
        hts_code: '',
        variant_uuid: '',
        parent_sku: '',
        clone_products: [],
        unit_id: 9,
        variants_type: [],
        product_variant: [],
        product_variants: [],
        features: [
          {"ar": "", "en": ""},
        ],
        product_prices: [
          {
            "quantity": "",
            "unit_price": "",
            "selling_price": "",
          }
        ],
        is_draft: false,
        is_variant: false,
        parentCategory: '',
        subCategory: '',
        childCategory: '',
        /*Product Inventory*/
        available_quantity: '',
        /*End Product Inventory*/
        mainCategorySlug: null,
        subCategorySlug: null,
        childCategorySlug: null,
        selectedMainCategory: 0,
        selectedSubCategory: 0,
        selectedChildCategory: 0,

        /*Additional details*/
        additional_details_row: [
          {
            "name": "",
            "value": ""
          }
        ],
        additional_attributes: [],
        additional_attributes_value: [],
        /*Additional details*/
        /*Shipping details*/
        is_ready_to_ship: 1,
        is_buy_now: 1,
        is_availability: 0,
        is_dangerous: 0,
        is_offer_private_label_option: 1,
        storage_temperature: '',
        stock_location: 1,
        country_of_origin: 193,
        /*Shipping details*/
        /*Product Identifiers*/
        barcode_type: '',
        barcode: null,
        sku: null,
        /*Product Identifiers*/
        minimum_order_quantity: 0,
        /*product price start*/
        pp_unit_of_measure_id: 0,

        pp_quantity: [],
        pp_unit_price: [],
        pp_selling_price: [],
        /*product price end*/

        /*product variant start*/
        variantTypes: ['color', 'size'],
        variant_unit_of_measure: 1,
        variantRows: [
          {size: 0, color: ""},
        ],
        productVariants: {
          variantTypes: ['color', 'size'],
          pv_name: [],
          variantValues: [
            [], []
          ],
        },
        /*product variant end*/
        /*additional attribute start*/
        add_attribute_name: [],
        add_attribute_value: [],
        /*additional attribute end*/
        /*packaging start*/
        pk_size: '',
        pk_size_unit: 1,
        pk_number_of_carton: '',
        pk_average_lead_time: '', //days
        pk_transportation_mode: 1,
        /*packaging end*/
        /*product dimensions start*/
        pdime_weight: '',
        pdime_weight_unit_id: 17,
        pdime_height: '',
        pdime_length: '',
        pdime_width: '',
        pdime_unit: '',
        pdime_dimention_unit: 19,
        /*product dimensions end*/
        /*product cartons start*/
        pc_weight: '',
        pc_weight_unit_id: 17,
        pc_height: '',
        pc_height_unit_id: 19,
        pc_length: '',
        pc_length_unit_id: 19,
        pc_width: '',
        pc_width_unit_id: 19,
        /*end product cartons*/
        id: '',
        title: {ar: '', en: ''},
        tags: ',',
        basic_keyword_en: '',
        basic_keyword_ar: '',
        overview: '',
        description: {ar: '', en: ''},
        status: '',
        is_quote: '',
        brand_id: '',
        primary_category_id: '',
        category_id: '',
        bundle_deal_id: '',
        unit: 10,
        badge: '',
        subcategory_id: '',
        tax_rule_id: '',
        shipping_rule_id: '',
        purchased: '',
        selling: '',
        offered: '',
        refundable: 1,
        warranty: 1,
        meta_description: '',
        flash_sale_product: '',
        meta_title: '',
        images: '',
        slug: '',
        video: '',
        product_images: [],
        product_collections: [],
        product_categories: [],
        PriceingRows: [
          {pp_quantity: 5, pp_unit_price: 0, pp_selling_price: 0},
        ],
        basicInfoen: [[]],
        basicInfoEng: [{}],
        basicInfoAr: [{}],
        basicInfoar: [[]],
        variantkey: '',
        variantColorsType: 'color',
        variantColors: [],
        variantSizeType: 'size',
        variantSize: [],
      },
      hasError: false,
      hasErrorQty: false,
      loading: false,
      formSubmitting: false,
      redirect: false,
      fileUploading: false,
      videoUploading: false,
    }
  },
  directives: {
    outsideClick
  },
  mixins: [util],
  components: {
    VueUploadImages,
    ShippingDetailsSection,
    CartonDimensionSection,
    PackagingSection,
    BasicInformationChild,
    ProductSearch2,
    ProductSearch,
    VideoInput,
    ImageInput,
    DataPage,
    Dropdown,
    WYSIWYGEditor,
    ProductImages,
    FileUpload,
    VideoUpload,
    TagSearch,
    AjaxButton,
    ProductInventory,
    ErrorFormatter,
    Spinner,
    LangInput,
    Variant,
    ValidationProvider,
    ValidationObserver
  },
  provide: {
    // fetchingData: () => {
    //   this.fetchingData()
    // },
  },

  computed: {
    error() {
      return error
    },

    skuRules() {
      const allSKus = this.allSKus;

      if (!this.id) {
        return {
          required: !this.is_draft,
          uniqueSku: {allSKus}, // Pass allSKus as a parameter to uniqueSku
          min: 2,
          max: 32
        };
      }

    },
    checkPricing() {
      const allPrices = this.result.product_prices;

      if (allPrices[0]?.unit_price && allPrices[0]?.selling_price){
        for (let i = 0; i < allPrices.length; i++) {
          const unitPrice = parseFloat(allPrices[i]?.unit_price);
          const sellingPrice = parseFloat(allPrices[i]?.selling_price);

          if (unitPrice > sellingPrice) {
            continue; // If any unit price is greater than selling price, return false immediately
          } else {
            return i
          }
        }
      }
      return false;
      // If all unit prices are less than or equal to selling prices, return true
    },
    UnitPriceValidationRules(){
      return{
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999,
        regex: /^(?:\d*\.\d{1,2}|\d+)$/
      }
    },
    PriceValidationRules() {
      const unit_prices = [];
      const selling_prices = [];

      this.result.product_prices.forEach(price => {
        // Check if selling price is not null before pushing into arrays
        if (price?.selling_price !== null) {
          unit_prices.push(parseFloat(price?.unit_price));
          selling_prices.push(parseFloat(price?.selling_price));
        }
      });

      return {
        min_value: 1,
        max_value: 99999999,
        regex: /^(?:\d*\.\d{1,2}|\d+)$/,
        priceComparison: { unit_prices, selling_prices }
      };
    },

    QuantityValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999,
        regex: /^\d+$/,
        quantityComparison: {
          first: parseInt(this.result.product_prices[0]?.quantity),
          second: parseInt(this.result.product_prices[1]?.quantity),
          third: parseInt(this.result.product_prices[2]?.quantity)
        }
      };
    },
    availableQuantityValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 0,
        max_value: 99999999,
      };
    },
    BarcodeValidationRules() {
      let validationRules = {
        required: !this.is_draft && this.result.barcode_type != 4
      };

      const barcodeLength = this.result.barcode?.length || 0;

      switch (this.result.barcode_type) {
        case '1':
          if (barcodeLength <= 8) {
            validationRules.min = 8;
          } else if (barcodeLength <= 13) {
            validationRules.min = 13;
            validationRules.max = 13;
          } else {
            validationRules.max = 13;
          }
          break;

        case '2':
          if (barcodeLength <= 8) {
            validationRules.min = 8;
          } else if (barcodeLength <= 12) {
            validationRules.min = 12;
            validationRules.max = 12;
          } else if (barcodeLength <= 13) {
            validationRules.min = 13;
            validationRules.max = 13;
          } else if (barcodeLength <= 14) {
            validationRules.min = 14;
            validationRules.max = 14;
          } else {
            validationRules.max = 14;
          }
          break;

        case '3':
          if (barcodeLength <= 12) {
            validationRules.min = 12;
          } else {
            validationRules.max = 12;
          }
          break;

        default:
          break;
      }

      return validationRules;
    },
    PackagingValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999
      };
    },
    NotDraftValidationRules() {
      return {
        required: !this.is_draft,
      };
    },
    ProductImageValidationRules() {
      return {
        required: this.result.product_images.length===0
      };
    },
    CartonDimensionValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999
      };
    },
    ProductDimensionValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999
      };
    },
    AverageLeadValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99
      };
    },
    requiredErrorMessage() {
      return this.$t('global.req', {type: this.$t('prod.Available quantity')});
    },

//     isInvalidQuantity() {
// //       if (parseInt(this.product_prices[0].quantity) < parseInt(this.product_prices[1].quantity)) {
// //         console.log("1st object's quantity is less than 2nd object");
// //       } else {
// //         console.log("1st object's quantity is NOT less than 2nd object");
// //       }
// //
// // // Check if the 3rd object's quantity is greater than the 2nd object
// //       if (parseInt(this.product_prices[2].quantity) > parseInt(this.product_prices[1].quantity)) {
// //         console.log("3rd object's quantity is greater than 2nd object");
// //       } else {
// //         console.log("3rd object's quantity is NOT greater than 2nd object");
// //       }
//
//       // return (index) => {
//       //   const currentQuantity = parseFloat(this.result.pp_quantity[index]);
//       //   const firstQuantity = parseFloat(this.result.pp_quantity[index - 1]);
//       //   console.log('currentQuantity', currentQuantity)
//       //   console.log('firstQuantity', firstQuantity)
//       //   return currentQuantity <= firstQuantity && this.hasError;
//       // };
//
//       // return (index) => {
//       //   const firstQty = parseInt(this.product_prices[0].quantity;
//       //   const secondQty = parseInt(this.product_prices[1].quantity;
//       //   const thirdQty = parseInt(this.product_prices[1].quantity;
//       // }
//     },
    productCategories() {
      return this.result.product_categories
    },
    selectedCategories() {
      let sc = null;
      if (this.allCategories && this.productCategories.length) {

        Object.keys(this.allCategories).forEach(i => {
          if (this.productCategories.includes(i)) {
            sc = {...sc, ...{[i]: this.allCategories[i]}}
          }
        });
      }
      return sc;
    },
    currencyPosition() {
      return this.setting?.currency_position
    },
    currentPrice() {
      return this.result.offered > 0 ? this.result.offered : this.result.selling > 0 ? this.result.selling : 0
    },
    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
    isAdding() {
      return isNaN(this.$route?.params?.id)
    },
    async isCloning() {
      // console.log(this.search_sku)
      if (this.$route?.params?.id === 'clone') {
        let sku = this.$route.query.sku
      }
    },
    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    ...mapGetters(['mediaStorage']),
    ...mapGetters('admin', ['publicKey']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['allCategories', 'allTaxRules', 'allAttributes',
      'allBrands', 'allSKus', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  watch: {
    // getThumb(isThumb)
    selectedColor(newIndex) {

    },
  },

  methods: {
    basicInfoChild(result) {
      this.result.features = result.features
      this.result.basic_keyword_en = result.basic_keyword_en
      this.result.basic_keyword_ar = result.basic_keyword_ar
    },
    productImagesSection(result) {
      this.result.product_images = result.product_images
    },
    ProductIdentifierSection(result) {
      this.result.barcode_type = result.barcode_type
      this.result.barcode = result.barcode
      this.result.sku = result.sku
    },
    ProductInventorySection(result) {
      this.result.available_quantity = result.available_quantity
    },
    PackagingSection(result) {
      this.result.pk_size = result.pk_size
      this.result.pk_size_unit = result.pk_size_unit
      this.result.pk_number_of_carton = result.pk_number_of_carton
      this.result.pk_average_lead_time = result.pk_average_lead_time
      this.result.pk_transportation_mode = result.pk_transportation_mode
    },
    CartonDimensionSection(result) {
      this.result.pc_weight = result.pc_weight
      this.result.pc_weight_unit_id = result.pc_weight_unit_id
      this.result.pc_length = result.pc_length
      this.result.pc_length_unit_id = result.pc_length_unit_id
      this.result.pc_height = result.pc_height
      this.result.pc_height_unit_id = result.pc_height_unit_id
      this.result.pc_width = result.pc_width
      this.result.pc_width_unit_id = result.pc_width_unit_id
    },
    ProductDimensionsAndWeightSection(result) {
      this.result.pdime_weight = result.pdime_weight
      this.result.pdime_weight_unit_id = result.pdime_weight_unit_id
      this.result.pdime_length = result.pdime_length
      this.result.pdime_height = result.pdime_height
      this.result.pdime_width = result.pdime_width
      this.result.pdime_dimention_unit = result.pdime_dimention_unit

    },
    ShippingDetailsSection(result) {
      this.result.is_ready_to_ship = result.is_ready_to_ship
      this.result.is_buy_now = result.is_buy_now
      this.result.is_availability = result.is_availability
      this.result.storage_temperature = result.storage_temperature
      this.result.stock_location = result.stock_location
      this.result.country_of_origin = result.country_of_origin
      this.result.is_dangerous = result.is_dangerous

    },
    ProductPriceingSection() {
      const unit_price1 = this.result.product_prices[0].unit_price;
      const selling_price1 = this.result.product_prices[0].selling_price;
      const unit_price2 = this.result.product_prices[1].selling_price;
      const selling_price2 = this.result.product_prices[1].selling_price;
      const unit_price3 = this.result.product_prices[2].selling_price;
      const selling_price3 = this.result.product_prices[2].selling_price;

      if (unit_price1 < selling_price1) {
        return 'Sale Price must be lower than price';
      }
      if (unit_price2 < selling_price2) {
        return 'Sale Price must be lower than price';
      }
      if (unit_price3 < selling_price3) {
        return 'Sale Price must be lower than price';
      }
    },
    compareMethods() {
      let ava_qty = parseInt(this.result.available_quantity);
      let product_prices_min_qty = parseInt(this.result.product_prices[0]?.quantity);

      if (!isNaN(ava_qty) && !isNaN(product_prices_min_qty)) {
        this.result.is_availability = ava_qty >= product_prices_min_qty ? 1 : 0;
      }
    },

    stockCheck(index = null) {
      this.min_qty = Math.min(...this.result.product_prices.map(item => item.quantity));
      this.compareMethods();

      const firstQty = parseInt(this.result.product_prices[0]?.quantity);
      const secondQty = parseInt(this.result.product_prices[1]?.quantity);
      const thirdQty = parseInt(this.result.product_prices[2]?.quantity);

      if (firstQty && secondQty) {
        if (firstQty > secondQty) {
          this.hasErrorQty = index
        }
      }

      if (secondQty && thirdQty) {
        if (secondQty > firstQty && thirdQty > secondQty) {
          this.hasError = true
        }
      }

    },
    availableQuantity() {
      this.compareMethods()
    },
    tableNotShow() {
      this.tableShow = false;
      this.uploadNewText = true;
    },
    productTableShow() {
      this.tableShow = true;
      this.uploadNewText = false;
    },

    ProductCloneSection(result) {

    },

    cloneProduct(product) {

      // this.id=product.id
      this.fetchingData(product.id).then(() => {
        this.is_clone = false
        this.result.id = ""
      })
    },
    doNext() {
      // if (this.validationKeysIfVariantNext.findIndex((i) => {
      //   return (!this.result[i])
      // }) > -1) {
      //   this.hasError = true
      //   return false
      // }
      this.is_next = true;
      this.variant_uu_id = this.generateUUID();
    },
    generateUUID() {
      // Get current timestamp
      var timestamp = new Date().getTime();

      // Generate a random number
      var randomNumber = Math.ceil(Math.random() * 1000000);

      // Combine timestamp and random number
      var uuid = timestamp.toString() + randomNumber.toString();

      return uuid;
    },
    async doVariantReset() {
      const confirmation = await this.$swal({
        title: "Are you sure?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Yes",
        cancelButtonText: "Noا",
        showCancelButton: true,
        showCloseButton: true,
      });
      if (confirmation.value) {
        this.result.product_variants = []
      }
    },

    pvTypeToggle() {
      this.pv_type = !this.pv_type;
    },

    doVariantCancel() {
      this.is_variant_save = true; // Assuming canceling resets to Save mode
      this.is_variant_edit = true;
      this.is_variant_save_after_edit = false;
    },
    doVariantEdit() {
      this.is_variant_save = false;
      this.is_variant_edit = true;
      this.is_variant_save_after_edit = true;
    },

    doVariantSave() {
      // Check if product_variants is not empty
      if (this.result.product_variants.length !== 0) {
        // Iterate through each variant
        for (let i = 0; i < this.result.product_variants.length; i++) {
          // Check if any variant has missing name or value
          if (!this.result.product_variants[i].name || !this.result.product_variants[i].value) {
            // Show error message and exit loop early
            this.setToastError(this.$t('prod.Color or value cant empty value'));
            return;
          }
        }
        // If all variants have name and value, toggle save and edit flags
        this.is_variant_save = true;
        this.is_variant_edit = true;
        this.is_variant_save_after_edit = false;
      } else {
        // If there are no variants, show error message
        this.setToastError(this.$t('prod.Color or value cant empty value'));
      }
    },

    doSubmitVariant() {
      this.result.is_variant = true;

      if (this.validationKeysIfIsDraft.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      if (this.result.storage_temperature === 0) {
        this.result.storage_temperature = null
      }
      if (this.result.brand_id === 0) {
        this.result.brand_id = null
      }
      if (this.result.barcode_type === 0) {
        this.result.barcode_type = null
      }
      if (this.result.unit_id === 0) {
        this.result.unit_id = null
      }
      this.checkForm()

    },
    doDraft() {
      this.is_draft = true;
      this.result.is_draft = true;
      this.result.status = 'draft'
      if (this.result.storage_temperature === 0) {
        this.result.storage_temperature = null
      }
      if (this.result.brand_id === 0) {
        this.result.brand_id = null
      }
      if (this.result.barcode_type === 0) {
        this.result.barcode_type = null
      }
      if (this.result.unit_id === 0) {
        this.result.unit_id = null
      }
      if (this.validationKeysIfIsDraft.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      this.checkForm()

    },
    // handleSubmit(){
    //   console.log('ddddddddddddddd')
    //   // alert('Form has been submitted!');
    // },


    doSubmit() {
      this.is_draft = false;
      this.result.is_draft = false;


      if (this.validationKeysIfNotVariant.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      if (this.result.storage_temperature === 0) {
        this.result.storage_temperature = null
      }
      if (this.result.brand_id === 0) {
        this.result.brand_id = null
      }
      if (this.result.barcode_type === 0) {
        this.result.barcode_type = null
      }
      if (this.result.unit_id === 0) {
        this.result.unit_id = null
      }
      this.result.status = 'pending'
      this.result.is_quote = false
      this.result.is_variant = false

      this.checkForm()
    },

    updateLevel2() {
      this.result.subCategory = "";  // Reset Level 2 selection
      this.result.category_id = "";  // Reset Level 2 selection
      this.selectedLevel1 = this.allCategoriesTree.find(c => c.id == (this.result.parentCategory));
      this.selectedLevel2 = null;  // Reset Level 2 selection
      // this.result.mainCategorySlug = this.selectedLevel1.slug
    },
    updateLevel3() {
      this.result.category_id = "";
      this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCategory));
      // this.result.subCategorySlug = this.selectedLevel2.slug
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },

    updateBrand(event) {
      this.result.brand_id = event.target.value;
    },
    updateSizeUnit(event) {
      console.log(event.target.value)
      this.result.pk_size_unit = event.target.value;
    },
    addVariantValueRows() {
      this.result.product_variants.push(Object.assign({}, this.product_variant))
    },

    setColorName(index, event) {
      this.result.product_variants[index].color_name = this.allColors[event.target.value].name
    },

    addAdditionalDetailsRows(index) {
      this.result.additional_details_row.push(Object.assign({}, this.additional_details))
    },

    addPriceingRows() {
      try {
        this.result.product_prices.push(Object.assign({}, this.product_price))
      } catch (e) {
        console.log(e);
      }
    },

    removeAdditionalDetailsRows(index) {
      // console.log(index)
      if (index != 0) {
        this.result.additional_details_row.splice(index, 1);
      }
    },
    saveAttachment(images) {
      console.log(images)
      // this.result.rfq_attachments = rfq_attachments
      this.result.product_images = images
    },
    removePriceingRows(index) {
      console.log(index)
      if (index != 0) {
        // this.result.product_prices.push(Object.assign({}, this.product_price))
        this.result.product_prices.splice(index, 1);
      }
    },

    isAttr(event, attributeType) {
      const value = String(event.target.value);
      //backend need check
      this.result.variants_type = [
        (this.select_attr1 === 'color' || this.select_attr1 === 'size') ? this.select_attr1 : null,
        (this.select_attr2 === 'color' || this.select_attr2 === 'size') ? this.select_attr2 : null
      ].filter(value => value !== null);


      if (attributeType === 'color') {
        this.disableAttribute2 = value === 'color';
      } else if (attributeType === 'size') {
        this.disableAttribute1 = value === 'size';
      } else {
        this.result.variants_type = []
      }
    },


    updateVariantColor(attribute, event, index) {
      console.log(attribute);

      // Convert event.target.value to a string to ensure consistency
      const value = String(event.target.value);

      if (attribute === 'color') {
        this.result.productVariants.variantValues[0][index] = value;
      } else {
        this.result.productVariants.variantValues[1][index] = value;
      }
    },


    removeVariantRows(index) {
      console.log(index)
      if (index != 0) {
        this.result.product_variants.splice(index, 1);

      }
    },

    updateBasicInfo(attribute, event, index) {
      // console.log(attribute, index);

      // Convert event.target.value to a string to ensure consistency
      const value = String(event.target.value);

      if (attribute === 'en') {
        this.result.basicInfoEng[index] = value;
      } else {
        this.result.basicInfoAr[index] = value;
      }
    },


    variantColor(index) {
      this.result.variantSize.push(1)
    },
    variantSize(index) {
      this.result.variantSize.push(1)
    },

    // variantValueType(ev) {
    //   if (ev.target.value.toLowerCase() == 'color') {
    //     this.isColor = true
    //   } else {
    //     this.isSize = true
    //   }
    // },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        this.emptyAllList('allProducts')
      }
      this.result = evt
    },


    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    uploadModalToggle() {
      this.uploadModal = !this.uploadModal
    },

    isClone() {
      this.is_clone = !this.is_clone;
      this.tableShow = !this.tableShow;
    },
    isVariant() {
      this.is_variant = !this.is_variant;
      this.result.status = 'draft';
      this.result.is_variant = !this.result.is_variant;
      if (!this.is_variant) {
        this.result.variantRows = [];
        this.result.variantRows = [{size: 0, color: ""}];
        this.result.productVariants.variantValues = [[], []];
      }
    },

    closeDrop() {
      this.showCategories = false
    },
    productImages(evt) {
      this.result.product_images = []

      this.$nextTick(() => {
        this.result.product_images = evt
      })
    },
    imageInputChanged(evt) {
      this.uploadFile(null, evt)
    },
    addTag(tag) {
      console.log(tag)
      if (!this.result.basic_keyword_en) {
        this.result.basic_keyword_en = ','
      }
      this.result.basic_keyword_en = `${this.result.basic_keyword_en}${tag},`
    },
    deleteTag(tag) {
      if (tag = 'en') {
        this.result.basic_keyword_en = this.result.basic_keyword_en.replace(`${tag},`, '')
      } else {
        this.result.basic_keyword_ar = this.result.basic_keyword_ar.replace(`${tag},`, '')
      }

    },
    dropdownSelected(data) {
      this.result.status = data.key
    },
    primaryCategorySelected(data) {
      this.result.primary_category_id = data.key
    },
    categorySelected(data) {
      this.result.category_id = data.key

      if (this.selectedSubCategories) {
        this.result.subcategory_id = Object.keys(this.selectedSubCategories)[0]
      } else {
        this.result.subcategory_id = ''
      }
    },
    subCategorySelected(data) {
      this.result.subcategory_id = data.key
    },
    taxRuleSelected(data) {
      this.result.tax_rule_id = data.key
    },
    shippingRuleSelected(data) {
      this.result.shipping_rule_id = data.key
    },
    brandSelected(data) {
      this.result.brand_id = data.key
    },
    bundleDealSelected(data) {
      this.result.bundle_deal_id = data.key
    },
    redirectingEnable(buttonType) {
      this.redirect = buttonType === 'save'
    },

    async deleteImage(url) {
      this.loading = true
      try {
        // await this.deleteData({params: this.id, url: url, api: 'deleteProductImage'})
        const data = await this.setById({id: this.id, params: {url: url}, api: 'deleteProductMediaImage'})
        if (data) {
          await this.fetchingData(this.id)
        }

      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.loading = false
      console.log(url)
    },
    getThumb(url) {
      return url
    },
    async setThumb(url) {
      this.loading = true
      try {
        const data = await this.setById({id: this.id, params: {url: url}, api: 'setProductThumbImage'})
        if (data) {
          await this.fetchingData(this.id)
          console.log(this.result)
          // this.isThumb = result.thumb_image
        }
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.loading = false
      console.log(url)
    },
    async checkForm() {

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        delete this.result.created_at
        delete this.result.updated_at


        const data = await this.setById({
          id: this.id,
          params: {
            result: {
              ...this.result,
              rfq_id: this.$route.query?.quote,
              rfq_product_id: this.$route.query?.rfq_product_id
            },
          },
          api: this.setApi
        })
        // if (data) {
        //
        //   this.result = Object.assign({}, data)
        //   // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/' + this.result.id}`})
        //   this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/'}`})
        // }
        if (this.$route.query?.quote > 0) {
          this.$router.push({path: `/rfq/${this.$route.query.quote}`});
        } else {
          const path = this.is_draft ? '/products/draft' : `/${this.routeName}${this.redirect ? '' : '/pending-approval'}`;
          this.$router.push({path});
        }

      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.formSubmitting = false
    },
    scrollToTop(ref = "productForm") {
      this.$refs[ref].scrollIntoView({behavior: "smooth"})
    },
    async fetchingData(id) {
      try {
        this.loading = true
        var res = Object.assign({}, await this.getById({id: id, params: {}, api: this.getApi}))
        // console.log('res', res)
        this.result = {
          title: res.title,
          description: res.description,
          parentCategory: res.category?.id,
          subCategory: res.sub_category?.id,
          childCategory: res.child_category?.id,
          product_prices: res.product_prices,
          unit_id: res.unit_id,
          features: res.product_features?.map(item => (item.name)),
          unit: res.unit,
          brand_id: res.brand_id,
          meta_title: res.meta_title,
          meta_description: res.meta_description,
          selling: res.selling,
          purchased: res.selling,
          offered: res.offered,
          images: res.images,
          product_images: res.product_images,
          video: res.video,
          status: res.status,
          parent_sku: res.parent_sku,
          /*Basic Information*/
          basic_keyword_en: res.basic_keyword_en,
          basic_keyword_ar: res.basic_keyword_ar,
          basicInfoAr: res.title,
          basicInfoEng: res.title,
          /*end Basic Information*/
          /* Product Identifiers*/
          barcode_type: res.barcode_id,
          barcode: res.barcode_number,
          sku: res.sku,
          /* end Product Identifiers*/



          /*Product Inventory*/
          available_quantity: res.available_quantity,
          /*ende Product Inventory*/
          /*Packaging*/

          pk_size: res.packaging?.size,
          pk_size_unit: res.packaging?.size_unit,
          pk_number_of_carton: res.packaging?.number_of_carton,
          pk_average_lead_time: res.packaging?.average_lead_time,
          pk_transportation_mode: res.packaging?.transportation_mode,
          /*emd Packaging*/

          /*Carton Dimensions & Weight*/
          pc_weight: res.product_carton?.weight,
          pc_weight_unit_id: res.product_carton?.weight_unit_id,
          pc_height: res.product_carton?.height,
          pc_height_unit_id: res.product_carton?.height_unit_id,
          pc_length: res.product_carton?.length,
          pc_length_unit_id: res.product_carton?.length_unit_id,
          pc_width: res.product_carton?.width,
          pc_width_unit_id: res.product_carton?.width_unit_id,
          /*end Carton Dimensions & Weight*/
          /*Product dimensions & weight*/
          pdime_weight: res.product_dimension?.weight,
          pdime_weight_unit_id: res.product_dimension?.weight_unit_id,
          pdime_height: res.product_dimension?.height,
          pdime_length: res.product_dimension?.length,
          pdime_width: res.product_dimension?.width,
          pdime_dimention_unit: res.product_dimension?.dimention_unit,
          /*end Product dimensions & weight*/
          /*Pricing*/
          // pp_unit_of_measure_id: res.product_prices.length != 0?res.product_prices?.[0].unit_of_measure_id:0,
          pp_quantity: res.product_prices?.map(price => price.quantity),
          pp_unit_price: res.product_prices?.map(price => price.unit_price),
          pp_selling_price: res.product_prices?.map(price => price.selling_price),
          /*Shipping details*/
          is_ready_to_ship: res.is_ready_to_ship,
          is_buy_now: res.is_buyable,
          is_availability: res.is_available,
          storage_temperature: res.storage_temperature_id,
          stock_location: res.warehouse_id,
          country_of_origin: res.product_origin_id,
          is_dangerous: res.is_dangerous,

          product_variants: res.product_variant,
          product_variant: res.product_single_variant ?? [],
          PriceingRows: res.product_prices,
          is_variant: res.product_variant ? true : false,
          additional_details_row: res.additional_attribute?.map(item => ({name: item.name, value: item.value})),
          hts_code: res.hts_code,
          variant_uuid: res.variant_uuid,


        }
        this.isThumb = res.thumb_image;
        this.isFirstThumb = res.first_thumb_image;
        this.result.images = res.images
        this.min_qty = Math.min(...this.result.product_prices.map(item => item.quantity));
        this.select_attr1 = 'color';
        this.select_attr2 = 'size';
        this.is_variant = false;
        // this.result.PriceingRows = res.product_prices
        this.result.product_variants = res.product_variant ?? [];

        if (res.product_variant?.length != 0) {
          // this.is_variant = true
          this.result.is_variant = true
        }


        this.updateLevel2()
        this.result.subCategory = res.sub_category?.id
        this.updateLevel3()
        this.result.category_id = res.child_category?.id
        this.result.childCategory = res.child_category?.id


        this.result.product_collections = [...new Set(this.result?.product_collections?.map((o) => {
          return o.product_collection_id
        }))]
        this.result.product_categories = [...new Set(this.result?.product_categories?.map((o) => {
          return o.category_id.toString()
        }))]
        console.log(this.result.product_categories)
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    async uploadVideo(file, video = null) {
      this.videoUploading = true
      try {

        let params = {}

        if (file) {

          const fd = new FormData()

          this.fileKeys.forEach(i => {
            fd.append(i, this.result[i])
          })
          fd.append('video_file', file.video)
          fd.append('thumb', file.thumb)

          params = fd

        } else {
          this.fileKeys.forEach(i => {
            params[i] = this.result[i]
          })

          params['video_file'] = video.video
          params['thumb'] = video.thumb
        }

        const data = await this.setImageById({id: this.id, params: params, api: this.setVideoApi})

        if (data) {
          this.result = Object.assign({}, data)
          this.result.product_collections = [...new Set(this.result?.product_collections?.map((o) => {
            return o.product_collection_id
          }))]
          this.result.product_categories = [...new Set(this.result?.product_categories?.map((o) => {
            return o.category_id.toString()
          }))]


          await this.$router.push({path: `/${this.routeName}/${this.result.id}`})
        }
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.videoUploading = false
    },
    async uploadFile(file, name = null) {
      this.fileUploading = true
      try {

        let params = {}
        if (file) {
          const fd = new FormData()
          this.fileKeys.forEach(i => {
            fd.append(i, this.result[i])
          })
          fd.append('photo', file)
          params = fd
        } else {
          this.fileKeys.forEach(i => {
            params[i] = this.result[i]
          })
          params['photo'] = name
        }

        const data = await this.setImageById({id: this.id, params: params, api: this.setImageApi})

        if (data) {
          this.result = Object.assign({}, data)
          this.result.product_collections = [...new Set(this.result?.product_collections?.map((o) => {
            return o.product_collection_id
          }))]
          this.result.product_categories = [...new Set(this.result?.product_categories?.map((o) => {
            return o.category_id.toString()
          }))]


          await this.$router.push({path: `/${this.routeName}/${this.result.id}`})
        }
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.fileUploading = false
    },
    editorDescriptionFile({deleted, file, Editor, cursorLocation, resetUploader}) {
      this.editorFile({deleted, file, Editor, cursorLocation, resetUploader}, this.wysiwygType.PRODUCT_DESCRIPTION)
    },
    editorOverviewFile({deleted, file, Editor, cursorLocation, resetUploader}) {
      this.editorFile({deleted, file, Editor, cursorLocation, resetUploader}, this.wysiwygType.PRODUCT_OVERVIEW)
    },
    async editorFile({deleted, file, Editor, cursorLocation, resetUploader}, type) {
      if (!deleted) {
        this.loading = true
        try {
          const fd = new FormData()
          if (!this.result.id) {
            fd.append('product', JSON.stringify(this.result))
          } else {
            fd.append('overview', this.result.overview)
            fd.append('description', this.result.description)
            fd.append('item_id', this.result.id)
          }
          fd.append('type', type)
          fd.append('photo', file)

          const data = await this.setWysiwygImage(fd)
          if (data) {
            if (!this.result.id) {
              await this.$router.push({path: `/${this.routeName}/${data.item_id}`})
            } else {
              Editor.insertEmbed(cursorLocation, "image", data.url);
              resetUploader();
            }
          }
        } catch (e) {
          return this.$nuxt.error(e)
        }
        this.loading = false
      } else {
        this.loading = true
        try {
          await this.deleteData({params: this.getImageName(file), api: 'deleteWysiwygImage'})
        } catch (e) {
          return this.$nuxt.error(e)
        }
        this.loading = false
      }
    },
    async findKeyword() {
      let res = await this.getById({ id: 1, params: { keyword: '' }, api: 'findRfqKeyword' });
      this.allKeywords = res;
    },

    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  },
  async mounted() {

    this.getThumb(this.isThumb)
    // if (this.min_qty === this.result.available_quantity) {
    //   this.result.is_availability = 1;
    // } else if (this.min_qty > this.result.available_quantity) {
    //   this.result.is_availability = 0;
    // } else {
    //   this.result.is_availability = 1;
    // }
    this.compareMethods();
    this.selectedAttribute1 = 'color';
    this.selectedAttribute2 = 'size';
    if (this.allCategoriesTree.length == 0) {
      try {
        await this.getCategoriesTree()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
    this.licence = this.phpDecryption(this.publicKey)
    const domain = window.location.hostname

    if (domain.includes('localhost') ||
      domain.includes("127.0.0.1") || this.licence.includes(domain)) {
      this.validLicence = true

    }

    if (!this.isAdding) {
      await this.fetchingData(this.id)
    }
    if (this.$route.query?.id) {
      this.fetchingData(this.$route.query?.id).then(() => {
        this.result.id = ""
      })
    }
    if (this.allKeywords.length===0){
      await this.findKeyword()
    }
    if (!this.allCategories || !this.allTaxRules || !this.allAttributes || !this.allWeightUnits || !this.allCountries || !this.allStorageTemperatures || !this.allTransportationModes || !this.allWarehouses || !this.allSKus) {

      this.loading = true
      try {
        await this.getDropdownList()
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.loading = false
    }
  },

}
</script>
