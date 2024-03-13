<template>
  <div>
    <h3>Rfq Details</h3>
    <div class="card pb-4">
      <div class="flex justify-between items-center px-4 py-3 bg-primary rounded-t">
        <div class="flex gap-4">
          <span class="font-bold text-white">RFQ281</span>
          <span class="bg-white p-2 rounded-lg leading-3 capitalize">approved</span>
        </div>
        <div class="flex gap-4">
          <p class="text-white">Submit Quote: <span class="font-bold">1</span></p>
          <p class="text-white">Expires on: <span class="font-bold"> 2024-02-22</span></p>
          <p class="text-white">Created on: <span class="font-bold">09:08 AM, 14 Feb, 24</span></p>
        </div>
      </div>
      <div class="w-full my-4 px-4 mb-8 overflow-hidden rounded-lg">
        <div class="w-full overflow-x-auto">
          <table>
            <thead>
            <tr class="text-md font-semibold tracking-wide text-left uppercase border-b border-smooth">
              <th>PRODUCTS</th>
              <th>CATEGORY</th>
              <th>QUANTITY</th>
              <th>UNIT TARGET PRICE</th>
              <th>TOTAL TARGET PRICE</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="px-4 py-3 border  border-smooth">
                <div class="flex gap-4 items-center">
                  <img class="rounded-full w-10 h-10 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                  <a class="text-primary underline">Al Mudhish Tea Milk Catering 410g x 48</a>
                </div>
              </td>
              <td  class="px-4 py-3 border  border-smooth">
                Category name static
              </td>
              <td  class="px-4 py-3 border border-smooth">
                3 kartoon
              </td>
              <td  class="px-4 py-3 border border-smooth ">
                SAR 3
              </td>
              <td  class="px-4 py-3 border  border-smooth">
                SAR 9
              </td>
            </tr>
            <tr>
              <td  class="px-4 py-3 border  border-smooth">
                <div class="flex gap-4 items-center">
                  <img class="rounded-full w-10 h-10 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                  <a class="text-primary underline">Al Mudhish Tea Milk Catering 410g x 48</a>
                </div>
              </td>
              <td  class="px-4 py-3 border  border-smooth">
                Category name static
              </td>
              <td  class="px-4 py-3 border  border-smooth">
                3 kartoon
              </td>
              <td  class="px-4 py-3 border  border-smooth">
                SAR 3
              </td>
              <td  class="px-4 py-3 border  border-smooth">
                SAR 9
              </td>
            </tr>
            <tr class="border-b border-smooth">
              <td class="text-end px-4 py-3 border  border-smooth" colspan="3">
                <h4>RFQ Total Value <span class="text-xs text-primary"> (Excl.VAT)</span></h4>
              </td>
              <td colspan="2"  class="px-4 py-3 border border-smooth">
                <p class="font-bold">SAR 3</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div class="grid grid-cols-2 px-4 gap-4">
        <div class="relative">
          <div class="shodow bg-primarylight h-[150px] rounded-lg p-4">
            <h4>Shipping details</h4>
            <p>Shipping country : <span class="text-primary">Tonga</span></p>
            <p>Shipping country : <span class="text-primary">Kakamega</span></p>
            <p>Shipping terms : <span></span></p>
          </div>
        </div>
        <div class="relative">
          <div class="shodow bg-primarylight h-[150px] rounded-lg p-4">
            <h4>Additional Information</h4>
            <p>Additional Details:  <span class="text-primary">Et cupiditate omnis soluta dignissimos tempore ipsum officia inventore sint velit.</span></p>
            <p>Attachments: <span></span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- ========================== -->

    <!-- ========================== -->

    <template>
      <div>
        <div class="glide">
          <div class="flex justify-between">
            <div class="my-4 flex items-center gap-4">
              <h3>Quotation Received </h3>
              <span class="text-xs text-primary border border-smooth px-2 rounded flex gap-1 items-center"><img class="h-2 w-2" src="~/assets/icon/gline.svg" alt="">2</span>
            </div>
            <div class="glide__arrows px-4 my-3" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left border border-primary" data-glide-dir="<"><svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
              </svg></button>
              <button class="glide__arrow glide__arrow--right  border border-primary" data-glide-dir=">"><svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
              </svg></button>
            </div>
          </div>
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide">
                <div class="card p-4">
                  <div class="border border-smooth rounded-lg">
                    <div class="flex justify-between border-b border-smooth p-3">
                      <p><span class="font-bold">Quote ID</span> 659</p>
                      <p>Price Valid Until <span class="text-primary">12-12-2024</span></p>
                      <span class="bg-smooth p-2 rounded uppercase">Submitted quote</span>
                    </div>
                    <div  class="flex justify-between border-b border-smooth p-3">
                      <p class="font-bol text-primary">************</p>
                      <span class="bg-smooth p-2 rounded uppercase">Verified</span>
                      <p></p>
                    </div>
                    <div  class="gap-4 border-b border-smooth p-3">
                      <button class="border border-primary bg-primary p-2 leading-3 text-white rounded-lg uppercase m-1">ACCEPT & CHECKOUT</button>
                      <button class="border border-primary p-2 leading-3 text-primary rounded-lg uppercase m-1">view quote</button>
                      <button class="border border-primary p-2 leading-3 text-primary rounded-lg uppercase m-1">SEND COUNTER OFFER</button>
                      <button class="border border-error p-2 leading-3 text-error rounded-lg uppercase m-1">REJECT QUOTE</button>
                    </div>
                    <div  class="grid grid-cols-2 gap-4 border-b border-smooth p-3">
                      <div>
                        <p><span class="font-bold">Total price</span> <span class="text-primary">(Excl. shipping & VAT)</span></p>
                        <p>SAR 0</p>
                      </div>
                      <div>
                        <p><span class="font-bold">Total Cost</span> <span class="text-primary">(Excl. shipping & VAT)</span></p>
                        <p>SAR 0</p>
                      </div>
                    </div>
                    <div  class="gap-4 p-3">
                      <div class="flex gap-4 my-3">
                        <h3>Products in qoute 0</h3>
                        <span class="text-xs text-primary border border-smooth px-2 rounded flex gap-1 items-center"><img class="h-2 w-2" src="~/assets/icon/gline.svg" alt="">2</span>
                      </div>
                      <div class="grid grid-cols-3 gap-4">
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="glide__slide">
                <div class="card p-4">
                  <div class="border border-smooth rounded-lg">
                    <div class="flex justify-between border-b border-smooth p-3">
                      <p><span class="font-bold">Quote ID</span> 659</p>
                      <p>Price Valid Until <span class="text-primary">12-12-2024</span></p>
                      <span class="bg-smooth p-2 rounded uppercase">Submitted quote</span>
                    </div>
                    <div  class="flex justify-between border-b border-smooth p-3">
                      <p class="font-bol text-primary">************</p>
                      <span class="bg-smooth p-2 rounded uppercase">Verified</span>
                      <p></p>
                    </div>
                    <div  class="gap-4 border-b border-smooth p-3">
                      <button class="border border-primary bg-primary p-2 leading-3 text-white rounded-lg uppercase m-1">ACCEPT & CHECKOUT</button>
                      <button class="border border-primary p-2 leading-3 text-primary rounded-lg uppercase m-1">view quote</button>
                      <button class="border border-primary p-2 leading-3 text-primary rounded-lg uppercase m-1">SEND COUNTER OFFER</button>
                      <button class="border border-error p-2 leading-3 text-error rounded-lg uppercase m-1">REJECT QUOTE</button>
                    </div>
                    <div  class="grid grid-cols-2 gap-4 border-b border-smooth p-3">
                      <div>
                        <p><span class="font-bold">Total price</span> <span class="text-primary">(Excl. shipping & VAT)</span></p>
                        <p>SAR 0</p>
                      </div>
                      <div>
                        <p><span class="font-bold">Total Cost</span> <span class="text-primary">(Excl. shipping & VAT)</span></p>
                        <p>SAR 0</p>
                      </div>
                    </div>
                    <div  class="gap-4 p-3">
                      <div class="flex gap-4 my-3">
                        <h3>Products in qoute 0</h3>
                        <span class="text-xs text-primary border border-smooth px-2 rounded flex gap-1 items-center"><img class="h-2 w-2" src="~/assets/icon/gline.svg" alt="">2</span>
                      </div>
                      <div class="grid grid-cols-3 gap-4">
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="glide__slide">
                <div class="card p-4">
                  <div class="border border-smooth rounded-lg">
                    <div class="flex justify-between border-b border-smooth p-3">
                      <p><span class="font-bold">Quote ID</span> 659</p>
                      <p>Price Valid Until <span class="text-primary">12-12-2024</span></p>
                      <span class="bg-smooth p-2 rounded uppercase">Submitted quote</span>
                    </div>
                    <div  class="flex justify-between border-b border-smooth p-3">
                      <p class="font-bol text-primary">************</p>
                      <span class="bg-smooth p-2 rounded uppercase">Verified</span>
                      <p></p>
                    </div>
                    <div  class="gap-4 border-b border-smooth p-3">
                      <button class="border border-primary bg-primary p-2 leading-3 text-white rounded-lg uppercase m-1">ACCEPT & CHECKOUT</button>
                      <button class="border border-primary p-2 leading-3 text-primary rounded-lg uppercase m-1">view quote</button>
                      <button class="border border-primary p-2 leading-3 text-primary rounded-lg uppercase m-1">SEND COUNTER OFFER</button>
                      <button class="border border-error p-2 leading-3 text-error rounded-lg uppercase m-1">REJECT QUOTE</button>
                    </div>
                    <div  class="grid grid-cols-2 gap-4 border-b border-smooth p-3">
                      <div>
                        <p><span class="font-bold">Total price</span> <span class="text-primary">(Excl. shipping & VAT)</span></p>
                        <p>SAR 0</p>
                      </div>
                      <div>
                        <p><span class="font-bold">Total Cost</span> <span class="text-primary">(Excl. shipping & VAT)</span></p>
                        <p>SAR 0</p>
                      </div>
                    </div>
                    <div  class="gap-4 p-3">
                      <div class="flex gap-4 my-3">
                        <h3>Products in qoute 0</h3>
                        <span class="text-xs text-primary border border-smooth px-2 rounded flex gap-1 items-center"><img class="h-2 w-2" src="~/assets/icon/gline.svg" alt="">2</span>
                      </div>
                      <div class="grid grid-cols-3 gap-4">
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <div class="border border-smooth p-3 rounded-lg">
                          <div class="flex gap-4 w-full">
                            <img class="rounded-full w-20 h-20 p-2" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg" alt="">
                            <div class="w-full">
                              <a class="text-primary underline w-full">Al Mudhish Tea Milk Catering 410g x 48</a>
                              <div class="flex justify-between gap-4">
                                <p>Quentity</p>
                                <p>10 <span class="text-primary"> Cartoon</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Unit cost price</p>
                                <p>9 <span class="text-primary"> SAR</span></p>
                              </div>
                              <div  class="flex justify-between gap-4">
                                <p>Total</p>
                                <p>10 <span class="text-primary"> SAR</span></p>
                              </div>
                            </div>
                          </div>



                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </template>

  </div>
</template>

<script>
import Glide from '@glidejs/glide'
export default {
  mounted() {
    new Glide('.glide').mount()
  },
}
</script>
<style>

.shodow::before {
  content: '';
  position: absolute;
  left: 0px;
  top: 28px;
  /* width: calc(20% - 25px); */
  height: calc(20% - 10px);
  border-top: 5px solid #27436f;
  border-left: 5px solid #27436f;
}

@import '@glidejs/glide/dist/css/glide.core.min.css';
</style>
