<template>
  <div class="orders card p-4">

    <div class="p-4">
      <h3 class="uppercase">Orders</h3>
      <ul class="flex list-none bg-smooth shadow flex-wrap rounded-xl p-1  w-2/5  my-3 flex-row">
        <li class="-mb-px  last:mr-0 cursor-pointer  flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(1)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 1, 'rounded-lg text-primary bg-white': openTab === 1}">
            All Orders <span v-bind:class="{'py-2 px-2': openTab !== 1, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 1}">150</span>

          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(2)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 2, 'rounded-lg text-primary bg-white': openTab === 2}">
             New <span v-bind:class="{'py-2 px-2': openTab !== 2, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 2}">150</span>
          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(3)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 3, 'rounded-lg text-primary bg-white': openTab === 3}">
             Approved <span v-bind:class="{'py-2 px-2': openTab !== 3, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 3}">150</span>
          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(4)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 4, 'rounded-lg text-primary bg-white': openTab === 4}">
             Rejected <span v-bind:class="{'py-2 px-2': openTab !== 4, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 4}">150</span>
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <div class="flex gap-4">
                  <!-- <div class="p-2">
                    <input type="checkbox" >
                  </div> -->
                  <div class="relative">
                      <input
                        type="text"
                        placeholder="Order #"
                        class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <!-- Search Icon -->
                        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                    </div>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Action</option>
                      <option value="">Pending approval</option>
                      <option value="">Ready for pickup</option>
                      <option value=""> Rejected </option>
                    </select>

                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">All</option>
                      <option value="">Order Placed</option>
                      <option value="">Recived</option>
                      <option value=""> Partialy Recevied </option>
                      <option value=""> Delivered </option>
                      <option value="">Partialy Delivered </option>
                      <option value=""> Pending Cancellation </option>
                      <option value=""> Cancelled </option>
                      <option value=""> Ready to ship </option>
                      <option value=""> Pending Cancellation </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">All</option>
                      <option value="">Pending upload</option>
                      <option value="">Pending Verification</option>
                      <option value=""> Paid </option>
                      <option value=""> Pending Payment </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Order Type</option>
                      <option value="">All</option>
                      <option value="">Cart Orders</option>
                      <option value=""> Negotiated Orders </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Sort By</option>
                      <option value="">Last Update (Oldest)</option>
                      <option value="">Last Update (Newest)</option>
                      <option value="">Price  (Highest)</option>
                      <option value="">Price (Lowest)</option>
                    </select>
                </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <div class="flex gap-4">
                <div class="relative">
                      <input
                        type="text"
                        placeholder="Order #"
                        class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <!-- Search Icon -->
                        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                    </div>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Action</option>
                      <option value="">Pending approval</option>
                      <option value="">Ready for pickup</option>
                      <option value=""> Rejected </option>
                    </select>

                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">All</option>
                      <option value="">Order Placed</option>
                      <option value="">Recived</option>
                      <option value=""> Partialy Recevied </option>
                      <option value=""> Delivered </option>
                      <option value="">Partialy Delivered </option>
                      <option value=""> Pending Cancellation </option>
                      <option value=""> Cancelled </option>
                      <option value=""> Ready to ship </option>
                      <option value=""> Pending Cancellation </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">All</option>
                      <option value="">Pending upload</option>
                      <option value="">Pending Verification</option>
                      <option value=""> Paid </option>
                      <option value=""> Pending Payment </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Order Type</option>
                      <option value="">All</option>
                      <option value="">Cart Orders</option>
                      <option value=""> Negotiated Orders </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Sort By</option>
                      <option value="">Last Update (Oldest)</option>
                      <option value="">Last Update (Newest)</option>
                      <option value="">Price  (Highest)</option>
                      <option value="">Price (Lowest)</option>
                    </select>
                </div>

            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <div class="flex gap-4">
                    <div class="relative">
                      <input
                        type="text"
                        placeholder="Order #"
                        class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <!-- Search Icon -->
                        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                    </div>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Ready to Ship</option>
                      <option value="">Ready to Delivery</option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Invoice</option>
                      <option value="">Invoice 1</option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Order Type</option>
                      <option value="">All</option>
                      <option value="">Cart Orders</option>
                      <option value=""> Negotiated Orders </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Sort By</option>
                      <option value="">Last Update (Oldest)</option>
                      <option value="">Last Update (Newest)</option>
                      <option value="">Price  (Highest)</option>
                      <option value="">Price (Lowest)</option>
                    </select>
                </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
              <div class="flex gap-4">
                    <div class="relative">
                      <input
                        type="text"
                        placeholder="Order #"
                        class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                      />
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <!-- Search Icon -->
                        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                    </div>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Ready to Ship</option>
                      <option value="">Ready to Delivery</option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Invoice</option>
                      <option value="">Invoice 1</option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Order Type</option>
                      <option value="">All</option>
                      <option value="">Cart Orders</option>
                      <option value=""> Negotiated Orders </option>
                    </select>
                    <select class="p-2 border rounded border-smooth" name="" id="">
                      <option value="">Sort By</option>
                      <option value="">Last Update (Oldest)</option>
                      <option value="">Last Update (Newest)</option>
                      <option value="">Price  (Highest)</option>
                      <option value="">Price (Lowest)</option>
                    </select>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
