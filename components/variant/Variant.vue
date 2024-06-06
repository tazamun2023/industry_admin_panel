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
              <button @click="openVariantModal"
                      class="border border-smooth p-2 gap-4 w-[200px] leading-3 flex ">
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5"/>
                </svg>
                <span class="pt-2 font-bold">{{ $t('prod.Add Variant') }}</span></button>
            </div>
            <!--            :class="{'bg-white border-white border-b-2': openTab !== 'parent', 'border-b-2 bg-primary border-primary text-white': openTab === parent}"-->
            <ul class="mb-0 list-none shadow mt-10" v-if="result.product_variants">
              <li class="-mb-px w-100 mr-2 last:mr-0 cursor-pointer">
                <a class="text-xs w-100 font-bold uppercase px-5 py-3 leading-normal"
                   @click="toggleTabs('parent')"
                   :class="openTab === 'parent'? 'border-b-2 bg-primary border-primary text-white':'bg-white border-white border-b-2'">
                  <span class="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" class="w-10 h-10 rounded"
                         viewBox="0 0 23 19" fill="none"><script xmlns=""/>
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.99023 2C4.99023 0.89543 5.88566 0 6.99023 0H16.9902C18.0948 0 18.9902 0.895431 18.9902 2V5C18.9902 6.10457 18.0948 7 16.9902 7H12.4902V9.25H16.9902C17.9567 9.25 18.7402 10.0335 18.7402 11V13H20.9902C22.0948 13 22.9902 13.8954 22.9902 15V17C22.9902 18.1046 22.0948 19 20.9902 19H14.9902C13.8857 19 12.9902 18.1046 12.9902 17V15C12.9902 13.8954 13.8857 13 14.9902 13H17.2402V11C17.2402 10.8619 17.1283 10.75 16.9902 10.75H6.99023C6.85216 10.75 6.74023 10.8619 6.74023 11V13H8.99023C10.0948 13 10.9902 13.8954 10.9902 15V17C10.9902 18.1046 10.0948 19 8.99023 19H2.99023C1.88566 19 0.990234 18.1046 0.990234 17V15C0.990234 13.8954 1.88566 13 2.99023 13H5.24023V11C5.24023 10.0335 6.02374 9.25 6.99023 9.25H10.9902V7H6.99023C5.88566 7 4.99023 6.10457 4.99023 5V2ZM6.99023 1.5H16.9902C17.2664 1.5 17.4902 1.72386 17.4902 2V5C17.4902 5.27614 17.2664 5.5 16.9902 5.5H6.99023C6.71409 5.5 6.49023 5.27614 6.49023 5V2C6.49023 1.72386 6.71409 1.5 6.99023 1.5ZM2.99023 14.5H8.99023C9.26638 14.5 9.49023 14.7239 9.49023 15V17C9.49023 17.2761 9.26638 17.5 8.99023 17.5H2.99023C2.71409 17.5 2.49023 17.2761 2.49023 17V15C2.49023 14.7239 2.71409 14.5 2.99023 14.5ZM20.9902 14.5H14.9902C14.7141 14.5 14.4902 14.7239 14.4902 15V17C14.4902 17.2761 14.7141 17.5 14.9902 17.5H20.9902C21.2664 17.5 21.4902 17.2761 21.4902 17V15C21.4902 14.7239 21.2664 14.5 20.9902 14.5Z"
                            fill="#404040"/>
                      <script xmlns=""/>
                    </svg>
                    <!--                    <img class="w-10 h-10 rounded"-->
                    <!--                                                 src="https://c8n.tradeling.com/web-catalog-pim/assets/svgs/parentImageIcon.svg"-->
                    <!--                                                 alt="">-->
                    <span class="pt-2">{{ $t('prod.Parent view') }}</span></span>
                </a>
              </li>
              <li class="-mb-px w-100  mr-2 last:mr-0 cursor-pointer"
                  v-for="(colorItem, index) in result.product_variants" :key="index">
                <a class="text-xs flex justify-between w-100 font-bold uppercase px-5 py-3 leading-normal"
                   @click="toggleTabs(index)"
                   :class="{'bg-white border-white border-b-t': openTab !== index, 'border-b-2 bg-primary border-primary text-white': openTab === index}">
                  <span class="flex gap-3">
