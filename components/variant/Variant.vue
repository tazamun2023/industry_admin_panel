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
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
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
                                                 alt=""> <span class="pt-2">{{ $t('prod.Parent view') }}</span></span>
                </a>
              </li>
              <li class="-mb-px w-100  mr-2 last:mr-0 cursor-pointer"
                  v-for="(colorItem, index) in result.product_variants" :key="index">
                <a class="text-xs flex justify-between w-100 font-bold uppercase px-5 py-3 leading-normal"
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
                  <p v-for="(variantStatus, index1) in variants" v-if="index1===index">
                    <span class="bg-warning rounded-lg text-xs mt-2 p-1 text-white" v-if="variantStatus.result.id">{{ $t('prod.Pending') }}</span>
                    <span class="bg-smooth rounded-lg text-xs mt-2 p-1" v-if="!variantStatus.result.id">{{ $t('prod.Incomplete') }}</span>
                  </p>

                </a>
              </li>
            </ul>
          </div>
          <div class="col-span-3">
            <div class="p-4">
              <div class="flex justify-between" >
                <h4>{{ $t('prod.Basic information') }}</h4>
                <p
                  v-if="is_edit"
                  class="cursor-pointer underline font-bold text-disabled"
                  style="cursor: not-allowed"
                   >
                  {{ $t('prod.Edit Category') }}
                </p>
                <p
                  v-else
                  class="cursor-pointer underline font-bold"
                  @click="CategorySection = !CategorySection"
                   >
                  {{ $t('prod.Edit Category') }}
                </p>
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
                    <label for="">{{ $t('prod.parent_sku') }}</label>
                    <input type="text" v-model="result.parent_sku" :placeholder="$t('prod.sku')"
                           class="cursor-not-allowed" disabled>
                  </div>
                  <lang-input v-if="openTab === 'parent'" :hasError="hasError" type="text" :title="$t('prod.name')"
                              :valuesOfLang="result.title" :isVariant="openTab !== 'parent'"
                              @updateInput="updateInput"></lang-input>
                  <div class="input-wrapper mb-4" v-else>
                    <label for="">{{ $t('prod.name') }}</label>
                    <input type="text" :placeholder="variantName(variants[openTab].result.title)" class="cursor-not-allowed" disabled>
                  </div>
                  <div class="input-wrapper mt-3 mt-sm-0">
                    <label class="w-full">{{ $t('prod.Select Brand') }} <strong class="text-error">*</strong></label>
                  <select class="form-control w-full rounded border border-smooth p-3" :disabled="openTab !== 'parent'"
                          :readonly="openTab !== 'parent'"
                          :class="{invalid: !is_draft && (result.brand_id == 0 || result.brand_id===null) && hasError}"
                          v-model="result.brand_id">
                    <option value="0">Select Brand</option>
                    <option v-for="(item, index) in allBrands" :key="index" :value="index">{{ item.title }}</option>
                  </select>
                  </div>
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
    <div v-bind:class="{'hidden': openTab !== 'parent', 'block': openTab === 'parent'}" v-if="variants.length > 0 && variants[0].result.status!=='incomplete'">
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Attributes table') }}</h4>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left border-smooth rtl:text-right text-gray-500" >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-16 py-3 border border-smooth">{{ $t('prod.Image') }}</th>
              <th scope="col" class="px-6 py-3 border border-smooth">{{ $t('prod.Attribute') }}</th>
              <th scope="col" class="px-6 py-3 border border-smooth">{{ $t('prod.Status') }}</th>
              <th scope="col" class="px-6 py-3 border border-smooth">{{ $t('prod.Visibility') }}</th>
              <th scope="col" class="px-6 py-3 border border-smooth">{{ $t('prod.Stock') }}</th>
              <th scope="col" class="px-6 py-3 border border-smooth">{{ $t('prod.SKU') }}</th>
              <th scope="col" class="px-6 py-3 border border-smooth" style="width: 35%">{{ $t('prod.Unit Price') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white hover:bg-gray-50 " v-for="(variant, index) in variants" :key="index" v-if="variant.result.status!=='incomplete'">
              <td class="p-4 border border-smooth">
                <lazy-image
                  v-if="variant.result?.product_images"
                  class="mr-20 w-10 md:w-10 max-w-full max-h-full"
                  :data-src="variant.result.product_images[0]?.url"
                  :alt="variant.result?.product_variant?.color?.name?.en"
                />
              </td>
              <td class="px-6 font-semibold text-gray-900">
                {{ variant.result?.product_variant?.color?.name?.en + ',' + variant.result?.product_variant?.value }}
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <span class="bg-primary rounded-lg text-xs mt-2 p-1 text-white" v-if="variant.result.status==='approval'">{{ variant.result.status }}</span>
                <span class="bg-warning rounded-lg text-xs mt-2 p-1 text-white" v-if="variant.result.status==='pending'">{{ variant.result.status }}</span>
                <span class="bg-error rounded-lg text-xs mt-2 p-1 text-white" v-if="variant.result.status==='cancel'">{{ variant.result.status }}</span>
                <span class="bg-error rounded-lg text-xs mt-2 p-1 text-white" v-if="variant.result.status==='rejected'">{{ variant.result.status }}</span>
                <span class="bg-smoothlight rounded-lg text-xs mt-2 p-1 text-white" v-if="variant.result.status==='archived'">{{ variant.result.status }}</span>
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <span v-if="variant.result.is_buy_now">{{ $t('prod.Online') }}</span>
                <span v-else>{{ $t('prod.Offline') }}</span>
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <select class="uppercase" v-model="variant.result.is_availability">
                  <option value="1">{{ $t('prod.In Stock') }}</option>
                  <option value="0">{{ $t('prod.Out of Stock') }}</option>
                </select>
              </td>

              <td class="px-6 border border-smooth">
                {{ variant.result.sku }}
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <!-- <div class="flex justify-between">
                  <div> </div>
                  <div>{{ $t('prod.Price') }}</div>
                  <div>{{ $t('prod.Sale price') }}</div>
                </div> -->

                <div class="flex justify-between gap-4" v-for="(product_price, index) in variant.result.product_prices" :key="index">
                  <div class="w-full p-2">
                    <div class="flex w-full justify-between">
                        <span>{{ $t('prod.Min Qty') }}</span>
                        <img class="w-4 h-4 cursor-pointer" src="~/assets/icon/edit-g.svg" alt="">
                    </div>
                    {{product_price.quantity}}
                  </div>
                  <div  class="w-full p-2 border-l border-r border-smooth">
                    <div class="flex w-full justify-between">
                        <span>{{ $t('prod.Price') }}</span>
                        <img class="w-4 h-4 cursor-pointer" src="~/assets/icon/edit-g.svg" alt="">
                    </div>
                    {{ product_price.unit_price }}
                  </div>

                  <div  class="w-full p-2">
                    <div class="flex w-full justify-between">
                        <span>{{ $t('prod.Sale price') }}</span>
                        <img class="w-4 h-4 cursor-pointer" src="~/assets/icon/edit-g.svg" alt="">
                    </div>
                    {{ product_price.selling_price }}
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
      <!-- --------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
    </div>

    <div class="tab-sidebar p-3" v-if="openTab === 'parent'">
      <div class="flex justify-end gap-4 pt-3">
        <button type="button" class="btn text-white bg-primary w-1/4 hover:text-primary" @click.prevent="doSubmit">
          {{ $t('prod.Send for review') }}
        </button>
      </div>
    </div>
    <!-- ------------------------ -->
    <div :class="openTab !== 'parent' ? 'block':'hidden'">
      <ValidationObserver class="w-full" v-slot="{ handleSubmit }" v-if="openTab !== 'parent'">
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
                  <option value="0">{{ $t('prod.Select attribute 2') }}</option>
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

            <lang-input-multi :hasError="hasError" type="text" :title="$t('prod.key_features')"
                              :valuesOfLang="variants[openTab]?.result.features"
                              @updateInput="updateInput"></lang-input-multi>
          </div>

          <div class="input-wrapper mb-10">
            <label for="">{{ $t('prod.Keywords - English') }} ?</label>
            <v-select
              :dir="$t('app.dir')"
              v-model="variants[openTab]?.result.basic_keyword_en"
              :options="['']"
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
              v-model="variants[openTab]?.result.basic_keyword_ar"
              :options="['']"
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
      <div class="tab-sidebar p-3" v-if="openTab !== 'parent'">
        <lang-input v-if="!is_variant" :hasError="hasError" type="textarea" :title="$t('prod.desc')"
                    :valuesOfLang="variants[openTab]?.result.description"
                    @updateInput="updateInput"></lang-input>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <vue-upload-images :old_images="oldImages" :max-files="5" @updateInput="saveAttachment">></vue-upload-images>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <div class="tab-sidebar p-3" v-if="openTab !== 'parent'">
        <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Product Identifiers') }}</h4>
        <p class="text-sm">
          {{ $t('prod.Enter barcode type and number for improved search/visibility of your product') }}.</p>
        <div class="grid grid-cols-2 gap-4">
          <ValidationProvider name="barcode_type" :rules="NotDraftValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode type')}) }">
          <div class="input-wrapper mt-3 mt-sm-0">
            <label class="w-full">{{ $t('prod.Barcode type') }}</label>
            <select class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                    v-model="variants[openTab]?.result.barcode_type">
              <option value="">{{ $t('prod.Barcode type') }}</option>
              <option :value="index" v-for="(item, index) in allBarcodes" :key="index">{{ item.name }}</option>
            </select>
          </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider name="barcode" :rules="BarcodeValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode')}) }">
          <div class="form-group input-wrapper mt-3 mt-sm-0">
            <label>{{ $t('prod.Barcode') }}</label>
            <input
              type="text" class="form-control"
              v-model="variants[openTab]?.result.barcode"
              :placeholder="$t('prod.Barcode')"
              @keypress="onlyNumber"
              :disabled="variants[openTab]?.result.barcode_type==4"
              :class="{ 'has-error': errors[0], 'cursor-not-allowed': variants[openTab].result.barcode_type == 4 }"
            >
          </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider name="sku" :rules="skuRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.SKU')}) }">
          <div class="form-group input-wrapper  mt-3 mt-sm-0">
            <label>{{ $t('prod.SKU') }}</label>
            <input
              type="text" class="form-control"
              :class="{ 'has-error': errors[0] }"
              v-model="variants[openTab]?.result.sku"
              :placeholder="$t('prod.SKU')"
            >
          </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
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
        <ValidationProvider name="available_quantity" :rules="availableQuantityValidationRules"
                            v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('prod.Available quantity')}) }">
        <div class="input-wrapper" v-if="openTab !== 'parent'">
          <label for="">{{ $t('prod.Available quantity') }} ?</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'has-error': errors[0] }"
            v-model="variants[openTab]?.result.available_quantity"
            @keypress="onlyNumber"
            @input="availableQuantity">
          <label>{{ $t('prod.Minimum order quantity') }}: {{ variants[openTab]?.result.product_prices[0]?.quantity }}</label>
        </div>
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="my-10"></div>
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
        <div class="grid grid-cols-2 gap-4">
          <ValidationProvider name="pk_size" :rules="NotDraftValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Size')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Size') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input
                type="text"
                class="form-control pr-12"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Size')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pk_size"
              >
              <div class="absolute right-0 top-0">
                <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                        v-model="variants[openTab]?.result.pk_size_unit"
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
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider name="pk_number_of_carton" :rules="NotDraftValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Number of units per carton')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Number of units per carton') }}</label>
            <div class=" mb-3">
              <input
                type="text"
                class="form-control"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Number of units per carton')"
                @keypress="onlyNumber" v-model="variants[openTab]?.result.pk_number_of_carton">
            </div>
          </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider name="average lead time" :rules="AverageLeadValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Average lead time(Days)')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label>
            <div class=" mb-3">
              <input
                type="text"
                class="form-control"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Average lead time(Days)')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pk_average_lead_time">
            </div>
          </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Transportation Mode') }}</label>
            <div class="mb-3">
              <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                      v-model="variants[openTab]?.result.pk_transportation_mode"
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
          {{ $t("prod.Enter the dimensions and weight of the carton to help calculate shipping rate These measurements are for the products shipping container") }}.</p>
        <div class="grid grid-cols-2 gap-4">
          <ValidationProvider name="carton weight" :rules="CartonDimensionValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Weight')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Weight') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
