<template>


  <ValidationObserver class="w-full" v-slot="{ invalid, handleSubmit }">
    <form @submit.prevent="is_submit=true,handleSubmit(doSubmit)">
      <!-- --------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div v-if="fromSingle" id="product_form" class="tab-sidebar p-3">

        <div class="d-flex justify-content-between  align-items-center">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic information') }}</h4>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <!-- Main Category Dropdown -->
          <ValidationProvider name="parentCategory" :rules="{required: true}" v-slot="{ errors }"
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


        <!--              <ValidationProvider name="Title" :rules="{required: true}" v-slot="{ errors }"-->
        <!--                                  :custom-messages="{required: $t('global.req', { type: $t('prod.name')}) }" class="w-full">-->
        <lang-input
          @checkLangError="checkLangError"
          :min="5"
          type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
          @updateInput="updateInput"></lang-input>
        <!--                <span class="error">{{ errors[0] }}</span>-->
        <!--              </ValidationProvider>-->
        <lang-input v-if="!is_variant" :hasError="false" type="textarea" :title="$t('prod.desc')"
                    :valuesOfLang="result.description"
                    @updateInput="updateInput"></lang-input>
        <ValidationProvider name="Brand" :rules="{ required: !is_draft && !result.brand_id }" v-slot="{ errors }"
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
      <div class="tab-sidebar p-3" v-if="is_variant || !fromSingle">
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

          <div class="input-wrapper mb-10" v-if="is_variant">
            <label for="">{{ $t('prod.parent_sku') }}</label>
            <input class="form-control" name="e.g. Macbook Pro 2019" :placeholder="$t('prod.parent_sku')"
                   type="text"
                   v-model="result.parent_sku" :class="{invalid: result.parent_sku==='' && hasError}">
          </div>

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

          <div>
            <div class="col-md-4 pt-4">

              <button v-if="((result.product_variants.length==0 && id>0 ) || id=='add')"
                      :disabled="select_attr1==='' || select_attr2===''" type="button"
                      @click.prevent="addVariantValueRows()"
                      class="btn mb-10 w-25 btn-outline-secondary">
                {{ $t('prod.Add Row') }}
              </button>
            </div>
          </div>

          <hr class="border-smooth">
          <div class="flex justify-items-start gap-4 pt-3">

            <button v-if="!is_variant_save && !is_variant_edit" type="button"
                    class="btn text-white bg-primary hover:text-primary" @click.prevent="doVariantSave">
              {{ $t('prod.Save') }}
            </button>

            <button v-if="is_variant_edit && !is_variant_save_after_edit" type="button"
                    class="btn text-white bg-primary hover:text-primary" @click.prevent="doVariantEdit">
              {{ $t('prod.Edit') }}
            </button>

            <button v-if="is_variant_save_after_edit" type="button"
                    class="btn text-white bg-primary hover:text-primary" @click.prevent="doVariantSave">
              {{ $t('prod.Save') }}
            </button>
            <button v-if="is_variant_save_after_edit" type="button" class="btn border-secondary"
                    @click.prevent="doVariantReset">
              <span>{{ $t('prod.Reset') }}</span>
            </button>

            <button v-if="is_variant_save_after_edit" type="button" class="btn border-secondary"
                    @click.prevent="doVariantCancel">
              <span>{{ $t('prod.Cancel') }}</span>
            </button>

          </div>
          <div class="my-10"></div>
          <div class="tab-sidebar p-3" v-if="is_variant">
            <div class="flex justify-end gap-4 pt-3">
              <button
                type="button"
                class="btn text-white bg-primary w-1/4 hover:text-primary"
                :disabled="!result.product_variants[0]?.color_name && !result.product_variants[0]?.value || !result.childCategory || !result.title.ar || !result.title.en || !result.brand_id || !result.parent_sku"
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
      <div class="tab-sidebar p-3" v-if="!is_variant">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic Information') }} </h4>
        <div class="card-body">
          <div class="input-wrapper mb-10">

            <lang-input-multi :hasError="true" type="text" :title="$t('prod.Key features - English')"
                              :valuesOfLang="result.features"
                              @updateInput="updateInput">

            </lang-input-multi>
          </div>

          <ValidationProvider name="English keyword " :rules="{required: !is_draft & !result.basic_keyword_en}"
                              v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Keywords - English')}) }"
                              class="w-full">

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
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider name="Arabic keyword" :rules="{required: !is_draft & !result.basic_keyword_ar}"
                              v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Keywords - Arabic')}) }"
                              class="w-full">
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
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!--          BasicInformationChild-->
      <div class="tab-sidebar p-3">
        <lang-input v-if="!fromSingle" :hasError="false" type="textarea" :title="$t('prod.desc')"
                    :valuesOfLang="result.description"
                    @updateInput="updateInput"></lang-input>
      </div>

      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!--          BasicInformationChild-->
      <!-- ------------------------------------- -->
      <ValidationProvider v-if="!is_variant" name="Image"
                          :rules="{ required: result.product_images.length===0 && !is_variant }"
                          v-slot="{ errors }"
                          :custom-messages="{required: $t('global.req', { type: $t('prod.Image')}) }"
                          class="w-full">
        <div class="tab-sidebar p-3" :class="{ 'has-error': errors[0] && result.product_images.length===0 }">

          <vue-upload-images v-if="(isAdding || (!isAdding && result.images))" :return-data-just="0"
                             :old_images="result.images" :max-files="8" @updateInput="saveAttachment">>
          </vue-upload-images>

        </div>
        <span class="error" v-if="result.product_images.length===0">{{ errors[0] }}</span>
      </ValidationProvider>
      <!-- ------------------------------------- -->

      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3" v-if="!is_variant">
        <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Product Identifiers') }}</h4>
        <p class="text-sm">
          {{ $t('prod.Enter barcode type and number for improved search/visibility of your product') }}.</p>
        <div class="grid grid-cols-2 gap-4">
          <ValidationProvider name="Barcode type" :rules="{required: true}" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode type')}) }">
            <div class="input-wrapper mt-3 mt-sm-0">
              <label class="w-full">{{ $t('prod.Barcode type') }}</label>
              <select
                class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                :class="{ 'has-error': errors[0] }"
                v-model="result.barcode_type">
                <option value="" disabled>{{ $t('prod.Select Barcode') }}</option>
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
                @keypress="onlyNumber" min="0" maxlength="15"
                :disabled="result.barcode_type==4 || result.barcode_type===''"
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
                @input="changeSKU(result.sku, result.id)"
                v-model="result.sku"
                :placeholder="$t('prod.SKU')"
              >
            </div>
            <span v-if="errors[0]" class="error">{{ errors[0] }}</span>
            <span v-else class="error">{{ is_sku_exsist ? "SKU must be unique" : "" }} </span>
          </ValidationProvider>
        </div>
      </div>

      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div v-if="!is_variant" class="p-3">
        <div class="border-b border-smooth">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Fulfillment') }}</h4>
          <p>{{ $t('prod.Setup shipping and inventory details for this product') }}</p>
        </div>
        <div class="mt-10">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product Inventory') }}</h4>
          <p>{{ $t('prod.Enter the available quantity of your product') }}</p>
        </div>
        <div class="tab-sidebar flex items-center gap-4 p-3">
          <ValidationProvider name="Available quantity" :rules="availableQuantityValidationRules"
                              v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Available quantity')}) }">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Available quantity') }} ? <strong class="text-error">*</strong></label>
              <input type="text" class="form-control" :class="{ 'has-error': errors[0] }"
                     :disabled="result.is_always_available==1"
                     v-model="result.available_quantity" @input="availableQuantity" @keypress="onlyNumber" min="0"
                     maxlength="8">
              <label>{{ $t('prod.Minimum order quantity') }}: {{ result.product_prices[0].quantity }}</label>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="form-check" v-if="!is_variant">
            <label class="form-check-label">{{ $t('prod.Always Available') }}?</label>
            <!--                    is_always_available-->
            <input type="checkbox" class="custom-control-input" v-model="result.is_always_available"/>
          </div>
        </div>
      </div>

      <div class="my-10"></div>
      <!-- ------------------------------------- -->

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
                  @keypress="onlyNumber" min="0" maxlength="8"
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
          <ValidationProvider name="Number of units per carton"
                              :rules="{required: !is_draft, min_value: 1, max_value: 99999999}"
                              v-slot="{ errors }"
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
                  @keypress="onlyNumber" min="0" maxlength="8" v-model="result.pk_number_of_carton">
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
                  @keypress="onlyNumber" min="0" maxlength="2"
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
                  @keypress="onlyNumber" min="0" maxlength="8"
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
                  @keypress="onlyNumber" min="0" maxlength="8"
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
                  @keypress="onlyNumber" min="0" maxlength="8"
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
                  @keypress="onlyNumber" min="0" maxlength="8"
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
      <div class="tab-sidebar p-3" v-if="!is_variant">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product dimensions & weight') }}</h4>
        <p>{{ $t("prod.These attributes provide information about the products dimensions and weight") }}.</p>
        <ValidationProvider name="product dimention weight" :rules="ProductDimensionValidationRules"
                            v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('prod.Weight')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Weight') }} ? <strong class="text-error">*</strong></label>
            <div class="relative flex input-group gap-4 mb-3">
              <input
                type="text"
                class="form-control pr-12"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Weight')"
                @keypress="onlyNumber" min="0" maxlength="8"
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
          <ValidationProvider name="product dimention length" :rules="ProductDimensionValidationRules"
                              v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Length')}) }">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Length') }} ? <strong class="text-error">*</strong></label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'has-error': errors[0] }"
                  :placeholder="$t('prod.Length')"
                  @keypress="onlyNumber" min="0" maxlength="8"
                  v-model="result.pdime_length">
              </div>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider name="product dimention height" :rules="ProductDimensionValidationRules"
                              v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Height') }} ? <strong class="text-error">*</strong></label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'has-error': errors[0] }"
                  :placeholder="$t('prod.Height')"
                  @keypress="onlyNumber" min="0" maxlength="8"
                  v-model="result.pdime_height">
              </div>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider name="product dimention width" :rules="ProductDimensionValidationRules"
                              v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Width') }} ? <strong class="text-error">*</strong></label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('prod.Width')"
                  :class="{ 'has-error': errors[0] }"
                  @keypress="onlyNumber" min="0" maxlength="8"
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
                    @keypress="onlyNumber" min="0" maxlength="8"
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
                           @keypress="onlyNumber" min="0" maxlength="8"
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
                           @keypress="onlyNumber" min="0" maxlength="8"
                           v-model="product_price.selling_price">
                  </div>
                  <span class="error">{{ errors[0] }}</span>
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
                <option v-for="(item, index) in allCountries" :key="index" :value="item.id" disabled
                        v-if="item.id===194">{{
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
            <button v-if="fromSingle" type="button" class="btn text-primary" @click.prevent="doDraft">
              {{ $t('prod.Save Draft') }}
            </button>
            <button type="submit" class="btn bg-primary text-white border-secondary">
              {{ $t('prod.Send for review') }}
            </button>
            <span class="font-semibold text-error" v-if="(invalid || hasLangError)&& is_submit ">{{
                $t('prod.Check the errors')
              }}</span>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>


</template>
<style scoped>
select option {
  padding: 0.5rem;
}

.has-error {
  border: 1px solid red !important;
}
</style>
<script>
import {mapGetters, mapActions} from 'vuex'
import ErrorFormatter from '~/components/ErrorFormatter'
import WYSIWYGEditor from '~/components/WYSIWYGEditor'
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
import ProductSearch2 from "~/components/partials/ProductSearch2.vue";
import ProductSearch from "~/components/partials/ProductSearch.vue";
import {validate, ValidationObserver, ValidationProvider} from 'vee-validate';
import {extend} from 'vee-validate';
import BasicInformationChild from "@/components/product/BasicInformationChild.vue";
import VueUploadImages from "../../components/product/uploadImages.vue";
import error from "@/layouts/error.vue";
import _ from 'lodash';

export default {
  name: "AddProduct",
  middleware: ['common-middleware', 'auth'],
  props: {
    product: {
      type: Object,
      default: null
    },
    p_select_attr1: String,
    p_select_attr2: String,
    is_edit: {
      type: Boolean,
      default: false
    },
    variant_uu_id: {
      type: Number,
      default: null
    },
    id: {
      type: [Number, String],
      default: ""
    },
    fromSingle: {
      type: Boolean,
      default: true
    },
    is_next: {
      type: Boolean,
      default: false
    },
    is_clone: {
      type: Boolean,
      default: false
    },
  },
  data() {

    return {

      hasLangError: false,
      is_click_available: false,
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
      is_variant: false,
      is_draft: true,
      pv_type: false,
      isColor: false,
      isSize: false,
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
      is_submit: false,
      variant_copy: [],
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
        is_always_available: false,
        is_dangerous: 0,
        is_offer_private_label_option: 1,
        storage_temperature: '',
        stock_location: 1,
        country_of_origin: 194,
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
    BasicInformationChild,
    ProductSearch2,
    ProductSearch,
    VideoInput,
    ImageInput,
    DataPage,
    Dropdown,
    WYSIWYGEditor,
    FileUpload,
    VideoUpload,
    TagSearch,
    AjaxButton,
    ProductInventory,
    ErrorFormatter,
    Spinner,
    LangInput,
    ValidationProvider,
    ValidationObserver
  },
  provide: {
    // fetchingData: () => {
    //   this.fetchingData()
    // },
  },


  computed: {
    availabilityStatus: {
      get() {
        return this.result.is_availability ? "1" : "0";
      },
      set(value) {
        this.result.is_availability = value === "1";
      }
    },
    error() {
      return error
    },

    skuRules() {
      // if (!this.id) {
      return {
        required: !this.is_draft,
        uniqueSku: this.is_sku_exsist, // Pass allSKus as a parameter to uniqueSku
        min: 2,
        max: 32
      };
    },

    UnitPriceValidationRules() {
      return {
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
        priceComparison: {unit_prices, selling_prices}
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
        required: !this.is_draft && !this.result.is_always_available,
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
        min_value: 0.000001,
        max_value: 99999999
      };
    },
    NotDraftValidationRules() {
      return {
        required: !this.is_draft,
      };
    },

    CartonDimensionValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 0.000001,
        max_value: 99999999
      };
    },
    ProductDimensionValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 0.000001,
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

    isAdding() {
      return isNaN(this.$route?.params?.id)
    },
    ...mapGetters(['mediaStorage']),
    ...mapGetters('admin', ['publicKey']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['is_sku_exsist', 'allCategories', 'allTaxRules', 'allAttributes',
      'allBrands', 'allSKus', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  watch: {
    p_variant_uu_id(newValue, oldValue) {
      if (this.p_variant_uu_id) {
        this.variant_uu_id = this.p_variant_uu_id;
      }
    },
    p_select_attr1(newValue, oldValue) {
      if (this.p_select_attr1) {
        this.select_attr1 = this.p_select_attr1;
      }
    },
    p_select_attr2(newValue, oldValue) {
      if (this.p_select_attr2) {
        this.select_attr1 = this.p_select_attr2;
      }
    },
    product(newValue, oldValue) {
      if (this.product) {
        this.result = this.product;

        if (this.result.features.length == 0)
          this.result.features = [{'ar': '', 'en': ''}]
        // this.result = JSON.parse(JSON.stringify(newValue));
      }

    },
    'result.barcode_type'(newValue, oldValue) {
      if (newValue == 4) {
        this.result.barcode = '';
      }
    },
    'result.is_always_available'(newValue, oldValue) {
      if (newValue == 1) {
        this.result.available_quantity = '';
        this.result.is_availability = 1;
      } else {
        this.result.is_availability = 0;
      }
    }
  },
  methods: {
    checkLangError(haserror) {

      this.hasLangError = haserror
    },

    async changeSKU(sku, product_id) {
      this.debouncedInputHandler();

    },
    debouncedInputHandler: _.debounce(function () {
      // This code will run when the user stops typing
      console.log('User stopped typing, current value:', this.inputValue);
      this.checkIfVaildSKU({sku: this.result.sku, product_id: this.result.id})
      // Add any additional logic here
    }, 500),

    compareMethods() {
      let ava_qty = parseInt(this.result.available_quantity);
      let product_prices_min_qty = parseInt(this.result.product_prices[0]?.quantity);

      if (!isNaN(ava_qty) && !isNaN(product_prices_min_qty)) {
        this.result.is_availability = ava_qty >= product_prices_min_qty ? 1 : 0;
      }
    },

    availableQuantity() {
      this.compareMethods()
    },

    doNext() {

      this.$emit('GoNext', {
        result: this.result,
        selectedLevel1: this.selectedLevel1,
        selectedLevel2: this.selectedLevel2,
        selectedLevel3: this.selectedLevel3,
        select_attr1: this.select_attr1,
        select_attr2: this.select_attr2,
        variant_uu_id: this.variant_uu_id,

      })
      this.variant_uu_id = this.generateUUID();
      this.result.id = this.id;

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
    doVariantCancel() {
      this.is_variant_save = true; // Assuming canceling resets to Save mode
      this.is_variant_edit = true;
      this.is_variant_save_after_edit = false;

      if (this.variant_copy) {
        this.result.product_variants = this.variant_copy
      }

    },
    doVariantEdit() {
      this.variant_copy = [...this.result.product_variants];
      this.variant_copy = JSON.parse(JSON.stringify(this.result.product_variants));
      this.is_variant_save = false;
      this.is_variant_edit = true;
      this.is_variant_save_after_edit = true;
    },

    doVariantSave() {
      // Check if product_variants is not empty
      if (this.result.product_variants.length !== 0) {
        for (let i = 0; i < this.result.product_variants.length; i++) {
          const variant = this.result.product_variants[i];
          // Check if any variant has missing name or value
          if (!variant.name && !variant.value) {
            // Show error message and exit loop early
            this.setToastError(this.$t('prod.Color or value cannot be empty'));
            return;
          }
        }
        // If all variants have name and value, toggle save and edit flags
        this.is_variant_save = true;
        this.is_variant_edit = true;
        this.is_variant_save_after_edit = false;
        this.variant_copy = null
      } else {
        // If there are no variants, show error message
        this.setToastError(this.$t('prod.Color or value cant empty value'));
      }
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
    async doSubmit() {
      this.is_draft = false;
      this.result.is_draft = false;
      this.is_submit = true
      if (this.validationKeysIfNotVariant.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      if (this.is_sku_exsist) {
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
      this.result.is_variant = !this.fromSingle
      // this.checkForm()
      const data = await this.setById({
        id: this.id,
        params: {
          ...this.result,
          rfq_id: this.$route.query?.quote,
          rfq_product_id: this.$route.query?.rfq_product_id
        },
        api: this.setApi
      })
      if (data.status === 200) {

        if (this.fromSingle) {
          var path = '/products/pending-approval';
          if (data.data.status === "approved")
            path = '/products/approved';
          this.$router.push({path});
        } else {
          var res = data;
          this.result = {
            title: res?.data.title,
            variant_uu_id: res?.data.variant_uu_id,
            description: res?.data.description,
            parentCategory: res?.data.category?.id,
            subCategory: res?.data.sub_category?.id,
            childCategory: res?.data.child_category?.id,
            product_prices: res?.data.product_prices,
            unit_id: res?.data.unit_id,
            features: res?.data.product_features?.map(item => item.name),
            unit: res?.data.unit,
            brand_id: res?.data.brand_id,
            meta_title: res?.data.meta_title,
            meta_description: res?.data.meta_description,
            selling: res?.data.selling,
            purchased: res?.data.selling, // Should this be res?.data.purchased?
            offered: res?.data.offered,
            images: res?.data.images,
            product_images: res?.data.images,
            video: res?.data.video,
            status: res?.data.status,
            parent_sku: res?.data.parent_sku,
            basic_keyword_en: res?.data.basic_keyword_en,
            basic_keyword_ar: res?.data.basic_keyword_ar,
            basicInfoAr: res?.data.title,
            basicInfoEng: res?.data.title,
            barcode_type: res?.data.barcode_id,
            barcode: res?.data.barcode_number,
            sku: res?.data.sku,
            available_quantity: res?.data.available_quantity,
            pk_size: res?.data.packaging?.size,
            pk_size_unit: res?.data.packaging?.size_unit,
            pk_number_of_carton: res?.data.packaging?.number_of_carton,
            pk_average_lead_time: res?.data.packaging?.average_lead_time,
            pk_transportation_mode: res?.data.packaging?.transportation_mode,
            pc_weight: res?.data.product_carton?.weight,
            pc_weight_unit_id: res?.data.product_carton?.weight_unit_id,
            pc_height: res?.data.product_carton?.height,
            pc_height_unit_id: res?.data.product_carton?.height_unit_id,
            pc_length: res?.data.product_carton?.length,
            pc_length_unit_id: res?.data.product_carton?.length_unit_id,
            pc_width: res?.data.product_carton?.width,
            pc_width_unit_id: res?.data.product_carton?.width_unit_id,
            pdime_weight: res?.data.product_dimension?.weight,
            pdime_weight_unit_id: res?.data.product_dimension?.weight_unit_id,
            pdime_height: res?.data.product_dimension?.height,
            pdime_length: res?.data.product_dimension?.length,
            pdime_width: res?.data.product_dimension?.width,
            pdime_dimention_unit: res?.data.product_dimension?.dimention_unit,
            pp_quantity: res?.data.product_prices?.map(price => price.quantity),
            pp_unit_price: res?.data.product_prices?.map(price => price.unit_price),
            pp_selling_price: res?.data.product_prices?.map(price => price.selling_price),
            is_ready_to_ship: res?.data.is_ready_to_ship,
            is_buy_now: res?.data.is_buyable,
            is_availability: res?.data.is_available,
            storage_temperature: res?.data.storage_temperature_id,
            stock_location: res?.data.warehouse_id,
            country_of_origin: res?.data.product_origin_id,
            is_dangerous: res?.data.is_dangerous,
            product_variants: res?.data.product_variant,
            product_variant: res?.data.product_single_variant ?? [],
            PriceingRows: res?.data.product_prices,
            is_variant: !!res?.data.product_variant,
            is_always_available: res?.data?.is_always_available,
            additional_details_row: res?.data.additional_attribute?.map(item => ({name: item.name, value: item.value})),
            hts_code: res?.data.hts_code,
            id: res?.data.id,
          }
          this.$emit('productUpdate', this.result)
        }

      }

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
        this.handleInput($event)
      }
    },
    addVariantValueRows() {
      this.result.product_variants.push({...this.product_variant});
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
    removeVariantRows(index) {
      console.log(index)
      if (index != 0) {
        this.result.product_variants.splice(index, 1);

      }
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },

    isVariant() {
      this.is_variant = !this.is_variant;
      // this.result.status = 'draft';
      this.result.is_variant = !this.result.is_variant;
      if (!this.is_variant) {
        this.result.variantRows = [];
        this.result.variantRows = [{size: 0, color: ""}];
        this.result.productVariants.variantValues = [[], []];
      }
    },

    getThumb(url) {
      return url
    },
    async checkForm() {

      this.formSubmitting = true
      try {

        delete this.result.created_at
        delete this.result.updated_at
        this.result.is_draft = true;
        const data = await this.setById({
          id: this.id,
          params: {
            ...this.result,
            rfq_id: this.$route.query?.quote,
            rfq_product_id: this.$route.query?.rfq_product_id
          },
          api: this.setApi
        })

        console.log(data)
        if (data.status === 200) {
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
    async fetchingData(id, api = 'getProduct') {

      try {
        this.loading = true
        var res = Object.assign({}, await this.getById({id: id, params: {}, api: api}))
        console.log('res', res)
        this.result = res

        if (this.result.features.length == 0)
          this.result.features = [{'ar': '', 'en': ''}]

        this.min_qty = Math.min(...this.result.product_prices.map(item => item.quantity));
        this.is_variant = false;
        // this.result.PriceingRows = res.product_prices
        this.result.product_variants = res.product_variant ?? [];

        if (res.product_variant?.length != 0) {
          this.result.is_variant = true
          if (res.variant_uuid)
            this.$router.push('/products/variant/' + res.id)
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
    async findKeyword() {
      let res = await this.getById({id: 1, params: {keyword: ''}, api: 'findRfqKeyword'});
      this.allKeywords = res;
    },

    ...mapActions('common', ['checkIfVaildSKU', 'getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  },
  async mounted() {

    this.getThumb(this.isThumb)

    this.compareMethods();
    this.select_attr1 = 'color';
    this.select_attr2 = 'size';
    if (this.allCategoriesTree.length == 0) {
      try {
        await this.getCategoriesTree()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
    if (this.product != null) {
      this.result = this.product
    }
    if (this.fromSingle) {
      if (!this.isAdding) {
        await this.fetchingData(this.id)
      }
      if (this.$route.query?.id) {
        this.fetchingData(this.$route.query?.id).then(() => {
          this.result.id = ""
        })
      }
    }
    if (this.allKeywords.length === 0) {
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