<!--                    <img class="w-10 h-10 rounded"-->
                    <!--                         src="https://c8n.tradeling.com/web-catalog-pim/assets/svgs/noImageIcon.svg"-->
                    <!--                         alt="">-->
                    <lazy-image
                      v-if="variants[index]?.result.product_images"
                      class="w-10 h-10 rounded"
                      :lazy-src="variants[index]?.result?.product_images[0]?.url"
                      :data-src="variants[index]?.result?.product_images[0]?.url"
                      :alt="colorItem.color_name"
                    />


                           <span class="pt-2" v-if="colorItem.color_name && colorItem.value">{{ colorItem.color_name }}, {{
                               colorItem.value
                             }}
                           </span>
                    <span class="pt-2" v-else-if="colorItem.color_name">{{ colorItem.color_name }}</span>
                    <span class="pt-2" v-else-if="colorItem.value">{{ colorItem.value }}</span>
                    <span class="pt-2" v-else>{{ $t('prod.ERROR') }}</span>
                  </span>
                  <p v-for="(variantStatus, index1) in variants" v-if="index1===index">
                    <span class="bg-warning rounded-lg text-xs mt-2 p-1 text-white"
                          v-if="variantStatus.result.id && variantStatus.result.status === 'pending'">{{
                        $t('prod.Pending')
                      }}</span>
                    <span class="bg-warning rounded-lg text-xs mt-2 p-1 text-white"
                          v-if="variantStatus.result.id && variantStatus.result.status === 'archived'">{{
                        $t('prod.archived')
                      }}</span>
                    <span class="bg-primary rounded-lg text-xs mt-2 p-1 text-white"
                          v-if="variantStatus.result.id && variantStatus.result.status === 'approved'">{{
                        $t('prod.approved')
                      }}</span>
                    <span class="bg-error rounded-lg text-xs mt-2 p-1 text-white"
                          v-if="variantStatus.result.id && variantStatus.result.status === 'rejected'">{{
                        $t('prod.rejected')
                      }}</span>
                    <span class="bg-smooth rounded-lg text-xs mt-2 p-1"
                          v-if="!variantStatus.result.id">{{ $t('prod.Incomplete') }}</span>
                  </p>

                </a>
              </li>
            </ul>
          </div>
          <div class="col-span-3">
            <div class="p-4">
              <div class="flex justify-between">
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
                    <input type="text" :placeholder="variantNameWithAttr(variants[openTab].result.title)"
                           class="cursor-not-allowed" disabled>
                  </div>
                  <div class="input-wrapper mt-3 mt-sm-0">
                    <label class="w-full">{{ $t('prod.Brand') }} <strong class="text-error">*</strong></label>
                    <select class="form-control w-full rounded border border-smooth p-3"
                            :disabled="openTab !== 'parent'"
                            :readonly="openTab !== 'parent'"
                            :class="{invalid: !is_draft && (result.brand_id == 0 || result.brand_id===null) && hasError}"
                            v-model="result.brand_id">
                      <option value="0">{{ $t('prod.Brand') }}</option>
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
          <label class="w-full" for="name">{{ $t('prod.Unit of measure') }}</label>
          <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" v-model="result.unit_id">
            <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <!-- --------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
    </div>
    <div v-bind:class="{'hidden': openTab !== 'parent', 'block': openTab === 'parent'}"
         v-if="variants.length > 0 && variants[0].result.status!=='incomplete' && variants[0].result.status!=='draft'">
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Attributes table') }}</h4>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left border-smooth rtl:text-right text-gray-500">
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
            <tr class="bg-white hover:bg-gray-50 " v-for="(variant, index) in variants" :key="index"
                v-if="variant.result.id">
              <td class="p-4 border border-smooth">
                <lazy-image
                  class="mr-20 w-10 md:w-10 max-w-full max-h-full"
                  :data-src="variant.result.product_images[0]?.url"
                  :lazy-src="variant.result?.product_images[0]?.url"
                  :alt="variant.result?.product_variant?.color?.name?.en"
                />
              </td>
              <td class="px-6 font-semibold text-gray-900">
                {{ attrAndValue(variant.result?.product_variant, index) }}
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <span class="bg-primary rounded-lg text-xs mt-2 p-1 text-white"
                      v-if="variant.result.status==='approved'">{{ variant.result.status }}</span>
                <span class="bg-warning rounded-lg text-xs mt-2 p-1 text-white"
                      v-if="variant.result.status==='pending'">{{ variant.result.status }}</span>
                <span class="bg-error rounded-lg text-xs mt-2 p-1 text-white"
                      v-if="variant.result.status==='cancel'">{{ variant.result.status }}</span>
                <span class="bg-error rounded-lg text-xs mt-2 p-1 text-white" v-if="variant.result.status==='rejected'">{{
                    variant.result.status
                  }}</span>
                <span class="bg-smoothlight rounded-lg text-xs mt-2 p-1 text-white"
                      v-if="variant.result.status==='archived'">{{ variant.result.status }}</span>
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <span v-if="variant.result.is_buy_now">{{ $t('prod.Online') }}</span>
                <span v-else>{{ $t('prod.Offline') }}</span>
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">
                <select class="uppercase" v-model="variant.result.is_availability" disabled>
                  <option value="1">{{ $t('prod.In Stock') }}</option>
                  <option value="0">{{ $t('prod.Out of Stock') }}</option>
                </select>
              </td>

              <td class="px-6 border border-smooth">
                {{ variant.result.sku }}
              </td>
              <td class="px-6 font-semibold text-gray-900 border border-smooth">

                <div class="flex justify-between gap-4"
                     v-for="(product_price, p_index) in variant.result.product_prices" :key="p_index">
                  <div class="w-full p-2">
                    <div class="flex w-full justify-between">
                      <span>{{ $t('prod.Min Qty') }}</span>
                      <img class="w-4 h-4 cursor-pointer" src="~/assets/icon/edit-g.svg" alt=""
                           @click="attrModalOpen(product_price, p_index, index)">
                    </div>
                    {{ product_price.quantity }}
                  </div>
                  <div class="w-full p-2 border-l border-r border-smooth">
                    <div class="flex w-full justify-between">
                      <span>{{ $t('prod.Price') }}</span>
                      <img class="w-4 h-4 cursor-pointer" src="~/assets/icon/edit-g.svg" alt=""
                           @click="attrModalOpen(product_price, p_index, index)">
                    </div>
                    {{ product_price.unit_price }}
                  </div>

                  <div class="w-full p-2">
                    <div class="flex w-full justify-between">
                      <span>{{ $t('prod.Sale price') }}</span>
                      <img class="w-4 h-4 cursor-pointer" src="~/assets/icon/edit-g.svg" alt=""
                           @click="attrModalOpen(product_price, p_index, index)">
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
      <ValidationObserver class="w-full" v-slot="{ invalid, handleSubmit }" v-if="openTab !== 'parent'">
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
              <ValidationProvider name="Arabic keyword" :rules="{required: false}" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('prod.Keywords - Arabic')}) }"
                                  class="w-full">
                <label for="">{{ $t('prod.Key features - English') }} ?</label>

                <lang-input-multi :hasError="true" type="text" :title="$t('prod.key_features')"
                                  :valuesOfLang="variants[openTab]?.result.features"
                                  @updateInput="updateInput"></lang-input-multi>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <ValidationProvider name="English keyword "
                                :rules="{required: !is_draft & !variants[openTab]?.result.basic_keyword_en}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Keywords - English')}) }"
                                class="w-full">
              <div class="input-wrapper mb-10">
                <label for="">{{ $t('prod.Keywords - English') }} ?</label>
                <v-select
                  :dir="$t('app.dir')"
                  v-model="variants[openTab]?.result.basic_keyword_en"
                  :options="allKeywords"
                  taggable
                  multiple
                  :placeholder="$t('title.select_type')"
                  class="custom-select"
                ></v-select>
              </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="Arabic keyword"
                                :rules="{required: !is_draft & !variants[openTab]?.result.basic_keyword_ar}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Keywords - Arabic')}) }"
                                class="w-full">
              <div class="input-wrapper mb-10">
                <label for="">{{ $t('prod.Keywords - Arabic') }} ?</label>
                <v-select
                  :dir="$t('app.dir')"
                  v-model="variants[openTab]?.result.basic_keyword_ar"
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
        <ValidationProvider name="Image" :rules="{required: variants[openTab].result.product_images===0}"
                            v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('prod.Image')}) }" class="w-full">
          <div class="tab-sidebar p-3" :class="{ 'has-error': errors[0] && variants[openTab].result.product_images===0 }">
            <vue-upload-images :return-data-just="false" :old_images="variants[openTab].result.images" :max-files="10"
                               @updateInput="saveAttachment"></vue-upload-images>
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <!-- ------------------------------------- -->
        <div class="my-10"></div>
        <div class="tab-sidebar p-3" v-if="openTab !== 'parent'">
          <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Product Identifiers') }} </h4>
          <p class="text-sm">
            {{ $t('prod.Enter barcode type and number for improved search/visibility of your product') }}.</p>
          <div class="grid grid-cols-2 gap-4">
            <ValidationProvider name="barcode_type" :rules="{required: true}" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode type')}) }">
              <div class="input-wrapper mt-3 mt-sm-0">
                <label class="w-full">{{ $t('prod.Barcode type') }}</label>
                <select class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                        v-model="variants[openTab]?.result.barcode_type">
                  <option value="" disabled>{{ $t('prod.Barcode type') }}</option>
                  <option :value="index" v-for="(item, index) in allBarcodes" :key="index">{{ item.name }}</option>
                </select>
              </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="barcode" :rules="BarcodeValidationRules " v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode')}) }">
              <div class="form-group input-wrapper mt-3 mt-sm-0">
                <label>{{ $t('prod.Barcode') }}</label>
                <input
                  type="text" class="form-control"
                  v-model="variants[openTab]?.result.barcode"
                  :placeholder="$t('prod.Barcode')"
                  @keypress="onlyNumber" min="0" maxlength="8"
                  :disabled="variants[openTab]?.result.barcode_type==4 || variants[openTab]?.result.barcode_type==='' "
                  :class="{ 'has-error': errors[0], 'cursor-not-allowed': variants[openTab].result.barcode_type == 4 }"
                >
              </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <div v-if="variants[openTab].result.id">
              <ValidationProvider name="sku" v-slot="{ errors }"
                                  :rules="{required: true}"
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
            <div v-else>
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
          <div class="flex items-center gap-4 p-3">
            <ValidationProvider name="available_quantity"
                                :rules="{ required: !variants[openTab].result.is_always_available, min_value: 0,  max_value: 99999999}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Available quantity')}) }">
              <div class="input-wrapper" v-if="openTab !== 'parent'">
                <label for="">{{ $t('prod.Available quantity') }} ?</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'has-error': errors[0] }"
                  v-model="variants[openTab]?.result.available_quantity"
                  @keypress="onlyNumber" min="0" maxlength="8"
                  :disabled="variants[openTab].result.is_always_available==1"
                  @input="availableQuantity">
                <label>{{ $t('prod.Minimum order quantity') }}: {{
                    variants[openTab]?.result.product_prices[0]?.quantity
                  }}</label>
              </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="form-check">
              <label class="form-check-label">{{ $t('prod.Always Available') }}?</label>
              <input type="checkbox" class="custom-control-input" v-model="variants[openTab].result.is_always_available" />