<!--              <input type="text" class="form-control pr-12" placeholder="Carton Weight"-->
<!--                     aria-label="Recipient's username"-->
<!--                     @keypress="onlyNumber"-->
<!--                     :class="{invalid: !is_draft && (result.pc_weight===null) && hasError}"-->
<!--                     aria-describedby="button-addon2" v-model="result.pc_weight">-->
              <input
                type="text"
                class="form-control pr-12"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Weight')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pc_weight">
              <div class="absolute right-0 top-0">
                <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                        v-model="variants[openTab]?.result.pc_weight_unit_id">
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
            <label for="">{{ $t('prod.Length') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
<!--              <input type="text" class="form-control pr-12" placeholder="Carton Length"-->
<!--                     aria-label="Recipient's username"-->
<!--                     @keypress="onlyNumber"-->
<!--                     :class="{invalid: !is_draft && (result.pc_length===null) && hasError}"-->
<!--                     aria-describedby="button-addon2" v-model="result.pc_length">-->
              <input
                type="text"
                class="form-control pr-12"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Length')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pc_length">
              <div class="absolute right-0 top-0">
                <select
                  class="p-2 m-1 float-right border-l border-smooth uppercase"
                        v-model="variants[openTab]?.result.pc_length_unit_id">
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
            <label for="">{{ $t('prod.Height') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
<!--              <input type="text" class="form-control pr-12" placeholder="Carton Height"-->
<!--                     aria-label="Recipient's username"-->
<!--                     @keypress="onlyNumber"-->
<!--                     :class="{invalid: !is_draft && (result.pc_height===null) && hasError}"-->
<!--                     aria-describedby="button-addon2" v-model="result.pc_height">-->
              <input
                type="text" class="form-control pr-12"
                :class="{ 'has-error': errors[0] }"
                placeholder="Carton Height"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pc_height">
              <div class="absolute right-0 top-0">
                <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                        v-model="variants[openTab]?.result.pc_height_unit_id">
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
            <label for="">{{ $t('prod.Width') }} ?</label>
            <div class="relative flex input-group gap-4 mb-3">
<!--              <input type="text" class="form-control pr-12" placeholder="Carton Width"-->
<!--                     aria-label="Recipient's username"-->
<!--                     @keypress="onlyNumber"-->
<!--                     :class="{invalid: !is_draft && (result.pc_width===null) && hasError}"-->
<!--                     aria-describedby="button-addon2" v-model="result.pc_width">-->
              <input
                type="text"
                class="form-control pr-12"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Width')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pc_width">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                        v-model="variants[openTab]?.result.pc_width_unit_id">
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

      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
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
                v-model="variants[openTab]?.result.pdime_weight"
              >

              <div class="absolute right-0 top-0">
                <select
                  class="p-2 m-1 float-right border-l border-smooth uppercase"
                  v-model="variants[openTab]?.result.pdime_weight_unit_id"
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
            <label for="">{{ $t('prod.Length') }} ?</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Length')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pdime_length">
            </div>
            <span class="error">{{ errors[0] }}</span>
          </div>
          </ValidationProvider>
          <ValidationProvider name="product dimention height" :rules="ProductDimensionValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Height') }} ?</label>
            <div class="input-group mb-3">
<!--              <input type="text" class="form-control" placeholder="Enter Height" aria-label="Recipient's username"-->
<!--                     :class="{invalid: !is_draft && (result.pdime_height === null) && hasError}"-->
<!--                     @keypress="onlyNumber"-->
<!--                     aria-describedby="button-addon2" v-model="result.pdime_height">-->
              <input
                type="text"
                class="form-control"
                :class="{ 'has-error': errors[0] }"
                :placeholder="$t('prod.Height')"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pdime_height">
            </div>
            <span class="error">{{ errors[0] }}</span>
          </div>
          </ValidationProvider>
          <ValidationProvider name="product dimention width" :rules="ProductDimensionValidationRules" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Width') }} ?</label>
            <div class="input-group mb-3">
<!--              <input type="text" class="form-control" placeholder="Enter Width" aria-label="Recipient's username"-->
<!--                     :class="{invalid: !is_draft && (result.pdime_width===null) && hasError}"-->
<!--                     @keypress="onlyNumber"-->
<!--                     aria-describedby="button-addon2" v-model="result.pdime_width">-->
              <input
                type="text"
                class="form-control"
                :placeholder="$t('prod.Width')"
                :class="{ 'has-error': errors[0] }"
                @keypress="onlyNumber"
                v-model="variants[openTab]?.result.pdime_width"
              >
            </div>
            <span class="error">{{ errors[0] }}</span>
          </div>
          </ValidationProvider>
          <div class="input-wrapper">
            <label for="">{{ $t('prod.Dimension Unit') }}</label>
            <select
              class="border p-3 w-full border-smooth rounded-lg uppercase"
              v-model="variants[openTab]?.result.pdime_dimention_unit">
              <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{ item.name }}</option>
            </select>
          </div>
        </div>

      </div>
      <!-- ----------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3" v-if="openTab !== 'parent'">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Pricing') }}</h4>
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Unit of measure') }} ?</label>
          <div class="input-group mb-3">
<!--            <select -->
<!--              class="border p-3 w-50 border-smooth rounded-lg uppercase"-->
<!--                    disabled-->
<!--                    :class="{invalid: !is_draft && result.unit_id === 0  && hasError}"-->
<!--                    v-model="variants[openTab].result.unit_id">-->
<!--              <option value="0">{{ $t('prod.Unit') }}</option>-->
<!--              <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{ item.name }}</option>-->
<!--            </select>-->
            <select class="border p-3 border-smooth rounded-lg uppercase"
                    v-model="variants[openTab]?.result.unit_id">
              <option value="">{{ $t('prod.Unit') }}</option>
              <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{
                  item.name
                }}
              </option>
            </select>
          </div>
        </div>
        <p><span class="fw-bold">{{ $t('prod.Price list') }}</span> {{ $t('prod.KSA Market(GULF) - SAR') }}</p>
        <p>
          {{ $t('prod.Add pricing to your product You can also create bulk pricing rules to offer price discounts based on quantity breaks') }}</p>
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
                <ValidationProvider name="quantity" :rules="PriceValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Minimum order quantity')}) }">
<!--                <input-->
<!--                  type="text"-->
<!--                  class="form-control"-->
<!--                  placeholder="Enter Quantity"-->
<!--                  @keypress="onlyNumber"-->
<!--                  v-model="product_price.quantity"-->
<!--                  @input="stockCheck(index)"-->
<!--                  :class="{invalid: hasErrorQty}"-->
<!--                >-->
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
                <ValidationProvider name="unit price" :rules="PriceValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Unit price')}) }">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">SAR</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
                         @keypress="onlyNumber"
                         v-model="product_price.unit_price">
                </div>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </td>
              <td class="p-2">
                <ValidationProvider name="selling price" :rules="PriceValidationRules" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.Sale price')}) }">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">SAR</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
                         @keypress="onlyNumber"
                         v-model="product_price.selling_price">
                </div>
                  <span class="error" v-if="checkPricing===index">{{ $t('prod.Selling price must be less then unit price') }}</span>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
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
          <button v-if="variants[openTab]?.result.product_prices.length <= 2" class="btn btn-link fw-bold"
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
              <select class="border p-3 w-full border-smooth rounded-lg uppercase" v-model="variants[openTab]?.result.is_ready_to_ship"
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
                      v-model="variants[openTab]?.result.is_buy_now">
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
                      v-model="variants[openTab]?.result.is_availability">
                <option value="1">{{ $t('prod.In Stock') }}</option>
                <option value="0">{{ $t('prod.Out of Stock') }}</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <ValidationProvider name="storage temperature" :rules="NotDraftValidationRules" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Storage temperature')}) }">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Storage temperature') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg"
                      v-model="variants[openTab]?.result.storage_temperature">
                <option value="" disabled>{{ $t('prod.Select Option') }}</option>
                <option v-for="(item, index) in allStorageTemperatures" :key="index" :value="index">{{ item.name }}
                </option>
              </select>
              <span class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Ware House') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg" v-model="variants[openTab]?.result.stock_location">
                <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{ item.name }}</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Country of origin') }}</label>
              <select class="border p-3 w-full border-smooth rounded-lg" v-model="variants[openTab]?.result.country_of_origin">
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
                      v-model="variants[openTab]?.result.is_dangerous">
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
          <input class="form-control" name="e.g. Macbook Pro 2019" type="text" v-model="variants[openTab]?.result.hts_code">
        </div>
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Additional attributes') }} <span
          class="text-xs">(optional)</span>
        </h4>
        <div class="input-wrapper">

          <div class="flex append-input pt-1" v-for="(item, index) in variants[openTab]?.result.additional_details_row" :key="index">
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
                    v-if="index+1==variants[openTab]?.result.additional_details_row.length"
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
            <button type="button" class="btn bg-primary text-white border-secondary" @click.prevent="handleSubmit(doSubmitSingle(variants[openTab]?.result.id))">
              {{ $t('prod.Send for review') }}
            </button>
          </div>
        </div>
      </div>
      </ValidationObserver>
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
<!--                <div class="col-md-4 pt-4">-->
<!--                  <button type="submit" class="btn mb-10 w-100 btn-outline-secondary">-->
<!--                    Add Row-->
<!--                  </button>-->
<!--                </div>-->
              </div>
              <hr class="border-smooth mb-2.5">
              <div class="grid grid-cols-3 gap-4"
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

                <div v-if="variant.product_id">
                  <p> {{ variant.color_name}}, {{ variant.value}} </p>
                </div>
                <div v-else class="col-md-4" @click.prevent="removeVariantRows(index)">
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
                <button type="button" class="btn text-white bg-primary hover:text-primary"
                        @click.prevent="doVariantSave"
                        v-if="!is_variant_save">
                  {{ $t('prod.Save') }}
                </button>

                <button type="button" class="btn text-white bg-primary hover:text-primary"
                        @click.prevent="doVariantSave"
                        v-else>
                  {{ $t('prod.Edit') }}
                </button>
                <button type="button" class="btn  border-secondary" @click.prevent="doVariantSave"
                        v-if="!is_variant_save" :class="result[openTab]?.product_variants.length===0?'cursor-not-allowed':''">
                  <span>{{ $t('prod.CANCEL') }}</span>
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
<!--              <div class="flex justify-end gap-4 pt-3">-->
<!--                <button type="submit" class="btn text-white bg-primary">-->
<!--                  SAVE-->
<!--                </button>-->

