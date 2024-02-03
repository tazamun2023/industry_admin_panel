<template>
  <div>
    <div class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4>Add new product</h4>
        <p>Fill out the form below to add a new product to your product list</p>
      </div>
      <div>
        <div class="grid grid-cols-4">
          <div class="p-4">
            <div class="flex gap-4 p-2 justify-between">
              <p class="font-bold pt-2">Variants List</p>
              <button @click="varientModal = true" class="border border-smooth p-2 gap-4 w-[140px] leading-3 flex ">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5"/>
                </svg>
                <span class="pt-2">Add Variant</span></button>
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
                                                 src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/61280d015b4563753daf23396c9ef1ee.jpg"
                                                 alt="">
                           <span class="pt-2" v-if="colorItem.color_name && colorItem.value">{{ colorItem.color_name }}, {{
                               colorItem.value
                             }}</span>
                    <span class="pt-2" v-else-if="colorItem.color_name">{{ colorItem.color_name }}</span>
                    <span class="pt-2" v-else-if="colorItem.value">{{ colorItem.value }}</span>
                    <span class="pt-2" v-else>ERROR</span>
                  </span>
                  <p><span class="bg-smooth rounded-lg text-xs mt-2 p-1">Incomplete</span></p>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-span-3">
            <div class="p-4">
              <div class="flex justify-between">
                <h4>Basic information</h4>
                <p class="cursor-pointer underline font-bold" @click="CategorySection = !CategorySection">Edit
                  Category</p>
              </div>


              <div>
                <nav class="text-primary" aria-label="Breadcrumb">
                  <ol class="list-none p-0 inline-flex">
                    <li class="flex items-center">
                      <a href="/" class="text-gray-500 hover:text-gray-700">Home</a>
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
                      <a href="/category" class="text-gray-500 hover:text-gray-700">Category</a>
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
                      <span class="text-gray-700">Current Page</span>
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
                    @input="updateLevel2"
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
                    <label for="">Parent SKU</label>
                    <input type="text" readonly placeholder="554554">
                  </div>
                  <div class="input-wrapper mb-4">
                    <label for="">Product name - English</label>
                    <input type="text" readonly placeholder="Demo product">
                  </div>
                  <div class="input-wrapper mb-4">
                    <label for="">Product name - Arabic <span class="text-xs"> (optional)</span></label>
                    <input type="text" readonly placeholder="Demo product">
                  </div>
                  <div class="input-wrapper mb-4">
                    <label for="">Brand</label>
                    <input type="text" readonly placeholder="Apple">
                  </div>
                </form>
              </div>
              <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <form action="">
                  <div class="input-wrapper mb-4">
                    <label for="">Parent SKU</label>
                    <input type="text" readonly placeholder="554554">
                  </div>
                  <div class="input-wrapper mb-4">
                    <label for="">Product name - English</label>
                    <input type="text" readonly placeholder="Demo product2">
                  </div>
                  <div class="input-wrapper mb-4">
                    <label for="">Product name - Arabic <span class="text-xs"> (optional)</span></label>
                    <input type="text" readonly placeholder="Demo product2">
                  </div>
                  <div class="input-wrapper mb-4">
                    <label for="">Brand</label>
                    <input type="text" readonly placeholder="Apple">
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
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Unit of measure</h4>
        <div class="form-group input-wrapper for-lang ar-lang">
          <label class="w-full" for="name">Unit of measure</label>
          <select class="w-50 rounded border mb-10 border-smooth p-3" name="" id="">
            <option value="">Unit</option>
            <option value="">KG</option>
            <option value="">TG</option>
            <option value="">LTR</option>
            <option value="">GRM</option>
            <option value="">KM</option>
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
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Variant information</h4>
        <div class="card-body mt-10">
          <div class="form-check">
            <input checked disabled class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              This product has options, like size or color
            </label>
          </div>
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
                <input class="form-control  w-100" name="Enter Value" placeholder="Enter Value" type="text" value="">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <input class="form-control  w-100" name="Enter Value" type="text" placeholder="Enter Value" value="">
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
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Basic Information </h4>
        <div class="card-body">
          <div class="input-wrapper mb-10">
            <label for="">Key features - English ?</label>
            <div class="flex">
              <input class="form-control required" name="Type keyword and press enter (eg. Laptop)..." type="text"
                     value="">
              <button type="submit" class="btn ml-2 mr-2  btn-primary">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 1v16M1 9h16"/>
                </svg>
              </button>
            </div>
            <div class="flex append-input pt-1">
              <input class="form-control required" name="Type keyword and press enter (eg. Laptop)..." type="text"
                     value="">
              <button type="submit" class="btn ml-2 mr-2   btn-danger">
                <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h16"/>
                </svg>
              </button>
              <button type="submit" class="btn ml-2 mr-2 btn-primary">
                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 1v16M1 9h16"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="input-wrapper mb-10">
            <label for="">Key features - Arabic(optional) ?</label>
            <div class="flex">
              <input dir="rtl" class="form-control required" name="Type keyword and press enter (eg. Laptop)..."
                     type="text" value="">
              <button type="submit" class="btn ml-2 mr-2  btn-primary">
                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 1v16M1 9h16"/>
                </svg>
              </button>
            </div>
            <div class="flex append-input pt-1">
              <input dir="rtl" class="form-control required" name="Type keyword and press enter (eg. Laptop)..."
                     type="text" value="">
              <button type="submit" class="btn ml-2 mr-2   btn-danger">
                <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h16"/>
                </svg>
              </button>
              <button type="submit" class="btn ml-2 mr-2 btn-primary">
                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 1v16M1 9h16"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="input-wrapper mb-10">
            <label for="">Keywords - English ?</label>
            <input class="form-control required" name="Type keyword and press enter (eg. Laptop)..." type="text"
                   value="">
          </div>
          <div class="input-wrapper mb-10">
            <label for="">Keywords - Arabic ?</label>
            <input dir="rtl" class="form-control required" name="Type keyword and press enter (eg. Laptop)..."
                   type="text"
                   value="">
          </div>
        </div>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Description</h4>
        <div class="input-wrapper mb-10">
          <label for="">Long description - English (optional)</label>
          <textarea name="" class="form-control summernote-editor"></textarea>
        </div>
        <div class="input-wrapper mb-10" dir="rtl">
          <label for="">Long description - Arabic(optional)</label>
          <textarea dir="rtl" name="" class="form-control summernote-editor"></textarea>
        </div>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <div class="flex pl-4">
          <h4 class="header-title mt-0 text-capitalize mb-1">Images and Videos</h4>
          <span @click="uploadModalToggle()" class="font-bold ml-auto cursor-pointer text-primary">Upload media</span>
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
            <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal" v-on:click="toggleTabs(99)"
               v-bind:class="{'bg-white border-white border-b-2': openTab !== 99, 'border-b-2 border-primary': openTab === 99}">
              Selected Media (0 of 16)
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(100)"
               v-bind:class="{'bg-white border-white border-b-t': openTab !== 100, 'border-b-2 border-primary': openTab === 100}">
              Select from media bank
            </a>
          </li>
        </ul>

        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
          <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div v-bind:class="{'hidden': openTab !== 99, 'block': openTab === 99}">
                <div @click="uploadModalToggle()"
                     class="text-center cursor-pointer p-4 border border-dotted border-smooth rounded">
                  <svg class="w-6 h-6 mx-auto text-gray-800 " aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path
                      d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
                  <label><strong>Drag & Drop images here to upload</strong></label> <br>
                  <label>or click the “Upload media” button</label>
                </div>
              </div>
              <div v-bind:class="{'hidden': openTab !== 100, 'block': openTab === 100}">
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
                        <svg class="w-4 h-4 text-gray-800 " aria-hidden="true"
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
                                <svg class="w-2 h-2 text-gray-800 " aria-hidden="true"
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
                            <svg class="w-4 h-4 text-gray-800 " aria-hidden="true"
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
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1">Product Identifiers</h4>
        <p class="text-sm">Enter barcode type and number for improved search/visibility of your product.</p>
        <div class="grid grid-cols-2 gap-4">

          <div class="input-wrapper mt-3 mt-sm-0">
            <label class="w-full">Barcode type</label>
            <select data-plugin="customselect" class="form-control w-full p-3 border border-smooth rounded-lg">
              <option value="0">EAN</option>
              <option value="1">GTIN</option>
              <option value="2">Product does not have barcode number</option>
            </select>
          </div>
          <div class="form-group input-wrapper mt-3 mt-sm-0">
            <label>Barcode</label>
            <input type="text" class="form-control not-allowed-cursor bgdark" placeholder="Please enter barcode number"
                   disabled>
          </div>
          <div class="form-group input-wrapper  mt-3 mt-sm-0">
            <label>SKU</label>
            <input type="text" class="form-control" placeholder="sku" disabled>
          </div>
        </div>
      </div>
      <!-- ------------------------------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
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
          <input type="text" class="form-control">
          <label>Minimum order quantity: 1</label>
        </div>
      </div>
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Packaging</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="input-wrapper">
            <label for="">Size ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Size" aria-label="Recipient's username"
                     aria-describedby="button-addon2">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth w-1/3">
                  <option value="0">KG</option>
                  <option value="1">LB</option>
                  <option value="2">LT</option>
                  <option value="3">Product does not have barcode number</option>
                </select>
              </div>
            </div>


          </div>
          <div class="input-wrapper">
            <label for="">Number of units per carton</label>
            <div class=" mb-3">
              <input type="text" class="form-control" placeholder="Size" aria-label="Units per carton"
                     aria-describedby="button-addon2">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">Average lead time (Days) ?</label>
            <div class=" mb-3">
              <input type="text" class="form-control" placeholder="Avg. Lead Time" aria-label="Units per carton"
                     aria-describedby="button-addon2">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">Transportation Mode</label>
            <div class=" mb-3">
              <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg">
                <option value="0">Regular</option>
                <option value="1">Food Ambient</option>
                <option value="1">Food Chilled</option>
                <option value="2">Food Frozen</option>
                <option value="2">N/A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!-- ----------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Carton Dimensions & Weight</h4>
        <p>Enter the dimensions and weight of the carton to help calculate shipping rate. These measurements are for the
          product's shipping container.</p>
        <div class="grid grid-cols-2 gap-4">
          <div class="input-wrapper">
            <label for="">Weight ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                     aria-label="Recipient's username"
                     aria-describedby="button-addon2">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth w-1/3">
                  <option value="0">KG</option>
                  <option value="1">LB</option>
                  <option value="2">LT</option>
                  <option value="3">Product does not have barcode number</option>
                </select>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">Length ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Length"
                     aria-label="Recipient's username"
                     aria-describedby="button-addon2">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth w-1/3">
                  <option value="0">KG</option>
                  <option value="1">LB</option>
                  <option value="2">LT</option>
                  <option value="3">Product does not have barcode number</option>
                </select>
              </div>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="">Height ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Height"
                     aria-label="Recipient's username"
                     aria-describedby="button-addon2">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth w-1/3">
                  <option value="0">KG</option>
                  <option value="1">LB</option>
                  <option value="2">LT</option>
                  <option value="3">Product does not have barcode number</option>
                </select>
              </div>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="">Width ?</label>
            <div class="relative flex input-group gap-4 mb-3">
              <input type="text" class="form-control pr-12" placeholder="Carton Width" aria-label="Recipient's username"
                     aria-describedby="button-addon2">
              <div class="absolute right-0 top-0">
                <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth w-1/3">
                  <option value="0">KG</option>
                  <option value="1">LB</option>
                  <option value="2">LT</option>
                  <option value="3">Product does not have barcode number</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- ----------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Product dimensions & weight</h4>
        <p>These attributes provide information about the product's dimensions and weight.</p>
        <div class="input-wrapper">
          <label for="">Weight ?</label>
          <div class="relative flex input-group gap-4 w-50 mb-3">
            <input type="text" class="form-control pr-12" placeholder="Carton Weight" aria-label="Recipient's username"
                   aria-describedby="button-addon2">
            <div class="absolute right-0 top-0">
              <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth w-1/3">
                <option value="0">KG</option>
                <option value="1">LB</option>
                <option value="2">LT</option>
                <option value="3">Product does not have barcode number</option>
              </select>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="input-wrapper">
            <label for="">Length ?</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter Length" aria-label="Recipient's username"
                     aria-describedby="button-addon2">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">Height ?</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter Height" aria-label="Recipient's username"
                     aria-describedby="button-addon2">
            </div>
          </div>

          <div class="input-wrapper">
            <label for="">Width ?</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter Width" aria-label="Recipient's username"
                     aria-describedby="button-addon2">
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">Dimension Unit</label>
            <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg">
              <option value="0">CM</option>
              <option value="1">M</option>
              <option value="1">IN</option>
            </select>
          </div>
        </div>

      </div>
      <!-- ----------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Pricing</h4>
        <div class="input-wrapper">
          <label for="">Unit of measure ?</label>
          <div class="input-group mb-3">
            <select data-plugin="customselect" class="border p-3 w-50 border-smooth rounded-lg">
              <option value="0">Unit</option>
              <option value="1">MG</option>
              <option value="1">LG</option>
              <option value="2">KG</option>
              <option value="2">LG</option>
              <option value="2">TG</option>
              <option value="2">Mm</option>
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
            <tr>
              <td class="p-2"><input type="text" class="form-control" placeholder="Enter Quantity"></td>
              <td class="p-2">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">AED</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price">
                </div>
              </td>
              <td class="p-2">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">AED</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price">
                </div>
              </td>
              <td class="p-2">
              </td>
            </tr>
            <tr>
              <td class="p-2"><input type="text" class="form-control" placeholder="Enter Quantity"></td>
              <td class="p-2">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">AED</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price">
                </div>

              </td>
              <td class="p-2">
                <div class="relative flex">
                  <label class="pricename absolute left-0 top-0 p-3" for="">AED</label>
                  <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price">
                </div>
              </td>
              <td class="p-2">
                <button type="submit" class="btn  btn-outline-secondary">
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
          <button class="btn btn-link fw-bold">+ ADD TIER</button>
        </div>
      </div>
      <!-- ----------------- -->
      <div class="my-10"></div>
      <!-- ------------------------------------- -->
      <div class="tab-sidebar p-3">
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Shipping details</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Is Ready To Ship ?</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">Yes</option>
                <option value="">No</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Is Buy Now ?</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">Yes</option>
                <option value="">No</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Availability</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">In Stock</option>
                <option value="">Out of Stock</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Offer Private Label Option ?</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">Yes</option>
                <option value="">No</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Storage temperature</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">Select Option</option>
                <option value="">Dry (min 28C, max:NA)</option>
                <option value="">Chilled (min 2C, max: 8C)</option>
                <option value="">Frozen (min -5C, max -5C)</option>
                <option value="">Chilled (min 2C, max: 8C)</option>
                <option value="">Room temperature (min 15C, max 25C)</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Stock Location</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">Country</option>
                <option value="">Makkah</option>
                <option value="">Madina</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="input-wrapper">
              <label for="">Country of origin</label>
              <select class="border p-3 w-full border-smooth rounded-lg" name="" id="">
                <option value="">Country</option>
                <option value="">Bangladesh</option>
                <option value="">Yameen</option>
                <option value="">KSA</option>
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
          <h4>Additional details</h4>
          <p>Enter the details listed below for better discoverability of the product</p>
        </div>
        <h4 class="header-title mt-0 text-capitalize mb-1 ">Additional attributes <span
          class="text-xs">(optional)</span>
        </h4>
        <div class="input-wrapper">
          <div class="flex">
            <input style="width:200px" class="form-control mr-2 ml-2" placeholder="Label for Field" type="text"
                   value="">
            <input class="form-control" placeholder="Text to display" type="text" value="">
            <button type="submit" class="btn ml-2 mr-2  btn-primary">
              <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
          <div class="flex append-input pt-1">
            <input style="width:200px" class="form-control mr-2 ml-2" placeholder="Label for Field" type="text"
                   value="">
            <input class="form-control" placeholder="Text to display" type="text" value="">
            <button type="submit" class="btn ml-2 mr-2   btn-danger">
              <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16"/>
              </svg>
            </button>
            <button type="submit" class="btn ml-2 mr-2 btn-primary">
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
            <!-- <button type="submit" class="btn text-primary">
              Save Draft
            </button> -->
            <button type="submit" class="btn bg-primary text-white border-secondary">
              <span>Send for review</span>
            </button>
          </div>
        </div>
      </div>
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
                      <svg @click="uploadModalToggle()" class="w-4 h-4  cursor-pointer text-gray-800  mt-2"
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
                <button @click="uploadModalToggle()" type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
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
import {mapGetters} from "vuex";

export default {
  name: "Variant",
  inject: [],
  props: {
    result: Object,
    selectedLevel1: Object,
    selectedLevel2: Object,
    selectedLevel3: Object,
  },
  data() {
    return {
      injectedData: this.exampleData,
      openTab: 'parent',
      uploadModal: false,
      varientModal: false,
      CategorySection: false
    }
  },
  computed:{
    ...mapGetters(['mediaStorage']),
    ...mapGetters('admin', ['publicKey']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['allCategories', 'allTaxRules', 'allAttributes',
      'allBrands', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  methods: {
    toggleTabs: function (tab) {
      this.openTab = tab
    },
    uploadModalToggle() {
      this.uploadModal = !this.uploadModal
    },
  }
}
</script>