<!--              <input type="checkbox" class="custom-control-input" v-else-if="!id" v-model="result.is_availability" @change="isAvailability($event)"/>-->
                          </div>
                        </div>
                      </div>
                      <div class="my-10"></div>
                      <div class="tab-sidebar p-3">
                        <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
                        <div class="grid grid-cols-2 gap-4">
                          <ValidationProvider name="Packaging Size" :rules="PackagingValidationRules" v-slot="{ errors }"
                                              :custom-messages="{required: $t('global.req', { type: $t('prod.Size')}) }">
                            <div class="input-wrapper">
                              <label for="">{{ $t('prod.Size') }} ?</label>
                              <div class="relative flex input-group gap-4 mb-3">
                                <input
                                  type="text"
                                  class="form-control pr-12"
                                  :class="{ 'has-error': errors[0] }"
                                  :placeholder="$t('prod.Size')"
                                  @keypress="onlyNumber" min="0" maxlength="8"
                                  v-model="variants[openTab]?.result.pk_size"
                                >
                                <div class="absolute right-0 top-0">
                                  <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                                          v-model="variants[openTab]?.result.pk_size_unit"
                                  >
                                    <option value="0">{{ $t('prod.Size Unit') }}</option>
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
                                              :rules="{required: true, min_value: 1, max_value: 99999999}" v-slot="{ errors }"
                                              :custom-messages="{required: $t('global.req', { type: $t('prod.Number of units per carton')}) }">
                            <div class="input-wrapper">
                              <label for="">{{ $t('prod.Number of units per carton') }}</label>
                              <div class=" mb-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  :class="{ 'has-error': errors[0] }"
                                  :placeholder="$t('prod.Number of units per carton')"
                                  @keypress="onlyNumber" min="0" maxlength="8"
                                  v-model="variants[openTab]?.result.pk_number_of_carton">
                              </div>
                            </div>
                            <span class="error">{{ errors[0] }}</span>
                          </ValidationProvider>

                          <ValidationProvider name="average lead time" :rules="{required: true, min_value: 1, max_value: 99}"
                                              v-slot="{ errors }"
                                              :custom-messages="{required: $t('global.req', { type: $t('prod.Average lead time(Days)')}) }">
                            <div class="input-wrapper">
                              <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label>
                              <div class=" mb-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  :class="{ 'has-error': errors[0] }"
                                  :placeholder="$t('prod.Average lead time(Days)')"
                                  @keypress="onlyNumber" min="0" maxlength="2"
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
            {{
              $t("prod.Enter the dimensions and weight of the carton to help calculate shipping rate These measurements are for the products shipping container")
            }}.</p>
          <div class="grid grid-cols-2 gap-4">
            <ValidationProvider name="Carton weight" :rules="{required: true, min_value: 1, max_value: 99999999}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Weight')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Weight') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <input
                    type="text"
                    class="form-control pr-12"
                    :class="{ 'has-error': errors[0] }"
                    :placeholder="$t('prod.Weight')"
                    @keypress="onlyNumber" min="0" maxlength="8"
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
            <ValidationProvider name="carton length" :rules="{required: true, min_value: 1, max_value: 99999999}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Length')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Length') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <input
                    type="text"
                    class="form-control pr-12"
                    :class="{ 'has-error': errors[0] }"
                    :placeholder="$t('prod.Length')"
                    @keypress="onlyNumber" min="0" maxlength="8"
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
            <ValidationProvider name="Carton height" :rules="{required: true, min_value: 1, max_value: 99999999}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Height') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <input
                    type="text" class="form-control pr-12"
                    :class="{ 'has-error': errors[0] }"
                    placeholder="Carton Height"
                    @keypress="onlyNumber" min="0" maxlength="8"
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

            <ValidationProvider name="Carton width" :rules="{required: true, min_value: 1, max_value: 99999999}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Width') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <input
                    type="text"
                    class="form-control pr-12"
                    :class="{ 'has-error': errors[0] }"
                    :placeholder="$t('prod.Width')"
                    @keypress="onlyNumber" min="0" maxlength="8"
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
          <ValidationProvider name="product dimention weight"
                              :rules="{required: true, min_value: 1, max_value: 99999999}" v-slot="{ errors }"
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
            <ValidationProvider name="product dimention length"
                                :rules="{required: true, min_value: 1, max_value: 99999999}" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Length')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Length') }} ?</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'has-error': errors[0] }"
                    :placeholder="$t('prod.Length')"
                    @keypress="onlyNumber" min="0" maxlength="8"
                    v-model="variants[openTab]?.result.pdime_length">
                </div>
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider name="product dimention height"
                                :rules="{required: true, min_value: 1, max_value: 99999999}" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Height') }} ?</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'has-error': errors[0] }"
                    :placeholder="$t('prod.Height')"
                    @keypress="onlyNumber" min="0" maxlength="8"
                    v-model="variants[openTab]?.result.pdime_height">
                </div>
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider name="product dimention width"
                                :rules="{required: true, min_value: 1, max_value: 99999999}" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Width') }} ?</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('prod.Width')"
                    :class="{ 'has-error': errors[0] }"
                    @keypress="onlyNumber" min="0" maxlength="8"
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
              <select class="border p-3 border-smooth rounded-lg uppercase" disabled
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

              <tr v-for="(product_price, index) in variants[openTab].result.product_prices" :key="index">
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
                      <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
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
                <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                        v-model="variants[openTab]?.result.is_ready_to_ship"
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
              <ValidationProvider name="storage temperature" :rules="{required: true}" v-slot="{ errors }"
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
                <select class="border p-3 w-full border-smooth rounded-lg"
                        v-model="variants[openTab]?.result.stock_location">
                  <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{ item.name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Country of origin') }}</label>
                <select class="border p-3 w-full border-smooth rounded-lg"
                        v-model="variants[openTab]?.result.country_of_origin">
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
            <input class="form-control" name="e.g. Macbook Pro 2019" type="text"
                   v-model="variants[openTab]?.result.hts_code">
          </div>
          <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Additional attributes') }} <span
            class="text-xs">(optional)</span>
          </h4>
          <div class="input-wrapper">

            <div class="flex append-input pt-1"
                 v-for="(item, index) in variants[openTab]?.result.additional_details_row" :key="index">
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
            <div class="flex justify-end gap-4 pt-3 items-center">
              <button type="button" class="btn bg-primary text-white border-secondary"
                      @click.prevent="handleSubmit(doSubmitSingle(variants[openTab]?.result.id))">
                {{ $t('prod.Send for review') }}
              </button>
              <span class="font-semibold text-error" v-if="invalid && is_submit_data">{{
                  $t('prod.Check the errors')
                }}</span>
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
          <svg @click="closeVariantModal"
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
                  <p> {{ variant.color_name }}, {{ variant.value }} </p>
                </div>
                <div v-else class="col-md-4" @click.prevent="removeVariantRows(index)">
                  <span class="p-3 border border-smooth rounded cursor-pointer">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                  </span>
                </div>
              </div>

              <div v-if="is_variant_save">
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
                        v-if="is_variant_save">
                  {{ $t('prod.Save') }}
                </button>

                <!--                <button type="button" class="btn text-white bg-primary hover:text-primary"-->
                <!--                        @click.prevent="doVariantSave"-->
                <!--                        v-else>-->
                <!--                  {{ $t('prod.Edit') }}-->
                <!--                </button>-->
                <button type="button" class="btn  border-secondary" @click.prevent="doVariantSave"
                        :class="result[openTab]?.product_variants.length===0?'cursor-not-allowed':''">
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
            </div>
          </div>
          <!-- Close Button -->


        </div>
      </div>
    </template>
    <template v-if="is_attributes_modal_index!==false">
      <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
          <svg @click="closeAttrModal"
               class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <!-- Modal Content -->
          <div class="mb-4 border-b border-smooth pb-2">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Unite price') }}
              ({{ variants[is_attributes_modal_index]?.result.product_variant?.color.name.en }},
              {{ variants[is_attributes_modal_index]?.result.product_variant?.value }})</h4>
          </div>
          <div>
            <ValidationObserver class="w-full" v-slot="{ invalid, handleSubmit }" v-if="openTab === 'parent'">
              <div class="card-body mt-10">
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
                    <tr v-if="attributes_modal_price">
                      <td class="p-2">
                        <ValidationProvider name="quantity" :rules="QuantityValidationRules" v-slot="{ errors }"
                                            :custom-messages="{ required: $t('global.req', { type: $t('prod.Minimum order quantity') }) }">
                          <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('prod.Minimum order quantity')"
                            @keypress="onlyNumber" min="0" maxlength="8"
                            v-model="attributes_modal_price.quantity"
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
                                   placeholder="Enter Price"
                                   @keypress="onlyNumber" min="0" maxlength="8"
                                   v-model="attributes_modal_price.unit_price">
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
                                   v-model="attributes_modal_price.selling_price">
                          </div>
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </td>
                      <td class="p-2">
                      </td>
                    </tr>
                    </tbody>
                  </table>

                </div>

                <hr class="border-smooth">
                <div class="flex justify-end gap-4 pt-3 text-end w-full">
                  <button type="button" class="btn border-primary " @click.prevent="handleSubmit(singlePriceUpdate)">
                    <span>{{ $t('prod.Save') }}</span>
                  </button>
                </div>
                <div class="my-10"></div>

              </div>
            </ValidationObserver>
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
import util from "@/mixin/util";

extend('uniqueSku', {
  validate: (value, {allSKus}) => {
    // Check if the provided SKU value already exists in allSKus
    return !Object.values(allSKus).find(item => item.sku === value);
  },
  params: ['allSKus'], // Define the parameter name as allSKus
  message: 'SKU must be unique'
});

// Custom rule for quantity comparison
extend('quantityComparison', {
  validate(value, {first, second, third}) {
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
  validate(value, {unit_prices, selling_prices}) {
    for (let i = 0; i < unit_prices.length; i++) {
      if (selling_prices[i] >= unit_prices[i]) {
        return 'The selling price must be smaller than the unit price!';
      }
    }
    return true;
  },
  params: ['unit_prices', 'selling_prices'],
  message: 'Invalid price comparison'
});


export default {
  name: "Variant",
  mixins: [util],
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
    variantsData: Array,
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
      is_submit_data: false,
      variant_copy: [],
      is_submit: [],
      allKeywords: [],
      injectedData: this.exampleData,
      openTab: 'parent',
      isErrorMessage: '',
      uploadModal: false,
      variant_uuid_global: '',
      is_change: false,
      hasErrorQty: false,
      varientModal: false,
      is_attributes_modal_index: false,
      is_attributes_modal_price_index: false,
      attributes_modal_price: null,
      attributes_modal_price_copy: null,
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

    hasError() {
      return this.form.errors.length > 0;
    },
    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
    isAdding() {
      return isNaN(this.$route?.params?.id)
    },

    skuRules() {
      if (this.openTab !== 'parent') {
        const allSKus = this.allSKus;
        return {
          required: !this.variants[this.openTab].result.id,
          uniqueSku: allSKus, // Pass allSKus directly
          min: 2,
          max: 32
        };
      }
    },

    PackagingValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999,
      };
    },

    QuantityValidationRules() {
      if (this.is_attributes_modal_index !== false) {
        return {
          required: true,
          min_value: 1,
          max_value: 99999999,
          regex: /^\d+$/,
          quantityComparison: {
            first: parseInt(this.variants[this.is_attributes_modal_index]?.result.product_prices[0]?.quantity),
            second: parseInt(this.variants[this.is_attributes_modal_index]?.result.product_prices[1]?.quantity),
            third: parseInt(this.variants[this.is_attributes_modal_index]?.result.product_prices[2]?.quantity)
          }
        };
      } else {
        return {
          required: true,
          min_value: 1,
          max_value: 99999999,
          regex: /^\d+$/,
          quantityComparison: {
            first: parseInt(this.variants[this.openTab]?.result.product_prices[0]?.quantity),
            second: parseInt(this.variants[this.openTab]?.result.product_prices[1]?.quantity),
            third: parseInt(this.variants[this.openTab]?.result.product_prices[2]?.quantity)
          }
        };
      }
    },
    UnitPriceValidationRules() {
      // this.PriceValidationRules
      // return {
      //   required: true,
      //   min_value: 1,
      //   max_value: 99999999,
      //   regex: /^(?:\d*\.\d{1,2}|\d+)$/
      // }
      if (this.is_attributes_modal_index !== false) {
        const unit_prices = [];
        const selling_prices = [];

        this.variants[this.is_attributes_modal_index]?.result.product_prices.forEach(price => {
          // Check if selling price is not null before pushing into arrays
          if (price?.unit_price !== null && price?.selling_price !== null) {
            unit_prices.push(parseFloat(price?.unit_price));
            selling_prices.push(parseFloat(price?.selling_price));
          }
        });

        return {
          min_value: 1,
          required: true,
          max_value: 99999999,
          regex: /^(?:\d*\.\d{1,2}|\d+)$/,
          priceComparison: {unit_prices, selling_prices}
        };
      } else {
        const unit_prices = [];
        const selling_prices = [];

        this.variants[this.openTab]?.result.product_prices.forEach(price => {
          // Check if selling price is not null before pushing into arrays
          if (price?.unit_price !== null && price?.selling_price !== null) {
            unit_prices.push(parseFloat(price?.unit_price));
            selling_prices.push(parseFloat(price?.selling_price));
          }
        });

        return {
          min_value: 1,
          required: true,
          max_value: 99999999,
          regex: /^(?:\d*\.\d{1,2}|\d+)$/,
          priceComparison: {unit_prices, selling_prices}
        };
      }
    },
    PriceValidationRules() {
      if (this.is_attributes_modal_index !== false) {
        const unit_prices = [];
        const selling_prices = [];

        this.variants[this.is_attributes_modal_index]?.result.product_prices.forEach(price => {
          // Check if selling price is not null before pushing into arrays
          if (price?.unit_price !== null && price?.selling_price !== null) {
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
      } else {
        const unit_prices = [];
        const selling_prices = [];

        this.variants[this.openTab]?.result.product_prices.forEach(price => {
          // Check if selling price is not null before pushing into arrays
          if (price?.unit_price !== null && price?.selling_price !== null) {
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
      }
    },

    BarcodeValidationRules() {
      if (this.openTab !== 'parent') {
        let validationRules = {
          required: this.variants[this.openTab]?.result?.barcode_type != 4
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
    ...mapGetters('setting', ['setting']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('common', ['allCategories', 'allTaxRules', 'allAttributes', 'allSKus',
      'allBrands', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  methods: {
    isAvailability(event) {
      const checked = event.target.checked;
      // console.log(checked); // This will log true or false
      this.variants[this.openTab].result.is_availability = checked ? 1 : 0;
      this.variants[this.openTab].result.available_quantity = ''
      // console.log(this.result.is_availability); // This will log 1 or 0
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
      this.variant_copy = [...this.result.product_variants];
      this.result.product_variants.push(Object.assign({}, this.product_variant))
    },
    setColorName(index, event) {
      this.result.product_variants[index].color_name = this.allColors[event.target.value].name
    },
    removeVariantRows(index) {
      // console.log(index)
      if (index != 0) {
        this.result.product_variants.splice(index, 1);

      }
    },
    doVariantSave() {
      if (this.result.product_variants.length === 0) {
        this.setToastMessage(this.$t('prod.No variants added'))
        return false;
      } else {
        for (let i = 0; i < this.result.product_variants.length; i++) {
          // Check if any variant has missing name or value
          if (!this.result.product_variants[i].name && !this.result.product_variants[i].value) {
            // Show error message and exit loop early
            // this.setToastError(this.$t('prod.Color or value cant empty value'));
            return;
          }
        }
        this.is_variant_save = !this.is_variant_save;
        this.varientModal = false;
        const newVariant = {
          result: {
            ...this.variants[0].result,
            id: '',
            product_images: [],
            sku: '',
            status: 'incomplete',
            is_variant: true
          }
        };
        this.variants.splice(this.variants.length, 0, newVariant);

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

    async doSubmit() {
      this.is_draft = false;
      this.result.is_draft = false;

      this.variants[0].result.brand_id = this.result.brand_id
      this.variants[0].result.unit_id = this.result.unit_id
      // this.variants[0].result.status = 'pending'
      // this.variants[0].result.from_parent = true
      if (this.variant_uuid_global) {
        this.variants[0].result.variant_uu_id = this.variant_uuid_global
      } else {
        this.variants[0].result.variant_uu_id = null
      }
      // this.variants[this.openTab].result.variant_uu_id = this.variants[0]?.result.variant_uu_id
      // this.checkForm()

      try {
        const res = await this.setById({
          id: this.variants[0]?.result.id,
          params: {
            result: {from_parent: true, ...this.variants[0].result},
            variant: this.result.product_variants[0],
            single_submit: true,
            tab: 0
          },
          api: this.setApi
        });
        if (res) {
          // console.log('sfdsfa', res)
          // Initialize this.variants[this.openTab] if it doesn't exist
          if (!this.variants[0]) {
            this.variants[0] = {};
          }

          // Initialize this.variants[this.openTab].result if it doesn't exist
          if (!this.variants[0].result) {
            this.variants[0].result = {};
          }
          this.variant_uuid_global = res.data.variant_uuid

          // Assign properties from res to this.variants[this.openTab].result
          this.variants[0].result = {
            title: res.data.title,
            variant_uu_id: res.data.variant_uu_id,
            description: res.data.description,
            parentCategory: res.data.category?.id,
            subCategory: res.data.sub_category?.id,
            childCategory: res.data.child_category?.id,
            product_prices: res.data.product_prices,
            unit_id: res.data.unit_id,
            features: res.data.product_features?.map(item => item.name),
            unit: res.data.unit,
            brand_id: res.data.brand_id,
            meta_title: res.data.meta_title,
            meta_description: res.data.meta_description,
            selling: res.data.selling,
            purchased: res.data.selling, // Should this be res.purchased?
            offered: res.data.offered,
            images: res.data.images,
            product_images: res.data.images,
            video: res.data.video,
            status: res.data.status,
            parent_sku: res.data.parent_sku,
            basic_keyword_en: res.data.basic_keyword_en,
            basic_keyword_ar: res.data.basic_keyword_ar,
            basicInfoAr: res.data.title,
            basicInfoEng: res.data.title,
            barcode_type: res.data.barcode_id,
            barcode: res.data.barcode_number,
            sku: res.data.sku,
            available_quantity: res.data.available_quantity,
            pk_size: res.data.packaging?.size,
            pk_size_unit: res.data.packaging?.size_unit,
            pk_number_of_carton: res.data.packaging?.number_of_carton,
            pk_average_lead_time: res.data.packaging?.average_lead_time,
            pk_transportation_mode: res.data.packaging?.transportation_mode,
            pc_weight: res.data.product_carton?.weight,
            pc_weight_unit_id: res.data.product_carton?.weight_unit_id,
            pc_height: res.data.product_carton?.height,
            pc_height_unit_id: res.data.product_carton?.height_unit_id,
            pc_length: res.data.product_carton?.length,
            pc_length_unit_id: res.data.product_carton?.length_unit_id,
            pc_width: res.data.product_carton?.width,
            pc_width_unit_id: res.data.product_carton?.width_unit_id,
            pdime_weight: res.data.product_dimension?.weight,
            pdime_weight_unit_id: res.data.product_dimension?.weight_unit_id,
            pdime_height: res.data.product_dimension?.height,
            pdime_length: res.data.product_dimension?.length,
            pdime_width: res.data.product_dimension?.width,
            pdime_dimention_unit: res.data.product_dimension?.dimention_unit,
            pp_quantity: res.data.product_prices?.map(price => price.quantity),
            pp_unit_price: res.data.product_prices?.map(price => price.unit_price),
            pp_selling_price: res.data.product_prices?.map(price => price.selling_price),
            is_ready_to_ship: res.data.is_ready_to_ship,
            is_buy_now: res.data.is_buyable,
            is_availability: res.data.is_available,
            storage_temperature: res.data.storage_temperature_id,
            stock_location: res.data.warehouse_id,
            country_of_origin: res.data.product_origin_id,
            is_dangerous: res.data.is_dangerous,
            product_variants: res.data.product_variant,
            product_variant: res.data.product_single_variant ?? [],
            PriceingRows: res.data.product_prices,
            is_variant: !!res.data.product_variant,
            additional_details_row: res.data.additional_attribute?.map(item => ({name: item.name, value: item.value})),
            hts_code: res.data.hts_code,
            id: res.data.id,
          };


          this.fetchingData(res.data.id);
          this.openTab = 'parent'
          this.setToastMessage(this.$t('app.Product Successfully Saved'))
        }
      } catch (error) {
        this.setToastError('Error! at last complete one variant')
      }
    },

    async fetchingData(id) {
      try {
        this.is_loading = true
        var variant_res = Object.assign({}, await this.getById({id: id, params: {}, api: 'getVariantProducts'}));
        // console.log('this.variants[0].result', variant_res)

        for (let key in variant_res) {
          if (!isNaN(key)) {
            // console.log('variant_res', variant_res[key])
            this.result.unit_id = variant_res[key].unit_id;
              this.variants[key].result.title = variant_res[key].title,
              this.variants[key].result.brand_id = variant_res[key].brand_id,
              this.variants[key].result.unit_id = variant_res[key].unit_id,
              this.variants[key].result.product_images = variant_res[key].images
          }
        }

      } catch (e) {
        return this.$nuxt.error(e)
      }
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
      this.is_submit_data = true;
      this.variants[this.openTab].result.status = 'pending'
      this.variants[this.openTab].result.is_draft = false
      if (this.variant_uuid_global) {
        this.variants[this.openTab].result.variant_uu_id = this.variant_uuid_global
      } else {
        this.variants[this.openTab].result.variant_uu_id = null
      }
      // this.variants[this.openTab].result.variant_uu_id = this.variants[0]?.result.variant_uu_id
      // this.checkForm()

      try {
        const res = await this.setById({
          id: id,
          params: {
            result: this.variants[this.openTab].result,
            variant: this.result.product_variants[this.openTab],
            single_submit: true,
            tab: this.openTab
          },
          api: this.setApi
        });
        if (res) {
          // Initialize this.variants[this.openTab] if it doesn't exist
          if (!this.variants[this.openTab]) {
            this.variants[this.openTab] = {};
          }

          // Initialize this.variants[this.openTab].result if it doesn't exist
          if (!this.variants[this.openTab].result) {
            this.variants[this.openTab].result = {};
          }
          this.variant_uuid_global = res?.data.variant_uuid
          // Assign properties from res to this.variants[this.openTab].result
          this.variants[this.openTab].result = {
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
            additional_details_row: res?.data.additional_attribute?.map(item => ({name: item.name, value: item.value})),
            hts_code: res?.data.hts_code,
            id: res?.data.id,
          };

          // console.log('single submit after variant', this.variants)
          for (let i = 0; i < this.variants.length; i++) {
            const variantResult = this.variants[i].result;
            if (!variantResult.id) {
              variantResult.sku = null;
              variantResult.product_images = [];
            }
          }
          this.isErrorMessage = null;
          this.openTab = 'parent'
          this.setToastMessage(this.$t('app.Product Successfully Saved'))
        }
      } catch (error) {
        if (error.response.status === 422) {
          // Validation error
          const errorMessage = error.response.data.message;
          const errors = error.response.data.errors;
          this.isErrorMessage = errorMessage;
          this.setToastError(errorMessage)
          // this.setToastError(errors)
        } else {
          // Other types of errors
          console.error('An error occurred:', error.message);
          // Show a generic error message to the user
          this.setToastError('An error occurred. Please try again later.\'')
        }
      }


    },
    variantName(name) {
      if (this.is_edit) {
        return name[this.currentLanguage?.code]
      } else {
        return name[this.currentLanguage?.code] + ' - ' + this.result.product_variants[this.openTab].color_name + ',' + this.result.product_variants[this.openTab].value;
      }
    },
    variantNameWithAttr(name) {
      if (this.result.product_variants[this.openTab].color_name && this.result.product_variants[this.openTab].value) {
        return name[this.currentLanguage?.code] + ' - ' + this.result.product_variants[this.openTab].color_name + ',' + this.result.product_variants[this.openTab].value;
      } else if (this.result.product_variants[this.openTab].color_name) {
        return name[this.currentLanguage?.code] + ' - ' + this.result.product_variants[this.openTab].color_name;
      } else {
        return name[this.currentLanguage?.code] + ' - ' + this.result.product_variants[this.openTab].value;
      }
    },

    closeVariantModal() {
      this.varientModal = false;
      if (this.variant_copy) {
        this.result.product_variants = this.variant_copy
      }
    },
    openVariantModal() {
      this.varientModal = true
      this.is_variant_save = true
      this.variant_copy = [...this.result.product_variants];
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
    toggleTabs: async function (tab) {
      if (!this.is_change) {
        this.openTab = tab;
      } else {
        await this.handleUnsavedChanges(tab);
      }
    },

    attrModalOpen(price, p_index, index) {
      this.is_attributes_modal_price_index = p_index
      this.is_attributes_modal_index = index
      this.attributes_modal_price = price
      this.attributes_modal_price_copy = {...this.attributes_modal_price};
    },
    closeAttrModal() {
      this.variants[this.is_attributes_modal_index].result.product_prices[this.is_attributes_modal_price_index] = this.attributes_modal_price_copy
      // this.attributes_modal_price_copy = { ...this.attributes_modal_price };
      this.is_attributes_modal_price_index = false
      this.is_attributes_modal_index = false
      this.attributes_modal_price = ''
    },
    saveChanges() {
      // Update the original data with the copy
      this.attributes_modal_price = {...this.attributes_modal_price_copy};
      // Close modal or perform other actions
    },
    async singlePriceUpdate() {
      try {
        const {id, quantity, unit_price, selling_price} = this.attributes_modal_price;
        const updatedPrice = {
          id,
          params: {quantity, unit_price, selling_price, price_index: this.is_attributes_modal_price_index},
          api: 'updateSinglePrice'
        };
        const response = await this.setById(updatedPrice);

        if (!response) return; // Exit early if there's no response

        if (this.is_attributes_modal_price_index === 0) {
          const isAvailability = response.is_available ? 1 : 0;
          this.variants[this.is_attributes_modal_index].result.is_availability = isAvailability;
        }

        // Reset modal state
        this.is_attributes_modal_price_index = false;
        this.is_attributes_modal_index = false;
        this.attributes_modal_price = '';
      } catch (error) {
        console.error('Error updating price:', error);
        // Handle error gracefully
      }
    },

    async handleUnsavedChanges(tab) {
      const confirmation = await this.$swal({
        title: "Unsaved changes",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        showCloseButton: true,
      });

      if (confirmation.value) {
        this.openTab = tab;
        this.is_change = false
      }
    },
    uploadModalToggle() {
      this.uploadModal = !this.uploadModal
    },

    addPriceingRows() {
      try {
        if (this.openTab !== 'parent') {
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
        if (this.openTab !== 'parent') {
          // this.result.product_prices.splice(index, 1);
          this.variants[this.openTab].result.product_prices.splice(index, 1);
        }

      }
    },
    compareMethods() {
      if (this.is_attributes_modal_index !== false) {
        let ava_qty = parseInt(this.variants[this.is_attributes_modal_index].result.available_quantity);
        let product_prices_min_qty = parseInt(this.variants[this.is_attributes_modal_index].result.product_prices[0]?.quantity);

        if (!isNaN(ava_qty) && !isNaN(product_prices_min_qty)) {
          this.variants[this.is_attributes_modal_index].result.is_availability = ava_qty >= product_prices_min_qty ? 1 : 0;
        }
      } else {
        let ava_qty = parseInt(this.variants[this.openTab].result.available_quantity);
        let product_prices_min_qty = parseInt(this.variants[this.openTab].result.product_prices[0]?.quantity);

        if (!isNaN(ava_qty) && !isNaN(product_prices_min_qty)) {
          this.variants[this.openTab].result.is_availability = ava_qty >= product_prices_min_qty ? 1 : 0;
        }
      }
    },
    availableQuantity() {
      this.compareMethods()
    },
    oldImages() {
      this.variants[this.openTab].result.product_images = this.openTab !== 'parent' ? this.variants[this.openTab].result.product_images ?? [] : [];
    },
    saveAttachment(images) {
      if (this.openTab !== 'parent') {
        this.variants[this.openTab].result.product_images = images
      }
    },
    areObjectsEqual(obj1, obj2) {
      // Check if the objects are equal using JSON.stringify
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    variantsChanged(newValue, oldValue) {
      if (this.openTab !== 'parent') {
        // const new_value = newValue[this.openTab].result;
        // const old_value = oldValue[this.openTab].result;

        if (newValue !== oldValue) {
          alert('Value of result has changed');
          // Perform actions or fetch data here
        }
      }
    },

    attrAndValue(variant, index) {
      // console.log(variant)
      // {{ variant.result?.product_variant?.color?.name?.en + ',' + variant.result?.product_variant?.value }}
      if (variant.color && Object.keys(variant.color).length > 0) {
        return variant?.color?.name?.en + ',' + variant?.value;
      } else {
        return this.result.product_variants[index]?.color_name + ',' + this.result.product_variants[index]?.value;
      }
    },
    async findKeyword() {
      let res = await this.getById({id: 1, params: {keyword: ''}, api: 'findRfqKeyword'});
      this.allKeywords = res;
    },


    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapGetters('language', ['langCode', 'currentLanguage', 'languages']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  },
  watch: {

    // 'variants[openTab].result.is_always_available'(newValue, oldValue) {
    //   if (newValue == 1) {
    //     this.variants[this.openTab].result.available_quantity = '';
    //   }
    // },
    variants: {
      deep: true,
      handler(newVal, oldVal) {
        console.log('newVal', newVal)
        if (newVal[this.openTab]?.result.is_always_available == 1) {
          this.variants[this.openTab].result.available_quantity = '';
          this.variants[this.openTab].result.is_availability = 1;
        }
        // Iterate through each item in the variants array
        for (let i = 0; i < newVal.length; i++) {
          // Compare the result objects of the current and previous values
          if (JSON.stringify(newVal[i]?.result) === JSON.stringify(oldVal[i]?.result)) {
            console.log(`Change detected in variant at index ${i}`);
            this.is_change = true
            // Perform necessary actions here
          }
        }
      }
    }
  },
  async mounted() {
    if (this.is_edit) {
      this.variants = this.variantsData
      this.variant_uuid_global = this.variants[0]?.result?.variant_uu_id
    } else {
      this.result.product_variants.forEach((variant) => {
        this.result.sku = ''
        this.variants.push(Object.assign({result: this.result}));
      });
      console.log('mounted...')
    }
    if (this.allKeywords.length === 0) {
      await this.findKeyword()
    }
    if (
      !this.allCategories || !this.allTaxRules || !this.allAttributes ||
      !this.allBrands || !this.allProductCollections || !this.allBundleDeals ||
      !this.allShippingRules || !this.allColors || !this.allBarcodes || !this.allPackagingUnits ||
      !this.allWeightUnits || !this.allCountries || !this.allStorageTemperatures || !this.allTransportationModes || !this.allWarehouses
    ) {

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