<!--                <button @click="varientModal = false" class="btn bg-light">-->
<!--                  <span>CANCEL</span>-->
<!--                </button>-->
<!--              </div>-->
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
import {extend, validate, ValidationObserver, ValidationProvider} from 'vee-validate';
import VueUploadImages from "@/components/product/uploadImages.vue";
import ShippingDetailsSection from "@/components/product/ShippingDetailsSection.vue";
import CartonDimensionSection from "@/components/product/CartonDimensionSection.vue";
import PackagingSection from "@/components/product/PackagingSection.vue";
import BasicInformationChild from "@/components/product/BasicInformationChild.vue";
import ProductSearch2 from "@/components/partials/ProductSearch2.vue";
import ProductSearch from "@/components/partials/ProductSearch.vue";
import VideoInput from "@/components/VideoInput.vue";
import ImageInput from "@/components/ImageInput.vue";
import DataPage from "@/components/partials/DataPage.vue";
import Dropdown from "@/components/Dropdown.vue";
import WYSIWYGEditor from "@/components/WYSIWYGEditor.vue";
import ProductImages from "@/components/partials/ProductImages.vue";
import FileUpload from "@/components/FileUpload.vue";
import VideoUpload from "@/components/VideoUpload.vue";
import TagSearch from "@/components/TagSearch.vue";
import AjaxButton from "@/components/AjaxButton.vue";
import ProductInventory from "@/components/partials/ProductInventory.vue";
import ErrorFormatter from "@/components/ErrorFormatter.vue";
import Spinner from "@/components/Spinner.vue";
import LangInput from "@/components/langInput.vue";
import th from "vue2-datepicker/locale/es/th";
import id from "vue2-datepicker/locale/es/id";

