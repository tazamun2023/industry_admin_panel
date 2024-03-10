<template>
  <div>
    <ValidationObserver class="w-full" v-slot="{ invalid }">
      <!-- ---------------- -->
      <div class="tab-sidebar">
        <div class="col-md-12 p-4 title">
          <h4>{{ $t('prod.add_new_product') }}</h4>
          <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>
        </div>
      </div>

      <div>
        <form>
          <!-- --------------------------- -->
          <div class="my-10"></div>
          <!-- ------------------------------------- -->
          <div id="product_form" class="tab-sidebar p-3">

            <div class="d-flex justify-content-between  align-items-center">
              <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic information') }}</h4>
            </div>
            <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
                        @updateInput="updateInput"></lang-input>
            <ValidationProvider name="brand" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.brand', { type: $t('prod.brand')}) }">
              <div class="form-group input-wrapper mb-10  for-lang ar-lang">
                <label class="w-full" for="name">{{ $t("prod.brand") }}</label>
                <select class="form-control w-full rounded border border-smooth p-3" @change="updateBrand($event)"
                        v-model="result.brand_id">
                  <option value="">Select Brand</option>
                  <option v-for="(item, index) in allBrands" :key="index" :value="item.id">{{ item.title }}</option>
                </select>
              </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="sku" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.sku', { type: $t('prod.SKU')}) }">
              <div class="form-group input-wrapper  mt-3 mt-sm-0">
                <label>{{ $t('prod.SKU') }}</label>
                <input type="text" class="form-control" v-model="result.sku" placeholder="sku">
              </div>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>

            <div class="grid grid-cols-3 gap-4">
              <!-- Main Category Dropdown -->
              <ValidationProvider name="parentCategory" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('rfq.Search by Category')}) }">
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
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <!-- Sub Category Dropdown -->
              <ValidationProvider name="subCategory" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('rfq.Select Sub Category')}) }">
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
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <!-- Child Category Dropdown -->
              <ValidationProvider name="childCategory" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('rfq.Select Child Category')}) }">
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
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <lang-input :hasError="hasError" type="textarea" :title="$t('prod.desc')"
                        :valuesOfLang="result.description"
                        @updateInput="updateInput"></lang-input>

          </div>

          <div class="my-10"></div>
          <div class="tab-sidebar p-3">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Pricing') }}</h4>
            <div class="grid grid-cols-2">
              <ValidationProvider name="brand" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.sku', { type: $t('prod.sku')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Unit of measure') }} ?</label>
                  <div class="input-group mb-3">
                    <select class="border p-3 w-50 border-smooth rounded-lg uppercase"
                            v-model="result.unit_id">
                      <option value="">{{ $t('prod.Unit') }}</option>
                      <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider name="selling_price" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.selling_price', { type: $t('prod.selling_price')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Price') }} ?</label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="$t('prod.selling_price')"
                      @keypress="onlyNumber"
                      v-model="result.product_prices.selling_price"
                      @input="stockCheck"
                    >
                  </div>
                </div>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="my-10"></div>

          <div class="tab-sidebar p-3">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Item Dimensions & Weight') }}</h4>
            <p>{{ $t("prod.These attributes provide information about the product's dimensions and weight") }}.</p>
            <div class="input-wrapper">
              <label for="">{{ $t('prod.Weight') }} ?</label>
              <div class="relative flex input-group gap-4 w-50 mb-3">
                <div class="flex flex-col w-full">
                  <ValidationProvider name="pdime_weight" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pdime_weight', { type: $t('prod.pdime_weight')}) }">
                    <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                           aria-label="Recipient's username"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pdime_weight">
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="flex flex-col">
                  <ValidationProvider name="pdime_weight_unit_id" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pdime_weight_unit_id', { type: $t('prod.pdime_weight_unit_id')}) }">
                    <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                            v-model="result.pdime_weight_unit_id">
                      <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

            </div>
            <div class="grid grid-cols-4 gap-4">
              <div class="input-wrapper">
                <label for="pdime_length">{{ $t('prod.Length') }} ?</label>
                <div class="input-group mb-3">
                  <ValidationProvider name="pdime_length" rules="required" v-slot="{ errors }"
                                      :custom-messages="{ required: $t('global.pdime_length', { type: $t('prod.pdime_length') }) }">
                    <input type="text" class="form-control" placeholder="Enter Length" aria-label="length"
                           @keypress="onlyNumber" aria-describedby="button-addon2" v-model="result.pdime_length">
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <ValidationProvider name="pdime_height" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.pdime_height', { type: $t('prod.pdime_height')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Height') }} ?</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter Height" aria-label="height"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pdime_height">
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="pdime_width" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.pdime_width', { type: $t('prod.pdime_width')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Width') }} ?</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter Width" aria-label="Width"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pdime_width">
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="pdime_dimention_unit" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.pdime_dimention_unit', { type: $t('prod.pdime_dimention_unit')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Dimension Unit') }}</label>
                  <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                          v-model="result.pdime_dimention_unit">
                    <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                        item.name
                      }}
                    </option>
                  </select>
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

          </div>

          <div class="my-10"></div>
          <!-- ------------------------------------- -->
          <div class="tab-sidebar p-3">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Carton Dimensions & Weight') }}</h4>
            <p>
              {{
                $t("prod.Enter the dimensions and weight of the carton to help calculate shipping rate.These measurements are for the product's shipping container")
              }}.</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Weight') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <ValidationProvider name="pc_weight" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_weight', { type: $t('prod.pc_weight')}) }">
                    <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                           aria-label="Recipient's username"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pc_weight">
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>

                  <ValidationProvider name="pc_weight_unit_id" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_weight_unit_id', { type: $t('prod.pc_weight_unit_id')}) }">
                    <div class="relative"> <!-- Remove absolute positioning -->
                      <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                              v-model="result.pc_weight_unit_id">
                        <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Length') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <ValidationProvider name="pc_length" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_length', { type: $t('prod.pc_length')}) }">
                    <input type="text" class="form-control pr-12" placeholder="Carton Weight"
                           aria-label="Recipient's username"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pc_length">
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>

                  <ValidationProvider name="pc_length_unit_id" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_length_unit_id', { type: $t('prod.pc_length_unit_id')}) }">
                    <div class="relative"> <!-- Remove absolute positioning -->
                      <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                              v-model="result.pc_length_unit_id">
                        <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>


              <div class="input-wrapper">
                <label for="">{{ $t('prod.Height') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <ValidationProvider name="pc_height" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_height', { type: $t('prod.pc_height')}) }">
                    <input type="text" class="form-control pr-12" placeholder="Carton Height"
                           aria-label="Height"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pc_height">
                  </ValidationProvider>
                  <ValidationProvider name="pc_height_unit_id" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_height_unit_id', { type: $t('prod.pc_height_unit_id')}) }">
                    <div class="relative">
                      <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                              v-model="result.pc_height_unit_id">
                        <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="input-wrapper">
                <label for="">{{ $t('prod.Width') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <ValidationProvider name="pc_width" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_width', { type: $t('prod.pc_width')}) }">
                    <input type="text" class="form-control pr-12" placeholder="Carton Width"
                           aria-label="width"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pc_width">
                  </ValidationProvider>
                  <ValidationProvider name="pc_width_unit_id" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pc_width_unit_id', { type: $t('prod.pc_width_unit_id')}) }">
                    <div class="relative">
                      <select data-plugin="customselect" class="p-2 m-1 float-right border-l border-smooth uppercase"
                              v-model="result.pc_width_unit_id">
                        <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

            </div>
          </div>
          <!-- ----------------- -->
          <div class="my-10"></div>
          <!-- ------------------------------------- -->
          <div class="tab-sidebar p-3">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
            <div class="grid grid-cols-2 gap-4">
              <ValidationProvider name="pk_average_lead_time" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.pk_average_lead_time', { type: $t('prod.pk_average_lead_time')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label>
                  <div class=" mb-3">
                    <input type="text" class="form-control" placeholder="Avg. Lead Time" aria-label="Units per carton"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pk_average_lead_time">
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="pk_transportation_mode" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.pk_transportation_mode', { type: $t('prod.pk_transportation_mode')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Transportation Mode') }}</label>
                  <div class="mb-3">
                    <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                            v-model="result.pk_transportation_mode"
                    >
                      <option :value="index" v-for="(item, index) in allTransportationModes" :key="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="storage_temperature" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.storage_temperature', { type: $t('prod.storage_temperature')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Storage temperature') }}</label>
                  <select class="border p-3 w-full border-smooth rounded-lg"
                          v-model="result.storage_temperature">
                    <option value="" disabled>Select Option</option>
                    <option v-for="(item, index) in allStorageTemperatures" :key="index" :value="index">{{ item.name }}
                    </option>
                  </select>
                </div>
              </ValidationProvider>
              <div class="input-wrapper">
                <label for="">{{ $t('prod.Size') }} ?</label>
                <div class="relative flex input-group gap-4 mb-3">
                  <ValidationProvider name="pk_size" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pk_size', { type: $t('prod.pk_size')}) }">
                    <input type="text" class="form-control pr-12" placeholder="Size" aria-label="Recipient's username"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pk_size">
                  </ValidationProvider>
                  <ValidationProvider name="pk_size" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: $t('global.pk_size', { type: $t('prod.pk_size')}) }">
                    <div class="relative">
                      <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                              @change="updateSizeUnit($event)"
                              v-model="result.pk_size_unit"
                      >
                        <option value="">{{ $t('prod.Size Unit') }}</option>
                        <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{
                            item.name
                          }}
                        </option>
                      </select>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <ValidationProvider name="pk_number_of_carton" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.pk_number_of_carton', { type: $t('prod.pk_number_of_carton')}) }">
                <div class="input-wrapper">
                  <label for="">{{ $t('prod.Number of units per carton') }}</label>
                  <div class=" mb-3">
                    <input type="text" class="form-control" placeholder="Size" aria-label="Units per carton"
                           @keypress="onlyNumber"
                           aria-describedby="button-addon2" v-model="result.pk_number_of_carton">
                  </div>
                </div>
              </ValidationProvider>
            </div>
          </div>

          <div class="my-10"></div>
          <!-- ------------------------------------- -->
          <div class="tab-sidebar p-3">
            <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Shipping details') }}</h4>
            <div class="grid grid-cols-2 gap-4">
              <ValidationProvider name="is_ready_to_ship" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.is_ready_to_ship', { type: $t('prod.is_ready_to_ship')}) }">
                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Is Ready To Ship') }} ?</label>
                    <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                            v-model="result.is_ready_to_ship">
                      <option value="1">{{ $t('prod.Yes') }}</option>
                      <option value="0">{{ $t('prod.No') }}</option>
                    </select>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="is_buy_now" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.is_buy_now', { type: $t('prod.is_buy_now')}) }">
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
              </ValidationProvider>
              <ValidationProvider name="stock_location" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.stock_location', { type: $t('prod.Country of production')}) }">
                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Country of production') }}</label>
                    <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.stock_location">
                      <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="country_of_origin" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.country_of_origin', { type: $t('prod.Stock Location')}) }">
                <div class="col-md-6">
                  <div class="input-wrapper">
                    <label for="">{{ $t('prod.Stock Location') }}</label>
                    <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.country_of_origin">
                      <option v-for="(item, index) in allCountries" :key="index" :value="index" disabled>{{
                          item.name
                        }}
                      </option>
                    </select>
                  </div>
                </div>
              </ValidationProvider>
            </div>
          </div>

          <div class="my-10"></div>
          <!-- ------------------------------------- -->
          <div class="tab-sidebar p-3">
            <div class="input-wrapper">
              <label class="pl-4 pt-0 fw-bold">
                {{ $t('prod.Images and Videos') }}
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
              <tr v-for="(image, index) in result.images" :key="index">
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
            <upload-files @updateInput="saveAttachment"></upload-files>

            <div class="button-group border-t border-smooth mt-20">
              <div class="flex justify-end gap-4 pt-3">
                <button type="button" class="btn text-primary">
                  {{ $t('prod.Cancel') }}
                </button>
                <button type="button" class="btn bg-primary text-white border-secondary" :disabled="invalid"
                        @click.prevent="doAddProduct">
                  {{ $t('prod.Add Product') }}
                </button>
              </div>
            </div>
          </div>

        </form>

      </div>
    </ValidationObserver>
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
import Variant from "~/components/variant/variant.vue";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {extend} from 'vee-validate';

