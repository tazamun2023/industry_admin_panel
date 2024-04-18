<template>
  <div>
    <div class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4>{{ $t('prod.add_new_product') }}</h4>
        <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>
      </div>
      <div>
        <div class="grid grid-cols-4">
          <div class="p-4">
            <div class="flex gap-4 p-2 justify-between">
              <p class="font-bold pt-2">{{ $t('prod.Variants List') }}</p>
              <button @click="varientModal = true" class="border border-smooth p-2 gap-4 w-[200px] leading-3 flex ">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5"/>
                </svg>
                <span class="pt-2">{{ $t('prod.Add Variant') }}</span></button>
            </div>
            <!--            :class="{'bg-white border-white border-b-2': openTab !== 'parent', 'border-b-2 bg-primary border-primary text-white': openTab === parent}"-->
            <ul class="mb-0 list-none shadow mt-10" v-if="result.product_variants">
              <li class="-mb-px w-100 mr-2 last:mr-0 cursor-pointer">
                <a class="text-xs w-100 font-bold uppercase px-5 py-3 leading-normal"
                   @click="toggleTabs('parent')"
                   :class="openTab === 'parent'? 'border-b-2 bg-primary border-primary text-white':'bg-white border-white border-b-2'">
                  <span class="flex gap-3"> <img class="w-10 h-10 rounded"
                                                 src="https://c8n.tradeling.com/web-catalog-pim/assets/svgs/parentImageIcon.svg"
                                                 alt=""> <span class="pt-2">Parent view</span></span>
                </a>
              </li>
              <li class="-mb-px w-100  mr-2 last:mr-0 cursor-pointer"
                  v-for="(colorItem, index) in result.product_variants" :key="index">
                <a class="text-xs flex justify-between w-100 font-bold uppercase px-5 py-3    leading-normal"
                   @click="toggleTabs(index)"
                   :class="{'bg-white border-white border-b-t': openTab !== index, 'border-b-2 bg-primary border-primary text-white': openTab === index}">
                  <span class="flex gap-3">
                    <img class="w-10 h-10 rounded"
                         src="https://c8n.tradeling.com/web-catalog-pim/assets/svgs/noImageIcon.svg"
                         alt="">
                           <span class="pt-2" v-if="colorItem.color_name && colorItem.value">{{ colorItem.color_name }}, {{
                               colorItem.value
                             }}</span>
                    <span class="pt-2" v-else-if="colorItem.color_name">{{ colorItem.color_name }}</span>
                    <span class="pt-2" v-else-if="colorItem.value">{{ colorItem.value }}</span>
                    <span class="pt-2" v-else>{{ $t('prod.ERROR') }}</span>
                  </span>
                  <p><span class="bg-smooth rounded-lg text-xs mt-2 p-1">{{ $t('prod.Incomplete') }}</span></p>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-span-3">
            <div class="p-4">
              <div class="flex justify-between">
                <h4>{{ $t('prod.Basic information') }}</h4>
                <p class="cursor-pointer underline font-bold" @click="CategorySection = !CategorySection">
                  {{ $t('prod.Edit Category') }}</p>
              </div>


              <div>
                <nav class="text-primary" aria-label="Breadcrumb">
                  <ol class="list-none p-0 inline-flex">
                    <li class="flex items-center">
                      <a href="/" class="text-gray-500 hover:text-gray-700">{{ $t('prod.Home') }}</a>
                      <svg
                        class="h-5 w-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </li>
                    <li class="flex items-center">
                      <a href="/category" class="text-gray-500 hover:text-gray-700">{{ selectedLevel1.title }}</a>
                      <svg
                        class="h-5 w-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </li>
                    <li class="flex items-center">
                      <span class="text-gray-700">{{ selectedLevel2.title }}</span>
                    </li>
                  </ol>
                </nav>

              </div>
              <div v-if="CategorySection" class="grid grid-cols-3 gap-4">
                <!-- Main Category Dropdown -->
                <div class="form-group input-wrapper for-lang ar-lang">
                  <label class="w-full" for="mainCategory">{{ $t("rfq.Search by Category") }}</label>
                  <!--              :class="{invalid: !is_draft && !result.selectedMainCategory && hasError}"-->
                  <v-select
                    :dir="$t('app.dir')"
                    v-model="result.parentCategory"
                    :options="allCategoriesTree"
                    label="title"
                    :reduce="cat => cat.id"
                    :placeholder="$t('rfq.Search by Category')"
                    class="custom-select"
                    :class="{invalid: result.parentCategory === '' && hasError}"
                  ></v-select>
                </div>

                <!-- Sub Category Dropdown -->
                <div class="form-group input-wrapper for-lang ar-lang">
                  <label class="w-full" for="subCategory">{{ $t("rfq.Select Sub Category") }}</label>
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
                </div>

                <!-- Child Category Dropdown -->
                <div class="form-group input-wrapper for-lang ar-lang">
                  <label class="w-full" for="childCategory">{{ $t("rfq.Select Child Category") }}</label>
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
                </div>
              </div>
            </div>
            <div class="tab-content mt-10 p-4 input-wrapper tab-space">
              <div>
                <form action="">
                  <div class="input-wrapper mb-4">
                    <label for="">{{ $t('prod.Parent SKU') }}</label>
                    <input type="text" v-model="result.parent_sku" :placeholder="$t('prod.sku')"
                           class="cursor-not-allowed" disabled>
                  </div>
                  <lang-input v-if="openTab === 'parent'" :hasError="hasError" type="text" :title="$t('prod.name')"
                              :valuesOfLang="result.title" :isVariant="openTab !== 'parent'"
                              @updateInput="updateInput"></lang-input>
                  <div class="input-wrapper mb-4" v-else>
                    <label for="">{{ $t('prod.name') }}</label>
                    <input type="text" :placeholder="variantName(result.title)" class="cursor-not-allowed" disabled>
                  </div>
                  <select class="form-control w-full rounded border border-smooth p-3" :disabled="openTab !== 'parent'"
                          :readonly="openTab !== 'parent'"
                          :class="{invalid: !is_draft && (result.brand_id == 0 || result.brand_id===null) && hasError}"
                          v-model="result.brand_id">
                    <option value="0">Select Brand</option>
                    <option v-for="(item, index) in allBrands" :key="index" :value="index">{{ item.title }}</option>
                  </select>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- --------------------------- -->
    <div class="my-10"></div>
    <!-- ------------------------------------- -->
    <!-- --------------------------------------------------------------------------------- -->
    <div v-bind:class="{'hidden': openTab !== 'parent', 'block': openTab === 'parent'}">
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Unit of measure') }}</h4>
        <div class="form-group input-wrapper for-lang ar-lang">
          <label class="w-full" for="name">Unit of measure</label>
          <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="result.unit_id">
            <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <!-- --------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
    </div>
    <!-- --------------------------------------------------------------------------------- -->
    <div :class="openTab !== 'parent' ? 'block':'hidden'">
      <!-- --------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Variant information') }}</h4>
        <div class="card-body mt-10">
          <div class="form-check">
            <input checked :disabled="openTab" style="cursor: not-allowed" class="form-check-input" type="checkbox"
                   value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              {{ $t('prod.This product has options, like size or color') }}
            </label>
          </div>
          <div class="grid grid-cols-3 gap-4 pt-4" v-if="openTab!=='parent'">
            <div class="col-md-4">
              <div class="form-group">
                <select class="w-full rounded border mb-10 border-smooth p-3" v-model="select_attr1"
                        @change="isAttr($event, 'color')" style="cursor: not-allowed" disabled>
                  <option value="0">{{ $t('prod.Select attribute 1') }}</option>
                  <option v-for="(item, index) in product_variant_type" :key="index"
                          :disabled="item === select_attr2">{{ item }}
                  </option>
                </select>
              </div>

            </div>
            <div class="col-md-4" style="cursor: not-allowed">
              <div class="form-group">
                <select class="w-full rounded border mb-10 border-smooth p-3" v-model="select_attr2"
                        @change="isAttr($event, 'size')" style="cursor: not-allowed" disabled>
                  <option value="0">Select attribute 2</option>
                  <option v-for="(item, index) in product_variant_type" :key="index"
                          :disabled="item === select_attr1">{{ item }}
                  </option>
                </select>
              </div>

            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4" v-if="openTab !== 'parent'">
              <div class="form-group">
                <select class="w-full rounded border mb-10 border-smooth p-3"
                        v-model="result.product_variants[openTab].name"
                        v-if="select_attr1 === 'color'">
                  <option v-for="(item, index) in allColors" :key="index" :value="index">{{
                      item.title ?? item.name
                    }}
                  </option>
                </select>
                <input class="form-control w-100" type="text" placeholder="Enter Value"
                       v-model="result.product_variants[openTab].value"
                       v-if="select_attr1 === 'size'"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <input class="form-control w-100" type="text" placeholder="Enter Value"
                       v-model="result.product_variants[openTab].value"
                       v-if="select_attr2 === 'size'"/>
                <select class="w-full rounded border mb-10 border-smooth p-3"
                        v-model="result.product_variants[openTab].name"
                        v-if="select_attr2 === 'color'">
                  <option v-for="(item, index) in allColors" :key="index" :value="index">{{
                      item.title ?? item.name
                    }}
                  </option>
                </select>
              </div>
            </div>
            <span class="mt-3">{{
                result.product_variants[openTab].color_name
              }},{{ result.product_variants[openTab].value }}</span>
          </div>
          <!-- <hr class="border-smooth">
          <div class="flex justify-end gap-4 pt-3">
            <button type="submit" class="btn text-white bg-primary">
              SAVE
            </button>
            <button type="submit" class="btn  border-secondary">
              <span>RESET</span>
            </button>
            <button type="submit" class="btn bg-light">
              <span>CANCEL</span>
            </button>
          </div> -->
        </div>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic Information') }} </h4>
        <div class="card-body">
          <div class="input-wrapper mb-10">
            <label for="">{{ $t('prod.Key features - English') }} ?</label>

            <lang-input-multi :hasError="hasError" type="text" :title="$t('city.name')"
                              :valuesOfLang="result.features"
                              @updateInput="updateInput"></lang-input-multi>
          </div>

          <div class="input-wrapper mb-10">
            <label for="">{{ $t('prod.Keywords - English') }} ?</label>
            <v-select
              :dir="$t('app.dir')"
              v-model="result.basic_keyword_en"
              :options="['sea','air','land']"
              taggable
              multiple
              :placeholder="$t('title.select_type')"
              class="custom-select"
              :class="{invalid: !result.is_variant && result.basic_keyword_en === '' && hasError}"
            ></v-select>
          </div>
          <div class="input-wrapper mb-10">
            <label for="">{{ $t('prod.Keywords - Arabic') }} ?</label>
            <v-select
              :dir="$t('app.dir')"
              v-model="result.basic_keyword_ar"
              :options="['sea','air','land']"
              taggable
              multiple
              :placeholder="$t('title.select_type')"
              class="custom-select"
            ></v-select>
          </div>
        </div>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <lang-input v-if="!is_variant" :hasError="hasError" type="textarea" :title="$t('prod.desc')"
                    :valuesOfLang="result.description"
                    @updateInput="updateInput"></lang-input>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <div class="flex pl-4">
          <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Images and Videos') }}</h4>
        </div>
        <div class="input-wrapper">
          <label class="pl-4 pt-0 fw-bold">
            {{ $t('prod.Add images and videos of your product to engage customers') }}. <br>
            {{ $t('prod.Images should be square with minimum allowed dimensions to be 500x500 pixels') }}. <br>
            {{ $t('prod.Allowed file extensions are (png, bmp, jpeg, and jpg)') }} <br>
            {{ $t('prod.and allowed video extensions are(mp4, mpeg and webp)') }}
          </label>
        </div>
        <upload-files @updateInput="saveAttachment"></upload-files>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <div class="tab-sidebar p-3" v-if="openTab !== 'parent'">
        <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Product Identifiers') }}</h4>
        <p class="text-sm">
          {{ $t('prod.Enter barcode type and number for improved search/visibility of your product') }}.</p>
        <div class="grid grid-cols-2 gap-4">

          <div class="input-wrapper mt-3 mt-sm-0">
            <label class="w-full">{{ $t('prod.Barcode type') }}</label>
            <select class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                    :class="{invalid: !is_draft && result.barcode_type == 0 && hasError}"
                    v-model="variants[openTab].result.barcode_type">
              <option value="0">Select Barcode</option>
              <option :value="index" v-for="(item, index) in allBarcodes" :key="index">{{ item.name }}</option>
            </select>
          </div>
          <div class="form-group input-wrapper mt-3 mt-sm-0">
            <label>{{ $t('prod.Barcode') }}</label>
            <input type="text" class="form-control" v-model="variants[openTab].result.barcode"
                   :class="{invalid: !is_variant && result.barcode===null && hasError}"
                   placeholder="Please enter barcode number"
                   :readonly="result.barcode_type==0">
          </div>
          <div class="form-group input-wrapper  mt-3 mt-sm-0">
            <label>{{ $t('prod.SKU') }}</label>
            <input type="text" class="form-control" v-model="variants[openTab].result.sku" placeholder="sku"
                   :readonly="result.barcode_type==0"
                   :class="{invalid: !is_draft && result.sku===null && hasError}"
            >
          </div>
        </div>
      </div>
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <div class="border-b border-smooth">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Fulfillment') }}</h4>
          <p>{{ $t('prod.Setup shipping and inventory details for this product') }}</p>
        </div>
        <div class="mt-10">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product Inventory') }}</h4>
          <p>{{ $t('prod.Enter the available quantity of your product') }}</p>
        </div>
        <div class="input-wrapper" v-if="openTab !== 'parent'">
          <label for="">{{ $t('prod.Available quantity') }} ?</label>
          <input type="text" class="form-control" v-model="variants[openTab].result.available_quantity"
                 @keypress="onlyNumber"
                 @input="availableQuantity">
          <label>{{ $t('prod.Minimum order quantity') }}: 1</label>
        </div>
      </div>
      <div class="my-10"></div>
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="input-wrapper">
            <label for="">Size ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Size" aria-label="Recipient's username"
                     :class="{invalid: !is_draft && (!result.pk_size) && hasError}"
                     @keypress="onlyNumber"
                     aria-describedby="button-addon2" v-model="result.pk_size">
              <div class="absolute right-0 top-0">
                <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                        v-model="result.pk_size_unit"
                >
                  <option value="0">{{ $t('prod.Size Unit')}}</option>
                  <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{
                      item.name
                    }}
                  </option>
                </select>
              </div>
            </div>


          </div>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Number of units per carton') }}</label>
            <div class=" mb-3">
              <input type="text" class="form-control" placeholder="Size" aria-label="Units per carton"
                     :class="{invalid: !is_draft && (!result.pk_number_of_carton) && hasError}"
                     @keypress="onlyNumber"
                     aria-describedby="button-addon2" v-model="result.pk_number_of_carton">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label>
            <div class=" mb-3">
              <input type="text" class="form-control" placeholder="Avg. Lead Time" aria-label="Units per carton"
                     :class="{invalid: !is_draft && (!result.pk_average_lead_time) && hasError}"
                     @keypress="onlyNumber"
                     aria-describedby="button-addon2" v-model="result.pk_average_lead_time">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Transportation Mode') }}</label>
            <div class=" mb-3">
              <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                      v-model="result.pk_transportation_mode"
                      :class="{invalid: !is_draft && (!result.pk_transportation_mode) && hasError}"
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
      <!-- ------------------------------------- -->
      <div class="my-10"></div>


      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Carton Dimensions & Weight') }}</h4>
        <p>
          {{ $t("prod.Enter the dimensions and weight of the carton to help calculate shipping rate.These measurements are for the product's shipping container") }}.</p>
        <div class="grid grid-cols-2 gap-4">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Weight') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                     aria-label="Recipient's username"
                     @keypress="onlyNumber"
                     :class="{invalid: !is_draft && (result.pc_weight===null) && hasError}"
                     aria-describedby="button-addon2" v-model="result.pc_weight">
              <div class="absolute right-0 top-0">
                <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                        :class="{invalid: !is_draft && (result.pc_weight_unit_id===null) && hasError}"
                        v-model="result.pc_weight_unit_id">
                  <!--                  <option value="0">Select</option>-->
                  <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                      item.name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Length') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Length"
                     aria-label="Recipient's username"
                     @keypress="onlyNumber"
                     :class="{invalid: !is_draft && (result.pc_length===null) && hasError}"
                     aria-describedby="button-addon2" v-model="result.pc_length">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                        :class="{invalid: !is_draft && (result.pc_length_unit_id===null) && hasError}"
                        v-model="result.pc_length_unit_id">
                  <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                      item.name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="">{{ $t('prod.Height') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Height"
                     aria-label="Recipient's username"
                     @keypress="onlyNumber"
                     :class="{invalid: !is_draft && (result.pc_height===null) && hasError}"
                     aria-describedby="button-addon2" v-model="result.pc_height">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                        :class="{invalid: !is_draft && (result.pc_height_unit_id===null) && hasError}"
                        v-model="result.pc_height_unit_id">
                  <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                      item.name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="">{{ $t('prod.Width') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Width"
                     aria-label="Recipient's username"
                     @keypress="onlyNumber"
                     :class="{invalid: !is_draft && (result.pc_width===null) && hasError}"
                     aria-describedby="button-addon2" v-model="result.pc_width">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                        :class="{invalid: !is_draft && (result.pc_width_unit_id===null) && hasError}"
                        v-model="result.pc_width_unit_id">
                  <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                      item.name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product dimensions & weight') }}</h4>
        <p>{{ $t("prod.These attributes provide information about the product's dimensions and weight") }}.</p>
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Weight') }} ?</label>
          <div class="relative flex input-group gap-4 w-50 mb-3">
            <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                   aria-label="Recipient's username"
                   @keypress="onlyNumber"
                   :class="{invalid: !is_draft && (result.pdime_weight ===null) && hasError}"
                   aria-describedby="button-addon2" v-model="result.pdime_weight">
            <div class="absolute right-0 top-0">
              <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                      :class="{invalid: !is_draft && (result.pdime_weight_unit_id === null) && hasError}"
                      v-model="result.pdime_weight_unit_id">
                <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{ item.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Length') }} ?</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter Length" aria-label="Recipient's username"
                     :class="{invalid: !is_draft && (result.pdime_length === null) && hasError}"
                     @keypress="onlyNumber"
                     aria-describedby="button-addon2" v-model="result.pdime_length">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Height') }} ?</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter Height" aria-label="Recipient's username"
                     :class="{invalid: !is_draft && (result.pdime_height === null) && hasError}"
                     @keypress="onlyNumber"
                     aria-describedby="button-addon2" v-model="result.pdime_height">
            </div>
          </div>

          <div class="input-wrapper">
            <label for="">{{ $t('prod.Width') }} ?</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter Width" aria-label="Recipient's username"
                     :class="{invalid: !is_draft && (result.pdime_width===null) && hasError}"
                     @keypress="onlyNumber"
                     aria-describedby="button-addon2" v-model="result.pdime_width">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Dimension Unit') }}</label>
            <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                    :class="{invalid: !is_draft && (result.pdime_dimention_unit ===null) && hasError}"
                    v-model="result.pdime_dimention_unit">
              <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{ item.name }}</option>
            </select>
          </div>
        </div>

      </div>
      <!-- ----------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3" v-if="openTab !== 'parent'">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Pricing</h4>
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Unit of measure') }} ?</label>
          <div class="input-group mb-3">
            <select class="border p-3 w-50 border-smooth rounded-lg uppercase"
                    :class="{invalid: !is_draft && result.unit_id === 0  && hasError}"
                    v-model="variants[openTab].result.unit_id">
              <option value="0">{{ $t('prod.Unit') }}</option>
              <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{ item.name }}</option>
            </select>
          </div>
        </div>
        <p><span class="fw-bold">{{ $t('prod.Price list') }}</span> {{ $t('prod.UAE Market(GULF) - AED') }}</p>
        <p>
          {{ $t('prod.Add pricing to your product. You can also create bulk pricing rules to offer price discounts based on quantity breaks') }}</p>
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

            <tr v-for="(product_price, index) in variants[openTab].result.product_prices" :key="index">
              <td class="p-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Quantity"
                  @keypress="onlyNumber"
                  v-model="product_price.quantity"
                  @input="stockCheck(index)"
                  :class="{invalid: hasErrorQty}"
                >
              </td>
              <td class="p-2">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">SAR</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
                         @keypress="onlyNumber"
                         v-model="product_price.unit_price">
                </div>
              </td>
              <td class="p-2">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">SAR</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
                         @keypress="onlyNumber"
                         v-model="product_price.selling_price">
                </div>
              </td>
              <td class="p-2">
                <button type="button" class="btn  btn-outline-secondary" @click.prevent="removePriceingRows(index)">
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
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Shipping details') }}</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Is Ready To Ship') }} ?</label>
              <select class="border p-3 w-full border-smooth rounded-lg uppercase" v-model="result.is_ready_to_ship"
                      :class="{invalid: !is_draft && (result.is_ready_to_ship === null) && hasError}"
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
                      :class="{invalid: !is_draft && (result.is_buy_now === null) && hasError}"
                      v-model="result.is_buy_now">
                <option value="1">{{ $t('prod.Yes') }}</option>
                <option value="0">{{ $t('prod.No') }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Availability') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                      disabled
                      :class="{invalid: !is_draft && (result.is_availability===null) && hasError}"
                      v-model="result.is_availability">
                <option value="1">{{ $t('prod.In Stock') }}</option>
                <option value="0">{{ $t('prod.Out of Stock') }}</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Storage temperature') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg"
                      :class="{invalid: !is_draft && (result.storage_temperature===0 || result.storage_temperature===null) && hasError}"
                      v-model="result.storage_temperature">
                <option value="0" disabled>Select Option</option>
                <option v-for="(item, index) in allStorageTemperatures" :key="index" :value="index">{{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Ware House') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.stock_location"
                      :class="{invalid: !is_draft && (result.stock_location===0 || result.stock_location===null) && hasError}">
                <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{ item.name }}</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Country of origin') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.country_of_origin"
                      :class="{invalid: !is_draft && (result.country_of_origin===null) && hasError}">
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
                      v-model="result.is_dangerous"
                      :class="{invalid: !is_draft && (result.is_dangerous===null) && hasError}">
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
      <div class="tab-sidebar p-3">
        <div class="border-b border-smooth mb-10">
          <h4>{{ $t('prod.Additional details') }}</h4>
          <p>{{ $t('prod.Enter the details listed below for better discoverability of the product') }}</p>
        </div>
        <div class="form-group input-wrapper mb-10 for-lang ar-lang">
          <label for="name">{{ $t("prod.hts_code") }}</label>
          <input class="form-control" name="e.g. Macbook Pro 2019" type="text" v-model="result.hts_code">
        </div>
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Additional attributes') }} <span
          class="text-xs">(optional)</span>
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
            <button type="button" class="btn text-primary" @click.prevent="doDraft">
              {{ $t('prod.Save Draft') }}
            </button>
            <button type="button" class="btn bg-primary text-white border-secondary" @click.prevent="doSubmit">
              {{ $t('prod.Send for review') }}
            </button>
          </div>
        </div>
      </div>

    </div>
    <!-- --------------------------------------------------------------------------------- -->
    <template v-if="varientModal">
      <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
          <svg @click="varientModal = false"
               class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <!-- Modal Content -->
          <div class="mb-4 border-b border-smooth pb-2">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">Add Variant</h4>
          </div>
          <div>
            <div class="card-body mt-10">
              <div class="grid grid-cols-3 gap-4 pt-4">
                <div class="col-md-4">
                  <div class="form-group">
                    <select disabled class="w-full rounded border mb-10 border-smooth p-3" name="" id="">
                      <option value="">Color</option>
                      <option value="">Size</option>
                    </select>
                  </div>

                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <select disabled class="w-full rounded border mb-10 border-smooth p-3" name="" id="">
                      <option value="">Color</option>
                      <option value="">Size</option>
                    </select>
                  </div>

                </div>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input class="form-control  w-100" name="Enter Value" placeholder="Enter Value" type="text"
                           value="">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input class="form-control  w-100" name="Enter Value" type="text" placeholder="Enter Value"
                           value="">
                  </div>
                </div>
                <div class="col-md-4">
                               <span class="p-3 border border-smooth rounded cursor-pointer"><svg class="w-4 h-4"
                                                                                                  aria-hidden="true"
                                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                                  fill="none"
                                                                                                  viewBox="0 0 14 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
  </svg></span>
                </div>
                <div class="col-md-4 pt-4">
                  <button type="submit" class="btn mb-10 w-100 btn-outline-secondary">
                    Add Row
                  </button>
                </div>
              </div>
              <hr class="border-smooth">
              <div class="flex justify-end gap-4 pt-3">
                <button type="submit" class="btn text-white bg-primary">
                  SAVE
                </button>

                <button @click="varientModal = false" class="btn bg-light">
                  <span>CANCEL</span>
                </button>
              </div>
            </div>
          </div>
          <!-- Close Button -->


        </div>
      </div>
    </template>
  </div>

</template>
<script>
import {mapActions, mapGetters} from "vuex";
import variant from "@/pages/products/variant.vue";

export default {
  name: "Variant",
  inject: [],
  props: {
    result: Object,
    selectedLevel1: Object,
    selectedLevel2: Object,
    selectedLevel3: Object,
    select_attr1: String,
    select_attr2: String,
  },
  data() {
    return {
      injectedData: this.exampleData,
      openTab: 'parent',
      uploadModal: false,
      varientModal: false,
      CategorySection: false,
      is_next: true,
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      isThumb: null,
      isFirstThumb: null,
      is_clone: false,
      is_variant: false,
      is_draft: false,
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
      select_attr1: 0,
      select_attr2: 0,

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

      variants: []

    }
  },
  computed: {
    ...mapGetters(['mediaStorage']),
    ...mapGetters('admin', ['publicKey']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['allCategories', 'allTaxRules', 'allAttributes',
      'allBrands', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  methods: {
    doDraft() {
      this.is_draft = true;
      this.result.is_draft = true;
      this.result.status = 'draft'
      // if (this.result.storage_temperature === 0) {
      //   this.result.storage_temperature = null
      // }
      // if (this.result.brand_id === 0) {
      //   this.result.brand_id = null
      // }
      // if (this.result.barcode_type === 0) {
      //   this.result.barcode_type = null
      // }
      // if (this.result.unit_id === 0) {
      //   this.result.unit_id = null
      // }
      // if (this.validationKeysIfIsDraft.findIndex((i) => {
      //   return (!this.result[i])
      // }) > -1) {
      //   this.hasError = true
      //   return false
      // }
      this.checkForm()

    },
    async checkForm() {

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        // delete this.result.created_at
        // delete this.result.updated_at
        const data = await this.setById({
          id: this.id,
          params: {result: this.result, variants: this.variants},
          api: this.setApi
        })
        // const data = await this.setById({id: this.id, params: {result: this.result, variants: this.variants}, api: this.setApi})
        console.log(data)
        // if (data) {
        //
        //   this.result = Object.assign({}, data)
        //   // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/' + this.result.id}`})
        //   this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/'}`})
        // }
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.formSubmitting = false
    },
    addAdditionalDetailsRows(index) {
      this.result.additional_details_row.push(Object.assign({}, this.additional_details))
    },


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
      this.checkForm()
    },
    variantName(name) {
      return name[this.currentLanguage?.code] + ' - ' + this.result.product_variants[this.openTab].color_name + ',' + this.result.product_variants[this.openTab].value;
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
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    toggleTabs: function (tab) {
      this.openTab = tab
    },
    uploadModalToggle() {
      this.uploadModal = !this.uploadModal
    },

    addPriceingRows() {
      try {
        this.result.product_prices.push(Object.assign({}, this.product_price))
      } catch (e) {
        console.log(e);
      }
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
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
    compareMethods() {
      if (this.min_qty === this.result.available_quantity) {
        this.result.is_availability = 1;
      } else if (this.min_qty > this.result.available_quantity) {
        this.result.is_availability = 0;
      } else {
        this.result.is_availability = 1;
      }

    },
    availableQuantity() {
      // const ava_qty = this.result.available_quantity;
      this.compareMethods()
    },
    saveAttachment(images) {
      this.variants[this.openTab].result.product_images = images
    },
    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapGetters('language', ['langCode', 'currentLanguage', 'languages']),
  },
  async mounted() {
    this.result.product_variants.forEach((variant) => {
      this.variants.push(Object.assign({result: this.result}));
    });
    if (!this.allCategories || !this.allTaxRules || !this.allAttributes ||
      !this.allBrands || !this.allProductCollections || !this.allBundleDeals || !this.allShippingRules || !this.allColors || !this.allBarcodes || !this.allPackagingUnits || !this.allPackagingBoxUnits || !this.allWeightUnits || !this.allCountries || !this.allStorageTemperatures || !this.allTransportationModes || !this.allWarehouses) {

      this.loading = true
      try {
        await this.getDropdownList()
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.loading = false
    }
  }

}
</script>