extend('uniqueSku', {
  validate: (value, {allSKus}) => {
    // Check if the provided SKU value already exists in allSKus
    return !Object.values(allSKus).find(item => item.sku === value);
  },
  params: ['allSKus'], // Define the parameter name as allSKus
  message: 'SKU must be unique'
});
export default {
  name: "Variant",
  inject: [],
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
    ValidationProvider,
    ValidationObserver
  },
  props: {
    result: Object,
    variantsData: Object,
    selectedLevel1: Object,
    selectedLevel2: Object,
    selectedLevel3: Object,
    select_attr1: String,
    select_attr2: String,
    is_edit: {
      type: Boolean,
      default: false
    },
    variant_uu_id: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      is_submit:[],
      injectedData: this.exampleData,
      openTab: 'parent',
      uploadModal: false,
      hasErrorQty: false,
      varientModal: false,
      is_variant_save: false,
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
      hasError: false,
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

      variants: [],

    }
  },
  computed: {

    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
    isAdding() {
      return isNaN(this.$route?.params?.id)
    },

    AverageLeadValidationRules() {
      return {
        required: true,
        min_value: 1,
        max_value: 99
      };
    },
    NotDraftValidationRules() {
      return {
        required: true
      };
    },
    availableQuantityValidationRules() {
      return {
        required: true,
        min_value: 1
      };
    },
    skuRules() {
      const allSKus = this.allSKus;
      return {
        required: true,
        uniqueSku: {allSKus}, // Pass allSKus as a parameter to uniqueSku
        min: 2,
        max: 32
      };

    },
    checkPricing() {
      if (this.openTab !== 'parent'){
        const allPrices = this.variants[this.openTab]?.result.product_prices;
        if (allPrices[0]?.unit_price && allPrices[0]?.selling_price){
          for (let i = 0; i < allPrices.length; i++) {
            const unitPrice = parseInt(allPrices[i]?.unit_price);
            const sellingPrice = parseInt(allPrices[i]?.selling_price);

            if (unitPrice > sellingPrice) {
              continue; // If any unit price is greater than selling price, return false immediately
            } else {
              return i
            }
          }
        }
        return false;
      }

      // If all unit prices are less than or equal to selling prices, return true
    },
    PriceValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1, // Pass allSKus as a parameter to uniqueSku
        max_value: 99999999, // Pass allSKus as a parameter to uniqueSku
      };

    },
    ProductDimensionValidationRules() {
      return {
        required: true,
        min_value: 1,
        max_value: 99999999
      };
    },
    CartonDimensionValidationRules() {
      return {
        required: true,
        min_value: 1,
        max_value: 99999999
      };
    },

    BarcodeValidationRules() {
      if (this.openTab !== 'parent'){
        let validationRules = {
          required: this.variants[this.openTab]?.result?.barcode_type !== 4
        };

        const barcodeLength = this.variants[this.openTab]?.result?.barcode?.length || 0;

        switch (this.variants[this.openTab]?.result?.barcode_type) {
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
      }
    },

    ...mapGetters(['mediaStorage']),
    ...mapGetters('admin', ['publicKey']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['allCategories', 'allTaxRules', 'allAttributes', 'allSKus',
      'allBrands', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  methods: {
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
    doNext() {
      // if (this.validationKeysIfVariantNext.findIndex((i) => {
      //   return (!this.result[i])
      // }) > -1) {
      //   this.hasError = true
      //   return false
      // }
      this.is_next = true

    },
    addVariantValueRows() {
      this.result.product_variants.push(Object.assign({}, this.product_variant))
    },
    setColorName(index, event) {
      this.result.product_variants[index].color_name = this.allColors[event.target.value].name
    },
    removeVariantRows(index) {
      console.log(index)
      if (index != 0) {
        this.result.product_variants.splice(index, 1);

      }
    },
    doVariantSave() {
      if (this.result.product_variants.length === 0) {
        this.setToastMessage(this.$t('prod.No variants added'))
        // this.$swal({
        //   icon: "error",
        //   title: "No variants added!",
        //   showConfirmButton: false,
        //   timer: 1000
        // });
        return false;
      }else {
        this.is_variant_save = !this.is_variant_save
        this.varientModal = false
        this.variants[0].result.sku = ''
        this.variants[0].result.status = 'incomplete'
        this.variants[0].result.is_variant = true
        this.variants.push({ result: { ...this.variants[0].result, id: '' } });
      }
    },

    async checkForm() {

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        // delete this.result.created_at
        // delete this.result.updated_at
        const data = await this.setById({
          id: this.id,
          params: {result: this.variants[this.openTab].result, variants: this.variants},
          api: this.setApi
        })


        // const data = await this.setById({id: this.id, params: {result: this.result, variants: this.variants}, api: this.setApi})
        // console.log(data)
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
    removeAdditionalDetailsRows(index) {
      // console.log(index)
      if (index != 0) {
        this.variants[this.openTab]?.result.additional_details_row.splice(index, 1);
      }
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

    async doSubmitSingle(id) {
      if (!id) {
        id = ''; // Set id to an empty string
        this.variants[this.openTab].result.variant_uu_id = this.variant_uu_id
      } else {
        id = id ? id : this.variants[this.openTab]?.result?.id; // If id is provided, use it, otherwise use this.variants[this.openTab].result.id
      }
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
      this.variants[this.openTab].result.status = 'pending'
      this.variants[this.openTab].result.variant_uu_id = this.variants[0]?.result.variant_uu_id
      // this.checkForm()

      const res = await this.setById({
        id: id,
        params: {result: this.variants[this.openTab].result, variant: this.result.product_variants[this.openTab], single_submit: true},
        api: this.setApi
      })

      if (res) {
        // Initialize this.variants[this.openTab] if it doesn't exist
        if (!this.variants[this.openTab]) {
          this.variants[this.openTab] = {};
        }

        // Initialize this.variants[this.openTab].result if it doesn't exist
        if (!this.variants[this.openTab].result) {
          this.variants[this.openTab].result = {};
        }

        // Assign properties from res to this.variants[this.openTab].result
        this.variants[this.openTab].result = {
          title: res.title,
          variant_uu_id: res.variant_uu_id,
          description: res.description,
          parentCategory: res.category?.id,
          subCategory: res.sub_category?.id,
          childCategory: res.child_category?.id,
          product_prices: res.product_prices,
          unit_id: res.unit_id,
          features: res.product_features?.map(item => item.name),
          unit: res.unit,
          brand_id: res.brand_id,
          meta_title: res.meta_title,
          meta_description: res.meta_description,
          selling: res.selling,
          purchased: res.selling, // Should this be res.purchased?
          offered: res.offered,
          images: res.images,
          product_images: res.product_images,
          video: res.video,
          status: res.status,
          parent_sku: res.parent_sku,
          basic_keyword_en: res.basic_keyword_en,
          basic_keyword_ar: res.basic_keyword_ar,
          basicInfoAr: res.title,
          basicInfoEng: res.title,
          barcode_type: res.barcode_id,
          barcode: res.barcode_number,
          sku: res.sku,
          available_quantity: res.available_quantity,
          pk_size: res.packaging?.size,
          pk_size_unit: res.packaging?.size_unit,
          pk_number_of_carton: res.packaging?.number_of_carton,
          pk_average_lead_time: res.packaging?.average_lead_time,
          pk_transportation_mode: res.packaging?.transportation_mode,
          pc_weight: res.product_carton?.weight,
          pc_weight_unit_id: res.product_carton?.weight_unit_id,
          pc_height: res.product_carton?.height,
          pc_height_unit_id: res.product_carton?.height_unit_id,
          pc_length: res.product_carton?.length,
          pc_length_unit_id: res.product_carton?.length_unit_id,
          pc_width: res.product_carton?.width,
          pc_width_unit_id: res.product_carton?.width_unit_id,
          pdime_weight: res.product_dimension?.weight,
          pdime_weight_unit_id: res.product_dimension?.weight_unit_id,
          pdime_height: res.product_dimension?.height,
          pdime_length: res.product_dimension?.length,
          pdime_width: res.product_dimension?.width,
          pdime_dimention_unit: res.product_dimension?.dimention_unit,
          pp_quantity: res.product_prices?.map(price => price.quantity),
          pp_unit_price: res.product_prices?.map(price => price.unit_price),
          pp_selling_price: res.product_prices?.map(price => price.selling_price),
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
          is_variant: !!res.product_variant,
          additional_details_row: res.additional_attribute?.map(item => ({ name: item.name, value: item.value })),
          hts_code: res.hts_code,
          id: res.id,
        };
        this.openTab = 'parent'
      }

      this.is_submit.push({
        tab: this.openTab
      });



    },
    variantName(name) {
      if (this.is_edit){
        return name[this.currentLanguage?.code]
      }else {
        return name[this.currentLanguage?.code] + ' - ' + this.result.product_variants[this.openTab].color_name + ',' + this.result.product_variants[this.openTab].value;
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
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    toggleTabs: function (tab) {
      // console.log(tab)
      this.openTab = tab
      // console.log(this.result)
    },
    uploadModalToggle() {
      this.uploadModal = !this.uploadModal
    },

    addPriceingRows() {
      try {
        if (this.openTab!=='parent'){
          // this.result.product_prices.push(Object.assign({}, this.product_price))
          this.variants[this.openTab].result.product_prices.push(Object.assign({}, this.product_price))
        }
      } catch (e) {
        console.log(e);
      }
    },
    removePriceingRows(index) {
      if (index != 0) {
        // this.result.product_prices.push(Object.assign({}, this.product_price))
        if (this.openTab!=='parent'){
          // this.result.product_prices.splice(index, 1);
          this.variants[this.openTab].result.product_prices.splice(index, 1);
        }

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
      let ava_qty = parseInt(this.variants[this.openTab].result.available_quantity);
      let product_prices_min_qty = parseInt(this.variants[this.openTab].result.product_prices[0]?.quantity);

      if (!isNaN(ava_qty) && !isNaN(product_prices_min_qty)) {
        this.variants[this.openTab].result.is_availability = ava_qty >= product_prices_min_qty ? 1 : 0;
      }
    },
    availableQuantity() {
      this.compareMethods()
    },
    oldImages(){
      if (this.openTab!=='parent'){
        this.variants[this.openTab].result.product_images = this.variants[this.openTab].result.product_images??[]
      }else {
        this.variants[this.openTab].result.product_images = []
      }
    },
    saveAttachment(images) {
      if (this.openTab!=='parent'){
        this.variants[this.openTab].result.product_images = images
      }
    },
    areObjectsEqual(obj1, obj2) {
      // Check if the objects are equal using JSON.stringify
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    variantsChanged(newValue, oldValue) {
      if (this.openTab!=='parent'){
        // const new_value = newValue[this.openTab].result;
        // const old_value = oldValue[this.openTab].result;

        if (newValue !== oldValue) {
          alert('Value of result has changed');
          // Perform actions or fetch data here
        }
      }
    },


    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapGetters('language', ['langCode', 'currentLanguage', 'languages']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  },
  watch: {
    // variants: {
    //   handler: 'variantsChanged',
    //   deep: true // Enable deep watching
    // }
    'variants': {
      handler(newVal, oldVal) {
        if (this.openTab!=='parent') {

          if (newVal[this.openTab]?.result.length === oldVal[this.openTab]?.result.length) {

            for (let i = 0; i < Object.keys(newVal[this.openTab]?.result).length; i++) {
              // Compare each colorItem in the new data with the previous data
              if (JSON.stringify(newVal[this.openTab]?.result[i]) !== JSON.stringify(oldVal[this.openTab]?.result[i])) {
                console.log(`Change detected in product variant at index ${i}`);
                // You can perform any necessary actions here
              }
            }
          } else {
            console.log('Product variants data length changed');
            // Handle the case where the length of the data arrays is different
          }
        }
      },
      deep: true
    }
  },
  async mounted() {
    if (this.is_edit){
      this.variants = this.variantsData
    }else {
      this.result.product_variants.forEach((variant) => {
        this.variants.push(Object.assign({result: this.result}));
      });
    }

    if (!this.allCategories || !this.allTaxRules || !this.allAttributes ||
      !this.allBrands || !this.allProductCollections || !this.allBundleDeals || !this.allShippingRules || !this.allColors || !this.allBarcodes || !this.allPackagingUnits || !this.allWeightUnits || !this.allCountries || !this.allStorageTemperatures || !this.allTransportationModes || !this.allWarehouses) {

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

<style scoped>
.has-error {
  border: 1px solid red !important;
}
</style>