extend('min', {
  validate(value, {length}) {
    return value.length >= length;
  },
  params: ['length'],
  message: 'The {_field_} field must have at least {length} characters'
});


export default {
  name: "Quote",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_next: false,
      is_variant_save: false,
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      isThumb: null,
      isFirstThumb: null,
      openTab: 1,
      uploadModal: false,
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
      validationKeysIfVariantNext: ['parentCategory', 'subCategory', 'childCategory', 'brand_id', 'parent_sku'],
      subCategories: [],
      childCategories: [],
      features: {"ar": "", "en": ""},
      errorMessage: '',
      product_price: {
        "quantity": 1,
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
        is_quote: true,
        hts_code: '',
        parent_sku: '',
        clone_products: [],
        unit_id: 9,
        variants_type: [],
        product_variant: [],
        product_variants: [],
        features: [
          {"ar": "", "en": ""},
        ],
        product_prices: {
          "quantity": 1,
          "unit_price": "",
          "selling_price": "",
        },
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
        storage_temperature: '',
        stock_location: 1,
        country_of_origin: 193,
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
        pk_size_unit: '',
        pk_number_of_carton: 0,
        pk_average_lead_time: '', //days
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
      'allBrands', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  watch: {
    // getThumb(isThumb)
    selectedColor(newIndex) {

    }
  },

  methods: {
    compareMethods() {
      if (this.min_qty === this.result.available_quantity) {
        this.result.is_availability = 1;
      } else if (this.min_qty > this.result.available_quantity) {
        this.result.is_availability = 0;
      } else {
        this.result.is_availability = 1;
      }

    },
    stockCheck() {
      // console.log(this.result.product_prices)
      this.result.product_prices.unit_price = this.result.product_prices.selling_price
      // this.min_qty = Math.min(...this.result.product_prices.map(item => item.quantity));
      // this.compareMethods();
      //
      // const firstQty = parseInt(this.result.product_prices[0]?.quantity);
      // const secondQty = parseInt(this.result.product_prices[1]?.quantity);
      // const thirdQty = parseInt(this.result.product_prices[2]?.quantity);
      //
      // if (firstQty && secondQty) {
      //   if (firstQty > secondQty) {
      //     this.hasErrorQty = index
      //   }
      // }
      //
      // if (secondQty && thirdQty) {
      //   if (secondQty > firstQty && thirdQty > secondQty) {
      //     this.hasError = true
      //   }
      // }

    },
    availableQuantity() {
      // const ava_qty = this.result.available_quantity;
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

    cloneProduct(product) {
      console.log(product)
      console.log('product', product)
      // this.id=product.id
      this.fetchingData(product.id).then(() => {
        this.is_clone = false
        this.result.id = ""
      })
    },
    doNext() {
      if (this.validationKeysIfVariantNext.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      this.is_next = true

    },
    doVariantReset() {

    },

    pvTypeToggle() {
      this.pv_type = !this.pv_type;
    },

    doVariantSave() {
      if (this.result.product_variants.length === 0) {
        this.$swal({
          icon: "error",
          title: "No variants added!",
          showConfirmButton: false,
          timer: 1000
        });
        return false;
      }
      this.is_variant_save = !this.is_variant_save
    },

    doAddProductVariant() {
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

    doAddProduct() {
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
        await this.setById({id: this.id,
          params: {
            result: {
              ...this.result,
              rfq_id: this.$route.query?.quote,
              rfq_product_id: this.$route.query?.rfq_product_id
            },
          },
          api: this.setApi
        })
        if (this.$route.query?.quote > 0) {
          this.$router.push({path: `/rfq/${this.$route.query?.quote}`})
        }
        //
        // this.result = Object.assign({}, data)
        // // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/' + this.result.id}`})
        // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/'}`})
        // }

        //
        // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/approved'}`})
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
        console.log('res', res)
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
    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree'])
  },
  async mounted() {
    this.getThumb(this.isThumb)
    if (this.min_qty === this.result.available_quantity) {
      this.result.is_availability = 1;
    } else if (this.min_qty > this.result.available_quantity) {
      this.result.is_availability = 0;
    } else {
      this.result.is_availability = 1;
    }
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