<!-- ------------------------------------- -->
  <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button>
                        <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button>
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button>
                        <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button>
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
             </div>
             <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button>
                        <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button>
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button>
                        <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button>
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
             </div>
             <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <!-- <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button> -->
                        <!-- <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button> -->
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <!-- <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button> -->
                        <!-- <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button> -->
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
             </div>
             <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
              <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <!-- <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button> -->
                        <!-- <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button> -->
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="my-2 card p-4">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 w-3/4 justify-between">
                      <div>
                        <p class="text-smoothlight">Order</p>
                        <p class="font-bold text-[14px]">T240228164508</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Created date</p>
                        <p class="font-bold  text-[14px]">28 Feb 2024, 08:28 PM</p>
                      </div>
                      <div>
                        <p  class="text-smoothlight">Payment Method</p>
                        <p class="font-bold flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> Bank Transfer</p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Order Status</p>
                        <p class="font-bold text-primary"><span class="bg-primarylight  text-[14px]  px-2 rounded-3xl">Pending</span></p>
                      </div>
                      <div>
                        <p class="text-smoothlight">Payment Status</p>
                        <p class="font-bold text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl">Payment Pending Verification</span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>Order Total</p>
                        <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                      </div>
                      <!-- <div>
                        <button @click="rejectModalShow()" class="border border-primary p-2 rounded leading-3">Reject Order</button>
                      </div>
                      <div>
                        <button @click="approvedModalShow()" class="border border-primary p-2 rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                      </div> -->
                    </div>
                  </div>
                  <div class="my-3 flex gap-4 justify-between">
                    <div class="flex gap-4">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">
                    </div>
                    <div>
                      <div class="flex items-center gap-8">
                        <!-- <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold">Reject</button> -->
                        <!-- <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold">Accept</button> -->
                        <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold">VIEW ORDER DETAILS</a>
                      </div>
                    </div>
                  </div>

                </div>
             </div>
        </div>
    </div>
  </div>
  <OrderApprovedModal v-if="approvedModal" @close="handleModalClose"/>
  <OrderReject v-if="rejectModal" @close="rejectModalClose"/>
  </div>
</template>

<script>
export default{
data(){
 return{
  openTab:  1,
  approvedModal:false,
  rejectModal:false,
  productTable:{
    1:false,
    2:false
  }
 }
},

methods:{
  toggleTabs: function (tabNumber) {
    this.openTab = tabNumber
  },
  productTableShow(index){
    this.productTable[index] = !this.productTable[index]
  },
  approvedModalShow(){
    this.approvedModal = !this.approvedModal
  },
  rejectModalShow(){
    this.rejectModal = !this.rejectModal
  },
  handleModalClose() {
    this.approvedModal = false;
  },
  rejectModalClose(){
    this.rejectModal = false;
  }
}

}
</script>
