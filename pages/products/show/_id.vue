<template>
  <div>
    <!-- ---------------- -->
    <div class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4>Show Product</h4>
        <p>Show the form below to approve or reject the product!</p>
      </div>

      <div class="input-wrapper p-3" v-if="!is_show">
        <input type="checkbox" class="custom-control-input" id="clonecheck_true" v-if="is_clone" v-show="is_clone"
               v-model="is_clone" @click.prevent="isClone"/>
        <input type="checkbox" class="custom-control-input" id="clonecheck_false" v-else v-model="is_clone"/>
        <label class="custom-control-label fw-bold" for="clonecheck"><strong style="line-height: 26px;">Clone from
          existing product</strong></label>
      </div>

      <form action="" class="p-3" id="product_sku" v-if="!is_show">
        <div class="input-wrapper">
          <label for="name">Clone All Data From Existing Product Using Product SKU Code.</label>
          <div
            class="relative flex flex-col min-w-0 min-h-96 rounded break-words  appendTable">
            <product-search
              ref="productSearch"
              @product-clicked="cloneProduct"
            />
          </div>
          <label style="font-size:12px;" for="">You can find it on the Product details page in the ‘Overview’
            section</label>
        </div>
        <div class="input-wrapper mb-3">
          <div class="mt-4" role="alert">
            <div class="media-body bg-soft-dark p-1 rounded  pl-2 pr-2 font-size-14">
              <h6>Learn how to create a new single product</h6>
              <h6>Create a new single product from scratch or clone from existing product.</h6>
              <a href="">Learn More</a>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary">Submit</button>
      </form>
    </div>

    <div v-if="!is_clone">
      <form :class="{'has-error': hasError}">
        <!-- --------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div id="product_form" class="tab-sidebar p-3">

          <div class="d-flex justify-content-between  align-items-center">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">Basic information</h4>
          </div>

          <div class="input-group mb-3">
            <label class="w-full" for="mainCategory">Select Unit</label>
            <select data-plugin="customselect" class="border p-3 w-50 border-smooth rounded-lg uppercase"
                    :disabled="is_show"
                    v-model="result.unit">
              <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{ item.title }}</option>
            </select>
          </div>
          <!--          <span class="text-primary">{{ result.mainCategorySlug }}/{{result.subCategorySlug}}</span>-->
          <div class="grid grid-cols-3 gap-4">
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
                @input="updateLevel2"
                class="custom-select"
                :disabled="is_show"
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
                :disabled="is_show"
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
                :disabled="is_show"
                :placeholder="$t('rfq.Select Child Category')"
              ></v-select>
            </div>
          </div>

          <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
                      @updateInput="updateInput"></lang-input>
          <lang-input :hasError="hasError" type="textarea" :title="$t('prod.desc')" :valuesOfLang="result.description"
                      @updateInput="updateInput"></lang-input>

          <div class="form-group input-wrapper mb-10  for-lang ar-lang">
            <label class="w-full" for="name">{{ $t("prod.brand") }}</label>
            <select class="form-control w-full rounded border border-smooth p-3" @change="updateBrand($event)"
                    :class="{invalid: !is_draft && (result.brand_id == 0 || result.brand_id===null) && hasError}"
                    :disabled="is_show"
                    v-model="result.brand_id">
              <option value="0">Select Brand</option>
              <option v-for="(item, index) in allBrands" :key="index" :value="index">{{ item.title }}</option>
            </select>
          </div>
        </div>
        <!-- --------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Unit of measure</h4>
          <div class="form-group input-wrapper for-lang ar-lang">
            <label class="w-full" for="name">Unit of measure</label>
            <select class="w-full rounded border mb-10 border-smooth p-3 uppercase" :disabled="is_show"
                    v-model="result.unit_id">
              <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{ item.title }}</option>
            </select>
          </div>
        </div>
        <!-- --------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Variant information</h4>
          <div class="form-check">
            <input type="checkbox" class="custom-control-input" id="clonecheck_true" v-if="is_variant"
                   v-model="is_variant" @click.prevent="isVariant"/>
            <input type="checkbox" class="custom-control-input" id="clonecheck_false" v-else v-model="is_variant"
                   @click.prevent="isVariant"/>
            <label class="form-check-label" for="flexCheckDefault">
              This product has options, like size or color
            </label>
          </div>
          <div class="card-body mt-10" v-if="is_variant">

            <div class="grid grid-cols-3 gap-4 pt-4">

              <div class="col-md-4">
                <div class="form-group">
                  <select class="w-full rounded border mb-10 border-smooth p-3" :disabled="is_show"
                          v-model="select_attr1" @change="isAttr($event, 'color')">
                    <option selected>Select attribute 1</option>
                    <option v-for="(item, index) in product_variant_type" :key="index"
                            :disabled="item === select_attr2">{{ item }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <select class="w-full rounded border mb-10 border-smooth p-3" :disabled="is_show"
                          v-model="select_attr2" @change="isAttr($event, 'size')">
                    <option selected>Select attribute 2</option>
                    <option v-for="(item, index) in product_variant_type" :key="index"
                            :disabled="item === select_attr1">{{ item }}
                    </option>
                  </select>
                </div>
              </div>


            </div>

            <div class="col-md-4"></div>
            <div class="grid grid-cols-3 gap-4" v-for="(variant, index) in result.product_variants" :key="index">
              <div class="col-md-4">
                <div class="form-group">
                  <select class="w-full rounded border mb-10 border-smooth p-3" :disabled="is_show"
                          v-model="variant.name" v-if="select_attr1 === 'color' && select_attr2 === 'size'">
                    <option v-for="(item, index) in allColors" :key="index" :value="index">{{
                        item.title ?? item.name
                      }}
                    </option>
                  </select>
                  <input class="form-control w-100" type="text" placeholder="Enter Value" v-model="variant.value"
                         v-if="select_attr1 === 'size' && select_attr2 === 'color'"/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group" :class="{ invalid: variant.value }">
                  <input class="form-control w-100" type="text" placeholder="Enter Value" :disabled="is_show"
                         v-model="variant.value" v-if="select_attr1 === 'color' && select_attr2 === 'size'"/>
                  <select class="w-full rounded border mb-10 border-smooth p-3" v-model="variant.name"
                          v-if="select_attr2 === 'color' && select_attr1 === 'size'">
                    <option v-for="(item, index) in allColors" :key="index" :value="index">{{
                        item.title ?? item.name
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
              <div class="col-md-4 pt-4" v-if="is_show">
                <button type="button" @click.prevent="doApproved()"
                        class="btn mb-10 w-25 bg-primary">
                  Approved
                </button>
                <button type="button" @click.prevent="isRejected()"
                        class="btn mb-10 w-25 bg-error">
                  Rejected
                </button>
              </div>
            </div>

            <hr class="border-smooth">
            <div class="flex justify-end gap-4 pt-3" v-if="!is_show">
              <button type="button" class="btn text-white bg-primary" @click.prevent="doSubmitVariant">
                SAVE
              </button>
              <button type="button" class="btn  border-secondary">
                <span>RESET</span>
              </button>
              <button type="button" class="btn bg-light">
                <nuxt-link :to="`/products`">CANCEL</nuxt-link>
              </button>
            </div>
          </div>
        </div>
        <!-- ------------------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Basic Information </h4>
          <div class="card-body">
            <div class="input-wrapper mb-10">
              <label for="">Key features - English ?</label>

              <lang-input-multi :hasError="hasError" type="text" :title="$t('city.name')"
                                :valuesOfLang="result.features"
                                @updateInput="updateInput"></lang-input-multi>
            </div>

            <div class="input-wrapper mb-10">
              <label for="">Keywords - English ?</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.basic_keyword_en"
                :options="['sea','air','land']"
                taggable
                multiple
                :disabled="is_show"
                :placeholder="$t('title.select_type')"
                class="custom-select"
                :class="{invalid: !result.is_variant && result.basic_keyword_en === '' && hasError}"
              ></v-select>
            </div>
            <div class="input-wrapper mb-10">
              <label for="">Keywords - Arabic ?</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.basic_keyword_ar"
                :options="['sea','air','land']"
                taggable
                multiple
                :disabled="is_show"
                :placeholder="$t('title.select_type')"
                class="custom-select"
              ></v-select>
            </div>
          </div>
        </div>
        <!-- ------------------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->

        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <div class="flex pl-4">
            <h4 class="header-title mt-0 text-capitalize mb-1">Images and Videos</h4>
            <span @click.prevent="uploadModalToggle()" class="font-bold ml-auto cursor-pointer text-primary">Upload media</span>
          </div>
          <div class="input-wrapper">
            <label class="pl-4 pt-0 fw-bold">
              Add images and videos of your product to engage customers. <br>
              Images should be square with minimum allowed dimensions to be 500x500 pixels. <br>
              Allowed file extensions are (png, bmp, jpeg, and jpg) <br>
              and allowed video extensions are (mp4, mpeg and webp)
            </label>
          </div>

          <ul class="flex mb-0 list-none flex-wrap pt-3 w-100 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal" v-on:click="toggleTabs(1)"
                 v-bind:class="{'bg-white border-white border-b-2': openTab !== 1, 'border-b-2 border-primary': openTab === 1}">
                Selected Media (0 of 16)
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(2)"
                 v-bind:class="{'bg-white border-white border-b-t': openTab !== 2, 'border-b-2 border-primary': openTab === 2}">
                Select from media bank
              </a>
            </li>
          </ul>

          <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
            <div class="flex-auto ">
              <div class="tab-content input-wrapper tab-space">
                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                  <div @click.prevent="uploadModalToggle()"
                       class="text-center cursor-pointer p-4 border border-dotted border-smooth rounded">
                    <svg class="w-6 h-6 mx-auto text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                    <label><strong>Drag & Drop images here to upload</strong></label> <br>
                    <label>or click the “Upload media” button</label>
                  </div>
                </div>
                <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                  <div class="grid grid-cols-2 px-3 gap-4">
                    <div class="col-md-6">
                      <div class="custom-control custom-checkbox  mb-2 mt-3">
                        <input type="checkbox" class="custom-control-input" id="customCheckDisabled1" disabled="">
                        <label class="custom-control-label" for="customCheckDisabled1">Select Visible</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="flex flex-row-reverse">
                        <button class="btn btn-soft-dark m-1">
                          <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                        </button>
                        <input style="width:200px" type="text" class="form-control m-1" id="inlineFormInput"
                               placeholder="Search">
                        <span class="btn btn-primary disabled mt-3">Select Visible</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table class="table mb-0">
                        <tbody>
                        <tr>
                          <td style="width:20px">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="customCheck2">
                              <label class="custom-control-label" for="customCheck2"></label>
                            </div>
                          </td>
                          <td style="width:60%">
                            <div class="media">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   fill="none"
                                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                   class="feather feather-users align-self-center icon-dual icon-lg mr-4">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <div class="media-body">
                                <h6 class="mt-0 mb-0  text-xs">image.jpg</h6>
                                <span class="text-muted  text-xs">Image</span>
                              </div>
                            </div>
                          </td>
                          <td class="text-xs">Group Name</td>
                          <td><span class="text-xs">1/3/2024, 2:38:20 PM</span></td>
                          <td>
                            <button class="btn btn-light btn-sm">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                   fill="currentColor"
                                   viewBox="0 0 20 14">
                                <path
                                  d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td style="width:20px">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="customCheck2">
                              <label class="custom-control-label" for="customCheck2"></label>
                            </div>
                          </td>
                          <td style="width:60%">
                            <div class="media">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   fill="none"
                                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                   class="feather feather-users align-self-center icon-dual icon-lg mr-4">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <div class="media-body">
                                <h6 class="mt-0 mb-0 text-xs">file.docs</h6>
                                <span class="text-muted  text-xs">File</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="input-group flex">
                              <input type="text" class="form-control" placeholder="Write Group Name"
                                     aria-label="Recipient's username" aria-describedby="button-addon2">
                              <div class="relative">
                                <button class="grp-check absolute border-0 right-0 top-0" type="button"
                                        id="button-addon2">
                                  <svg class="w-2 h-2 text-gray-800 dark:text-white" aria-hidden="true"
                                       xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                  </svg>
                                </button>
                              </div>
                            </div>

                          </td>
                          <td><span class="text-xs">1/3/2024, 2:38:20 PM</span></td>
                          <td>
                            <button class="btn btn-light btn-sm">
                              <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                                   xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                <path
                                  d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div class="mt-10">
                        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <a href="#"
                             class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Previous</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clip-rule="evenodd"/>
                            </svg>
                          </a>
                          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                          <a href="#" aria-current="page"
                             class="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                          <a href="#"
                             class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                          <a href="#"
                             class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                          <span
                            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                          <a href="#"
                             class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                          <a href="#"
                             class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                          <a href="#"
                             class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                          <a href="#"
                             class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Next</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clip-rule="evenodd"/>
                            </svg>
                          </a>
                        </nav>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- ------------------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1">Product Identifiers</h4>
          <p class="text-sm">Enter barcode type and number for improved search/visibility of your product.</p>
          <div class="grid grid-cols-2 gap-4">

            <div class="input-wrapper mt-3 mt-sm-0">
              <label class="w-full">Barcode type</label>
              <select class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                      :disabled="is_show"
                      :class="{invalid: !is_draft && (result.barcode_type === 0 || result.barcode_type===null) && hasError}"
                      @change="productIdentifiersType($event)" v-model="result.barcode_type">
                <option value="0">Select Barcode</option>
                <option :value="index" v-for="(item, index) in allBarcodes" :key="index">{{ item.name }}</option>
              </select>
            </div>
            <div class="form-group input-wrapper mt-3 mt-sm-0">
              <label>Barcode</label>
              <input type="text" class="form-control" v-model="result.barcode"
                     :class="{invalid: !is_variant && !result.barcode_type && hasError}"
                     placeholder="Please enter barcode number"
                     :disabled="!result.barcode_type">
            </div>
            <div class="form-group input-wrapper  mt-3 mt-sm-0">
              <label>SKU</label>
              <input type="text" class="form-control" v-model="result.sku" placeholder="sku" :disabled="!is_barcode"
                     :class="{invalid: !is_draft && (!result.sku) && hasError}"
              >
            </div>
          </div>
        </div>
        <!-- ------------------------------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <div class="border-b border-smooth">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">Fulfillment</h4>
            <p>Setup shipping and inventory details for this product</p>
          </div>
          <div class="mt-10">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">Product Inventory</h4>
            <p>Enter the available quantity of your product</p>
          </div>
          <div class="input-wrapper">
            <label for="">Available quantity ?</label>
            <input type="text" class="form-control" v-model="result.available_quantity" @keypress="onlyNumber">
            <label>Minimum order quantity: 1</label>
          </div>
        </div>
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Packaging</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="input-wrapper">
              <label for="">Size ?</label>
              <div class="relative flex input-group gap-4 mb-3">
                <input type="text" class="form-control pr-12" placeholder="Size" aria-label="Recipient's username"
                       :class="{invalid: !is_draft && (!result.pk_size) && hasError}"
                       @keypress="onlyNumber"
                       aria-describedby="button-addon2" v-model="result.pk_size">
                <div class="absolute right-0 top-0">
                  <select class="p-2 m-1 float-right border-l border-smooth uppercase" @change="updateSizeUnit($event)"
                          v-model="result.pk_size_unit"
                          :disabled="is_show"
                          :class="{invalid: !is_draft && (result.pk_size_unit===null) && hasError}"
                  >
                    <option :value="index" v-for="(item, index) in allWeightUnits" :key="index">{{
                        item.title
                      }}
                    </option>
                  </select>
                </div>
              </div>


            </div>
            <div class="input-wrapper">
              <label for="">Number of units per carton</label>
              <div class=" mb-3">
                <input type="text" class="form-control" placeholder="Size" aria-label="Units per carton"
                       :class="{invalid: !is_draft && (!result.pk_number_of_carton) && hasError}"
                       @keypress="onlyNumber"
                       aria-describedby="button-addon2" v-model="result.pk_number_of_carton">
              </div>
            </div>
            <div class="input-wrapper">
              <label for="">Average lead time (Days) ?</label>
              <div class=" mb-3">
                <input type="text" class="form-control" placeholder="Avg. Lead Time" aria-label="Units per carton"
                       :class="{invalid: !is_draft && (!result.pk_average_lead_time) && hasError}"
                       @keypress="onlyNumber"
                       aria-describedby="button-addon2" v-model="result.pk_average_lead_time">
              </div>
            </div>
            <div class="input-wrapper">
              <label for="">Transportation Mode</label>
              <div class=" mb-3">
                <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                        :disabled="is_show"
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
        <!-- ----------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Carton Dimensions & Weight</h4>
          <p>Enter the dimensions and weight of the carton to help calculate shipping rate. These measurements are for
            the
            product's shipping container.</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="input-wrapper">
              <label for="">Weight ?</label>
              <div class="relative flex input-group gap-4 mb-3">
                <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                       aria-label="Recipient's username"
                       @keypress="onlyNumber"
                       :class="{invalid: !is_draft && (result.pc_weight===null) && hasError}"
                       aria-describedby="button-addon2" v-model="result.pc_weight">
                <div class="absolute right-0 top-0">
                  <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                          :disabled="is_show"
                          :class="{invalid: !is_draft && (result.pc_weight_unit_id===null) && hasError}"
                          v-model="result.pc_weight_unit_id">
                    <!--                  <option value="0">Select</option>-->
                    <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                        item.title
                      }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="input-wrapper">
              <label for="">Length ?</label>
              <div class="relative flex input-group gap-4 mb-3">
                <input type="text" class="form-control pr-12" placeholder="Carton Length"
                       aria-label="Recipient's username"
                       @keypress="onlyNumber"
                       :class="{invalid: !is_draft && (result.pc_length===null) && hasError}"
                       aria-describedby="button-addon2" v-model="result.pc_length">
                <div class="absolute right-0 top-0">
                  <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                          :disabled="is_show"
                          :class="{invalid: !is_draft && (result.pc_length_unit_id===null) && hasError}"
                          v-model="result.pc_length_unit_id">
                    <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                        item.title
                      }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="input-wrapper">
              <label for="">Height ?</label>
              <div class="relative flex input-group gap-4 mb-3">
                <input type="text" class="form-control pr-12" placeholder="Carton Height"
                       aria-label="Recipient's username"
                       @keypress="onlyNumber"
                       :class="{invalid: !is_draft && (result.pc_height===null) && hasError}"
                       aria-describedby="button-addon2" v-model="result.pc_height">
                <div class="absolute right-0 top-0">
                  <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                          :disabled="is_show"
                          :class="{invalid: !is_draft && (result.pc_height_unit_id===null) && hasError}"
                          v-model="result.pc_height_unit_id">
                    <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                        item.title
                      }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="input-wrapper">
              <label for="">Width ?</label>
              <div class="relative flex input-group gap-4 mb-3">
                <input type="text" class="form-control pr-12" placeholder="Carton Width"
                       aria-label="Recipient's username"
                       @keypress="onlyNumber"
                       :class="{invalid: !is_draft && (result.pc_width===null) && hasError}"
                       aria-describedby="button-addon2" v-model="result.pc_width">
                <div class="absolute right-0 top-0">
                  <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                          :disabled="is_show"
                          :class="{invalid: !is_draft && (result.pc_width_unit_id===null) && hasError}"
                          v-model="result.pc_width_unit_id">
                    <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                        item.title
                      }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- ----------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Product dimensions & weight</h4>
          <p>These attributes provide information about the product's dimensions and weight.</p>
          <div class="input-wrapper">
            <label for="">Weight ?</label>
            <div class="relative flex input-group gap-4 w-50 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                     aria-label="Recipient's username"
                     @keypress="onlyNumber"
                     :class="{invalid: !is_draft && (result.pdime_weight ===null) && hasError}"
                     aria-describedby="button-addon2" v-model="result.pdime_weight">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                        :disabled="is_show"
                        :class="{invalid: !is_draft && (result.pdime_weight_unit_id === null) && hasError}"
                        v-model="result.pdime_weight_unit_id">
                  <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{ item.title }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div class="input-wrapper">
              <label for="">Length ?</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter Length" aria-label="Recipient's username"
                       :class="{invalid: !is_draft && (result.pdime_length === null) && hasError}"
                       @keypress="onlyNumber"
                       aria-describedby="button-addon2" v-model="result.pdime_length">
              </div>
            </div>
            <div class="input-wrapper">
              <label for="">Height ?</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter Height" aria-label="Recipient's username"
                       :class="{invalid: !is_draft && (result.pdime_height === null) && hasError}"
                       @keypress="onlyNumber"
                       aria-describedby="button-addon2" v-model="result.pdime_height">
              </div>
            </div>

            <div class="input-wrapper">
              <label for="">Width ?</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter Width" aria-label="Recipient's username"
                       :class="{invalid: !is_draft && (result.pdime_width===null) && hasError}"
                       @keypress="onlyNumber"
                       aria-describedby="button-addon2" v-model="result.pdime_width">
              </div>
            </div>
            <div class="input-wrapper">
              <label for="">Dimension Unit</label>
              <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                      :class="{invalid: !is_draft && (result.pdime_dimention_unit ===null) && hasError}"
                      v-model="result.pdime_dimention_unit">
                <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{ item.title }}</option>
              </select>
            </div>
          </div>

        </div>
        <!-- ----------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Pricing</h4>
          <div class="input-wrapper">
            <label for="">Unit of measure ?</label>
            <div class="input-group mb-3">
              <select class="border p-3 w-50 border-smooth rounded-lg uppercase"
                      :class="{invalid: !is_draft && result.unit_id === 0  && hasError}"
                      v-model="result.unit_id">
                <option value="0">Unit</option>
                <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{ item.title }}</option>
              </select>
            </div>
          </div>
          <p><span class="fw-bold">Price list</span> UAE Market (GULF) - AED</p>
          <p>Add pricing to your product. You can also create bulk pricing rules to offer price discounts based on
            quantity
            breaks</p>
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead>
              <tr>
                <th scope="col">Minimum order quantity</th>
                <th scope="col">Unit price</th>
                <th scope="col">Sale price ? (optional)</th>
                <th></th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(product_price, index) in result.product_prices" :key="index">
                <td class="p-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Quantity"
                    @keypress="onlyNumber"
                    v-model="product_price.quantity"
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
            <button class="btn btn-link fw-bold" @click.prevent="addPriceingRows()">+ ADD TIER</button>
          </div>
        </div>
        <!-- ----------------- -->
        <div class="my-10"></div>
        <!-- ------------------------------------- -->
        <div class="tab-sidebar p-3" v-if="!is_variant">
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Shipping details</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-md-6">
              <div class="input-wrapper">
                <label for="">Is Ready To Ship ?</label>
                <select class="border p-3 w-full border-smooth rounded-lg uppercase" v-model="result.is_ready_to_ship"
                        :class="{invalid: !is_draft && (result.is_ready_to_ship === null) && hasError}"
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-wrapper">
                <label for="">Is Buy Now ?</label>
                <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                        :class="{invalid: !is_draft && (result.is_buy_now === null) && hasError}"
                        v-model="result.is_buy_now">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-wrapper">
                <label for="">Availability</label>
                <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                        :class="{invalid: !is_draft && (result.is_availability===null) && hasError}"
                        v-model="result.is_availability">
                  <option value="1">In Stock</option>
                  <option value="0">Out of Stock</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="input-wrapper">
                <label for="">Storage temperature</label>
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
                <label for="">Ware House</label>
                <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.stock_location"
                        :class="{invalid: !is_draft && (result.stock_location===0 || result.stock_location===null) && hasError}">
                  <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{ item.name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="input-wrapper">
                <label for="">Country of origin</label>
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
                <label for="">Dangerous Goods</label>
                <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                        v-model="result.is_dangerous"
                        :class="{invalid: !is_draft && (result.is_dangerous===null) && hasError}">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
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
            <h4>Additional details</h4>
            <p>Enter the details listed below for better discoverability of the product</p>
          </div>
          <h4 class="header-title mt-0 text-capitalize mb-1 ">Additional attributes <span
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
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h16"/>
                </svg>
              </button>
              <button type="button" class="btn ml-2 mr-2 btn-primary"
                      v-if="index+1==result.additional_details_row.length"
                      @click.prevent="addAdditionalDetailsRows(index)">
                <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 1v16M1 9h16"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="button-group border-t border-smooth mt-20">
            <div class="flex justify-end gap-4 pt-3">
              <button type="button" class="btn text-white bg-primary" @click.prevent="doDraft">
                Approved
              </button>
              <button type="button" class="btn text-white bg-error" @click.prevent="isRejected()">
                Rejected
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- -----------------------reject modal----------- -->

      <Modal :showModal="modalVisible" :is_reject_modal="is_reject_modal" :providedId="is_reject_modal"
             @closeModal="closeModal">
        <div class="flex justify-between relative">
          <h4>Rejection reasons in show page </h4>
        </div>
        <div class="mb-4">
          <slot>
            <!-- -------------- -->
            <div class="flex h-[400px] overflow-y-scroll flex-wrap">
              <div class="p-2 w-100 w-full" v-for="(item, index) in allRejectReasons" :key="index">
                <div class="p-2 rounded  h-full items-center">
                  <input type="checkbox" v-model="rejected.reject_reasons" :value="item.id" :class="{ hasError }">
                  <span class="font-medium">{{ item.name }}</span>
                  <textarea
                    class="resize-none border rounded-md mt-2 p-2 focus:outline-none focus:ring focus:border-blue-500"
                    rows="4"
                    readonly
                    v-model="item.description"
                    :placeholder="item.description"
                  ></textarea>

                </div>
              </div>
            </div>
            <!-- --------------- -->
          </slot>

        </div>
        <template v-slot:buttons>
          <button @click="closeModal" class="leading-3 hover:text-primary  px-4 py-2 rounded-md mr-2">Close Modal
          </button>
          <button class="bg-primary leading-3 hover:text-primary text-white px-4 py-2 rounded-md mr-2"
                  @click.prevent="doRejected()">Submit
          </button>
          <!-- Your Submit button or other buttons go here -->
        </template>
      </Modal>
      <!-- -----------------------reject modal end----------- -->
      <!-- -----------------------modal----------------------- -->
      <div v-if="uploadModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:items-start">
                  <div class="mt-3 ">
                    <div class="flex justify-between pb-20 title">
                      <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Please choose a new
                        product creation option</h3>
                      <svg @click.prevent="uploadModalToggle()"
                           class="w-4 h-4  cursor-pointer text-gray-800 dark:text-white mt-2"
                           aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </div>
                    <div class="mt-2">
                      <div class="flex w-full py-4 items-center justify-center bg-grey-lighter">
                        <label
                          class="w-64 flex flex-col items-center px-4 py-2 bg-white text-primary rounded-lg shadow tracking-wide uppercase border border-smooth cursor-pointer hover:bg-primary hover:text-white">
                          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                               viewBox="0 0 20 20">
                            <path
                              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                          </svg>
                          <span class="mt-2 text-base leading-normal">Select a file</span>
                          <input type='file' class="hidden"/>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-20 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-primary  sm:ml-3 sm:w-auto">
                  Upload
                </button>
                <button @click.prevent="uploadModalToggle()" type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ------------------------------------- -->
    </div>

  </div>
</template>
<style scoped>
select option {
  padding: 0.5rem;
}

/* Define custom scrollbar styles */
::-webkit-scrollbar {
  width: 6px; /* Set the width of the scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: #a0aec0; /* Set the color of the scrollbar thumb */
  border-radius: 3px; /* Set the border radius of the scrollbar thumb */
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
import LangInput from "~/components/langInput.vue";
import Service from "~/services/service";
import ProductSearch2 from "~/components/partials/ProductSearch2.vue";
import ProductSearch from "~/components/partials/ProductSearch.vue";
import Modal from "~/components/Modal.vue"

export default {
  name: "pink-tabs",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      modalVisible: false,
      is_reject_modal: false,
      is_show: true,
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      openTab: 1,
      uploadModal: false,
      is_clone: false,
      is_variant: false,
      is_draft: false,
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
      setRejectApi: 'setRejectProduct',
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
      rejected: {
        status: 'rejected',
        product_id: !this.isAdding ? this.$route?.params?.id : '',
        reject_reasons: []
      },
      result: {

        clone_products: [],
        unit_id: 9,
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
        available_quantity: 0,
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
        is_availability: 1,
        is_dangerous: 0,
        is_offer_private_label_option: 1,
        storage_temperature: 0,
        stock_location: 1,
        country_of_origin: 186,
        /*Shipping details*/
        /*Product Identifiers*/
        barcode_type: 0,
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
        pk_size: 0,
        pk_size_unit: 17,
        pk_number_of_carton: 0,
        pk_average_lead_time: 0, //days
        pk_transportation_mode: 1,
        /*packaging end*/
        /*product dimensions start*/
        pdime_weight: 0,
        pdime_weight_unit_id: 17,
        pdime_height: 0,
        pdime_length: 0,
        pdime_width: 0,
        pdime_unit: 0,
        pdime_dimention_unit: 19,
        /*product dimensions end*/
        /*product cartons start*/
        pc_weight: 0,
        pc_weight_unit_id: 17,
        pc_height: 0,
        pc_height_unit_id: 19,
        pc_length: 0,
        pc_length_unit_id: 19,
        pc_width: 0,
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
        brand_id: 0,
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
        image: '',
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
    LangInput
  },

  computed: {
    isInvalidQuantity() {
      return (index) => {
        const currentQuantity = parseFloat(this.result.pp_quantity[index]);
        const firstQuantity = parseFloat(this.result.pp_quantity[index - 1]);
        return currentQuantity <= firstQuantity && this.hasError;
      };
    },
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
      'allBrands', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree', 'allRejectReasons'])
  },

  methods: {
    isRejected() {
      this.modalVisible = true;
      this.is_reject_modal = !this.is_reject_modal;
    },
    closeModal() {
      this.modalVisible = false;
    },
    tableNotShow() {
      this.tableShow = false;
      this.uploadNewText = true;
    },
    productTableShow() {
      this.tableShow = true;
      this.uploadNewText = false;
    },

    cloneProduct(product) {
      console.log(product)
      console.log('product', product)
      // this.id=product.id
      this.fetchingData(product.id).then(() => {
        this.is_clone = false
        this.result.id = ""
      })
    },
    async findSku() {
      try {
        this.loading = true
        var res = Object.assign({}, await this.getById({
          id: this.id,
          params: {sku: this.search_sku},
          api: 'getProductBySku'
        }))
      } catch (e) {
        return this.$nuxt.error(e)
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
      this.checkForm()

    },
    doDraft() {
      this.is_draft = true;
      this.result.is_draft = true;

      if (this.validationKeysIfIsDraft.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      this.checkForm()

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
      this.checkForm()
    },

    updateLevel2() {
      this.result.subCategory = "";  // Reset Level 2 selection
      this.result.category_id = "";  // Reset Level 2 selection
      this.selectedLevel1 = this.allCategoriesTree.find(c => c.id == (this.result.parentCategory));
      this.selectedLevel2 = null;  // Reset Level 2 selection
      this.result.mainCategorySlug = this.selectedLevel1.slug
    },
    updateLevel3() {
      this.result.category_id = "";
      this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCategory));
      this.result.subCategorySlug = this.selectedLevel2.slug
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },
    handleQuantityInput(event, index) {
      this.updatePriceQty('qty', event, index);
      // Add any additional logic related to handling quantity input
    },

    updateBrand(event) {
      this.result.brand_id = event.target.value;
    },
    updateSizeUnit(event) {
      console.log(event.target.value)
      this.result.pk_size_unit = event.target.value;
    },

    updateVariantUnitOfMeasure(event) {
      console.log(event.target.value)
      this.result.variant_unit_of_measure = event.target.value;
    },
    async categorySlug() {
      let main_category = this.selectedLevel1.id;
      let sub_category = this.selectedLevel2.id;
      let child_category = this.selectedLevel3.id;
      if (main_category) {
        // const main_category_slug = this.getRequest({params: {q: main_category}, api: 'getCategoryBySlug'})
        const data = await this.getRequest({params: {q: this.result.selectedMainCategory}, api: 'getCategoryBySlug'})
        this.result.mainCategorySlug = data.slug
        // console.log(data)
      }
      if (sub_category) {
        const data = await this.getRequest({params: {q: this.result.selectedSubCategory}, api: 'getCategoryBySlug'})
        this.result.subCategorySlug = data.slug
      }
      if (child_category) {
        const data = await this.getRequest({params: {q: this.result.selectedChildCategory}, api: 'getCategoryBySlug'})
        this.result.childCategorySlug = data.slug
      }

      return this.result.mainCategorySlug + '/' + this.result.subCategorySlug + '/' + this.result.childCategorySlug;
    },
    async updateSubCategories() {
      this.categorySlug();
      // getRequest({rootState, commit, dispatch}, {params, api})
      const data = await this.getRequest({params: {q: this.result.selectedMainCategory}, api: 'findAllSubCategories'})
      this.subCategories = data

    },
    async updateChildCategories(event) {
      this.categorySlug();
      this.result.selectedSubCategory = event.target.value;
      const data = await this.getRequest({params: {q: this.result.selectedSubCategory}, api: 'findAllSubCategories'})
      this.childCategories = data
    },
    async updateChilCategoriesSlug(event) {
      const data = await this.getRequest({params: {q: this.result.selectedChildCategory}, api: 'getCategoryBySlug'})
      this.result.childCategorySlug = data.slug
    },

    productIdentifiersType(event, attributeNumber) {
      this.result.barcode_type = event.target.value;
      if (this.result.barcode_type !== 0) {
        this.is_barcode = true;
      } else {
        this.is_barcode = false;
      }
    },


    variantValueType(event, attributeNumber) {
      console.log(attributeNumber)
      if (attributeNumber === 1) {
        this.selectedAttribute1 = event.target.value;
        this.disableAttribute2 = false; // Enable attribute 2 when changing attribute 1
      } else if (attributeNumber === 2) {
        // Handle attribute 2 change logic if needed
        this.selectedAttribute2 = event.target.value;
        this.disableAttribute1 = false;
      }
    },
    isAttribute2Disabled(index) {
      // Disable attribute 2 options based on the selected value in attribute 1
      return this.selectedAttribute1 === this.product_variant_type[index];
    },
    isAttribute1Disabled(index) {
      // Disable attribute 1 options based on the selected value in attribute 2
      return this.selectedAttribute2 === this.product_variant_type[index];
    },

    addBasicInfoRows(index) {
      try {
        this.result.basicInfoen.splice(this.result.basicInfoen.length + 1, 1, {ar: '', en: ''});  // Add a new row
      } catch (e) {
        console.log(e);
      }
    },
    removeBasicInfoRows(attribute, index) {
      if (index != 0) {
        if (attribute === 'en') {
          this.result.basicInfoen.splice(index, 1);
          this.result.basicInfoEng.splice(index, 1);
        } else {
          this.result.basicInfoar.splice(index, 1);
          this.result.basicInfoAr.splice(index, 1);
        }
      }

    },

    addBasicInfoRowsAr(index) {
      try {
        this.result.basicInfoar.splice(this.result.basicInfoar.length + 1, 1, {ar: '', en: ''});  // Add a new row
      } catch (e) {
        console.log(e);
      }
    },

    removeBasicInfoRowsAr(index) {
      if (index != 0) {
        this.result.basicInfoar.splice(index, 1);
      }

    },


    addVariantValueRows() {
      this.result.product_variants.push(Object.assign({}, this.product_variant))
    },

    async doRejected() {
      try {
        const atLeastOneSelected = this.rejected.reject_reasons.length > 0;

        if (atLeastOneSelected) {
          const confirmation = await this.$swal({
            title: "Are you sure?",
            icon: "question",
            iconHtml: "؟",
            confirmButtonText: "Yes",
            cancelButtonText: "Noا",
            showCancelButton: true,
            showCloseButton: true,
          });

          if (confirmation) {
            const data = await this.setRequest({
              params: this.rejected,
              api: this.setRejectApi,
            });

            if (data) {
              this.is_reject_modal = false;
              this.modalVisible = false;

              const pathSuffix = this.redirect ? '' : `/show/${this.rejected.product_id}`;
              this.$router.push({ path: `/${this.routeName}${pathSuffix}` });
            }
          }
        } else {
          // Show an error message or handle the validation failure appropriately
          // For example:
          this.$swal({
            title: "Error",
            text: "Please select at least one reason.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in doRejected:", error);
        // Handle error (e.g., show an error message)
      }
    },

    addAdditionalDetailsRows(index) {
      this.result.additional_details_row.push(Object.assign({}, this.additional_details))


      // if (index < this.result.additional_details_row.length) {
      //   this.result.additional_details_row.splice(this.result.additional_details_row.length + 1, 1, {
      //     lebel: '',
      //     attr: ""
      //   },);  // Add a new row
      // } else {
      //   console.error('Index out of bounds.');  // Log an error if index is out of bounds
      // }
    },

    addPriceingRows() {
      try {
        this.result.product_prices.push(Object.assign({}, this.product_price))
        // let index = 0;  // Adjust index based on zero-based indexing
        // if (index < this.result.PriceingRows.length) {
        //   this.result.PriceingRows.splice(this.result.PriceingRows.length + 1, 1, {});  // Add a new row
        // } else {
        //   console.error('Index out of bounds.');  // Log an error if index is out of bounds
        // }
      } catch (e) {
        console.log(e);
      }
    },


    updateVariant(attribute, event, index) {
      console.log(attribute);

      // Convert event.target.value to a string to ensure consistency
      const value = String(event.target.value);
      const attributeIndex = this.result.productVariants.variantTypes.indexOf(attribute);
      if (attributeIndex !== -1) {
        this.result.productVariants.variantValues[attributeIndex][index] = value;
      } else {
        console.error('Invalid attribute.');  // Log an error if the attribute is not found
      }
      // if (attribute === 'color') {
      //   this.result.productVariants.variantValues[0][index] = value;
      // } else {
      //   this.result.productVariants.variantValues[1][index] = value;
      // }
    },

    updatePriceQty(attribute, event, index) {
      if (attribute == 'qty') {
        const value = String(event.target.value);
        this.result.pp_quantity[index] = value;

      }
      if (attribute == 'unit_price') {
        const value = String(event.target.value);
        this.result.pp_unit_price[index] = value;
      }
      if (attribute == 'sale_price') {
        const value = String(event.target.value);
        this.result.pp_selling_price[index] = value;
      }
    },

    removeAdditionalDetailsRows(index) {
      // console.log(index)
      if (index != 0) {
        this.result.additional_details_row.splice(index, 1);
      }
    },

    removePriceingRows(index) {
      console.log(index)
      if (index != 0) {
        // this.result.product_prices.push(Object.assign({}, this.product_price))
        this.result.product_prices.splice(index, 1);
        // this.result.PriceingRows.splice(index, 1);
        // this.result.pp_quantity.splice(index, 1);
        // this.result.pp_unit_price.splice(index, 1);
        // this.result.pp_selling_price.splice(index, 1);
      }
    },

    isAttr(event, attributeType) {
      const value = String(event.target.value);
      console.log(value);
      console.log(this.product_variant_type[value]);

      if (attributeType === 'color') {
        this.disableAttribute2 = value === 'color';
      } else if (attributeType === 'size') {
        this.disableAttribute1 = value === 'size';
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
    async checkForm() {

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        delete this.result.created_at
        delete this.result.updated_at
        const data = await this.setById({id: this.id, params: this.result, api: this.setApi})
        if (data) {

          this.result = Object.assign({}, data)
          // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/' + this.result.id}`})
          this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/'}`})
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
          image: res.image,
          video: res.video,
          status: res.status,
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

          product_variants: res.product_variant?.map(item => ({
            name: item.name,
            value: item.value,
            product_id: item.product_id
          })),
          PriceingRows: res.product_prices,
          is_variant: res.product_variant.length != 0 ? true : false,
          additional_details_row: res.additional_attribute?.map(item => ({name: item.name, value: item.value})),


        }

        this.select_attr1 = 'color';
        this.select_attr2 = 'size';
        // this.result.PriceingRows = res.product_prices
        // this.result.product_variants = res.product_variant?.map(item => ({name: item.name, value: item.value}));
        if (res.product_variant?.length != 0) {
          this.is_variant = true
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
    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree', 'setRequest'])
  },
  async mounted() {
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
    console.log(this.isCloning)
    console.log(this.id)
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
