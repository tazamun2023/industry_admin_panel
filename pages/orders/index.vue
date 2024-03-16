<template>
<!--    <div class="orders">-->

<!--      <div class="card p-4">-->
<!--        <h4 class="font-bold">My Orders</h4>-->
<!--        <ul class="flex mb-0 list-none flex-wrap pt-3 w-2/4 pb-4 flex-row">-->
<!--          <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">-->
<!--            <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal" v-on:click="toggleTabs(1)"-->
<!--               v-bind:class="{'bg-white border-white border-b': openTab !== 1, 'border-b-2  border-primary text-primary': openTab === 1}">-->
<!--              All Orders-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">-->
<!--            <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(2)"-->
<!--               v-bind:class="{'bg-white border-white border-b': openTab !== 2, 'border-b-2  border-primary text-primary': openTab === 2}">-->
<!--               Pending approval-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">-->
<!--            <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(3)"-->
<!--               v-bind:class="{'bg-white border-white border-b': openTab !== 3, 'border-b-2    border-primary text-primary': openTab === 3}">-->
<!--               Ready for pickup-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">-->
<!--            <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(4)"-->
<!--               v-bind:class="{'bg-white border-white border-b': openTab !== 4, 'border-b-2   border-primary text-primary': openTab === 4}">-->
<!--               Rejected-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->
<!--&lt;!&ndash;        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="flex-auto ">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="tab-content input-wrapper tab-space">&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="flex gap-4">&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="p-2">&ndash;&gt;-->
<!--&lt;!&ndash;                      <input type="checkbox" >&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Action</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="" v-for="(item,i) in orderStatus" :key="i" >&ndash;&gt;-->
<!--&lt;!&ndash;                          {{item?.name}}&ndash;&gt;-->
<!--&lt;!&ndash;                        </option>&ndash;&gt;-->

<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="relative">&ndash;&gt;-->
<!--&lt;!&ndash;                        <input&ndash;&gt;-->
<!--&lt;!&ndash;                          type="text"&ndash;&gt;-->
<!--&lt;!&ndash;                          placeholder="Order #"&ndash;&gt;-->
<!--&lt;!&ndash;                          class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">&ndash;&gt;-->
<!--&lt;!&ndash;                          &lt;!&ndash; Search Icon &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                          <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">&ndash;&gt;-->
<!--&lt;!&ndash;                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>&ndash;&gt;-->
<!--&lt;!&ndash;                          </svg>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Order Placed</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Recived</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Partialy Recevied </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Delivered </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Partialy Delivered </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Pending Cancellation </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Cancelled </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Ready to ship </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Pending Cancellation </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Pending upload</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Pending Verification</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Paid </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Pending Payment </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Order Type</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Cart Orders</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Negotiated Orders </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Sort By</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Oldest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Newest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price  (Highest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price (Lowest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="flex gap-4">&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="p-2">&ndash;&gt;-->
<!--&lt;!&ndash;                      <input type="checkbox" >&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Action</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Pending approval</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Ready for pickup</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Rejected </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="relative">&ndash;&gt;-->
<!--&lt;!&ndash;                        <input&ndash;&gt;-->
<!--&lt;!&ndash;                          type="text"&ndash;&gt;-->
<!--&lt;!&ndash;                          placeholder="Order #"&ndash;&gt;-->
<!--&lt;!&ndash;                          class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">&ndash;&gt;-->
<!--&lt;!&ndash;                          &lt;!&ndash; Search Icon &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                          <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">&ndash;&gt;-->
<!--&lt;!&ndash;                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>&ndash;&gt;-->
<!--&lt;!&ndash;                          </svg>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Order Placed</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Recived</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Partialy Recevied </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Delivered </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Partialy Delivered </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Pending Cancellation </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Cancelled </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Ready to ship </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Pending Cancellation </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Pending upload</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Pending Verification</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Paid </option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Pending Payment </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Order Type</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Cart Orders</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Negotiated Orders </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Sort By</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Oldest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Newest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price  (Highest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price (Lowest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->

<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="flex gap-4">&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="relative">&ndash;&gt;-->
<!--&lt;!&ndash;                        <input&ndash;&gt;-->
<!--&lt;!&ndash;                          type="text"&ndash;&gt;-->
<!--&lt;!&ndash;                          placeholder="Order #"&ndash;&gt;-->
<!--&lt;!&ndash;                          class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">&ndash;&gt;-->
<!--&lt;!&ndash;                          &lt;!&ndash; Search Icon &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                          <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">&ndash;&gt;-->
<!--&lt;!&ndash;                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>&ndash;&gt;-->
<!--&lt;!&ndash;                          </svg>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Ready to Ship</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Ready to Delivery</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Invoice</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Invoice 1</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Order Type</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Cart Orders</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Negotiated Orders </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Sort By</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Oldest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Newest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price  (Highest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price (Lowest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="flex gap-4">&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="relative">&ndash;&gt;-->
<!--&lt;!&ndash;                        <input&ndash;&gt;-->
<!--&lt;!&ndash;                          type="text"&ndash;&gt;-->
<!--&lt;!&ndash;                          placeholder="Order #"&ndash;&gt;-->
<!--&lt;!&ndash;                          class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">&ndash;&gt;-->
<!--&lt;!&ndash;                          &lt;!&ndash; Search Icon &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                          <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">&ndash;&gt;-->
<!--&lt;!&ndash;                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>&ndash;&gt;-->
<!--&lt;!&ndash;                          </svg>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Ready to Ship</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Ready to Delivery</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Invoice</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Invoice 1</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Order Type</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">All</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Cart Orders</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value=""> Negotiated Orders </option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                      <select class="p-2 border rounded border-smooth" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Sort By</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Oldest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Last Update (Newest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price  (Highest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                        <option value="">Price (Lowest)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      </select>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--      </div>-->
<!--&lt;!&ndash; -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--    <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">-->
<!--          <div class="flex-auto ">-->
<!--            <spinner :radius="100" v-if="loading" />-->
<!--              <div class="tab-content input-wrapper tab-space">-->
<!--                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">-->
<!--                  <div class="card my-2 p-4" v-for="(order,index) in orders?.data" :key="index">-->
<!--                    <div class="flex gap-4 justify-between" >-->
<!--                      <div class="flex gap-4">-->
<!--                        <div class="p-2">-->
<!--                          <input type="checkbox"  @change="setSelectedOrder(order,$event.target.checked)">-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <p>Order</p>-->
<!--                          <p class="font-bold">{{ order?.order_id }}</p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <p>Order Placed</p>-->
<!--                          <p class="font-bold">09-nov-23</p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <p>Payment Method</p>-->
<!--                          <p class="font-bold">Credit Card</p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <p>Payment</p>-->
<!--                          <p class="font-bold"-->
<!--                          ><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">-->
<!--                            Paid</span></p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <p>Status</p>-->
<!--                          <p class="font-bold"><span class="bg-theemlight-->
<!--                           px-2 text-theem rounded-3xl text-[12px]">-->
<!--                            {{order?.status}}-->
<!--                          </span></p>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div class="flex gap-4">-->
<!--                        <div>-->
<!--                          <p>Total</p>-->
<!--                          <p><strong>-->
<!--                            {{order?.order_total }}-->
<!--                          </strong> <span>SAR</span></p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <button @click="rejectModalShow(order)" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">Reject Order</button>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <button @click="approvedModalShow(order)" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->

<!--                    <div class="flex flex-col">-->
<!--                      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">-->
<!--                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">-->
<!--                          <div class="overflow-hidden">-->
<!--                            <table class="min-w-full text-left text-sm font-light">-->
<!--                              <thead class=" font-medium ">-->
<!--                                <tr>-->
<!--                                  <th scope="col" class="p-2 w-[50px]">#</th>-->
<!--                                  <th scope="col" class="p-2">Product</th>-->
<!--                                  <th scope="col" class="p-2">Quantity</th>-->
<!--                                  <th scope="col" class="p-2">Agreed Price</th>-->
<!--                                  <th scope="col" class="p-2">Subtotal</th>-->
<!--                                  <th scope="col" class="p-2">Action</th>-->
<!--                                </tr>-->
<!--                              </thead>-->
<!--                              <tbody>-->
<!--                                <tr class=" "  v-for="(subItem , index) in order.sub_order_items" :key="index">-->
<!--                                  <td class="whitespace-nowrap p-2 font-medium">{{index + 1}}</td>-->
<!--                                  <td class="whitespace-nowrap p-2">-->
<!--                                    <div class="flex gap-4">-->
<!--                                      <LazyImage-->
<!--                                        :data-src="subItem.product.image"-->
<!--                                        :title="subItem.product.title"-->
<!--                                        :alt="subItem.product.title"-->
<!--                                        class="w-10 h-10"-->
<!--                                        />-->
<!--                                      <div>-->
<!--                                        <a href="">{{subItem.product.title.slice(0, 30)}}</a>-->
<!--                                        <p>Sku: {{subItem.product.sku}}</p>-->
<!--                                      </div>-->
<!--                                    </div>-->

<!--                                  </td>-->
<!--                                  <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>-->
<!--                                  <td class="whitespace-nowrap p-2">SAR {{subItem?.price}} / price</td>-->
<!--                                  <td class="whitespace-nowrap p-2">SAR {{subItem?.total_price}}</td>-->
<!--                                  <td class="whitespace-nowrap p-2">-->
<!--                                    <select class="p-3 border border-smooth rounded" name="" id="">-->
<!--                                      <option value="">Available</option>-->
<!--                                      <option value="">No Available</option>-->
<!--                                    </select>-->
<!--                                  </td>-->
<!--                                </tr>-->

<!--                              </tbody>-->
<!--                            </table>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--               </div>-->
<!--               <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">-->
<!--                 <div class="card my-2 p-4" v-for="(order,index) in orders?.data" :key="index" v-show="order?.status == 'pending'">-->
<!--                   <div class="flex gap-4 justify-between" >-->
<!--                     <div class="flex gap-4">-->
<!--                       <div class="p-2">-->
<!--                         <input type="checkbox" >-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <p>Order</p>-->
<!--                         <p class="font-bold">{{ order?.order_id }}</p>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <p>Order Placed</p>-->
<!--                         <p class="font-bold">09-nov-23</p>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <p>Payment Method</p>-->
<!--                         <p class="font-bold">Credit Card</p>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <p>Payment</p>-->
<!--                         <p class="font-bold"-->
<!--                         ><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">-->
<!--                            Paid</span></p>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <p>Status</p>-->
<!--                         <p class="font-bold"><span class="bg-theemlight-->
<!--                           px-2 text-theem rounded-3xl text-[12px]">-->
<!--                            {{order?.status}}-->
<!--                          </span></p>-->
<!--                       </div>-->
<!--                     </div>-->
<!--                     <div class="flex gap-4">-->
<!--                       <div>-->
<!--                         <p>Total</p>-->
<!--                         <p><strong>-->
<!--                           {{order?.order_total }}-->
<!--                         </strong> <span>SAR</span></p>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <button @click="rejectModalShow(order)" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">Reject Order</button>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         <button @click="approvedModalShow(order)" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">-->
<!--                           Approved Order</button>-->
<!--                       </div>-->
<!--                     </div>-->
<!--                   </div>-->

<!--                   <div class="flex flex-col">-->
<!--                     <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">-->
<!--                       <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">-->
<!--                         <div class="overflow-hidden">-->
<!--                           <table class="min-w-full text-left text-sm font-light">-->
<!--                             <thead class=" font-medium ">-->
<!--                             <tr>-->
<!--                               <th scope="col" class="p-2 w-[50px]">#</th>-->
<!--                               <th scope="col" class="p-2">Product</th>-->
<!--                               <th scope="col" class="p-2">Quantity</th>-->
<!--                               <th scope="col" class="p-2">Agreed Price</th>-->
<!--                               <th scope="col" class="p-2">Subtotal</th>-->
<!--                               <th scope="col" class="p-2">Action</th>-->
<!--                             </tr>-->
<!--                             </thead>-->
<!--                             <tbody>-->
<!--                             <tr class=" "  v-for="(subItem , index) in order.sub_order_items" :key="index">-->
<!--                               <td class="whitespace-nowrap p-2 font-medium">{{index + 1}}</td>-->
<!--                               <td class="whitespace-nowrap p-2">-->
<!--                                 <div class="flex gap-4">-->
<!--                                   <LazyImage-->
<!--                                     :data-src="subItem.product.image"-->
<!--                                     :title="subItem.product.title"-->
<!--                                     :alt="subItem.product.title"-->
<!--                                     class="w-10 h-10"-->
<!--                                   />-->
<!--                                   <div>-->
<!--                                     <a href="">{{subItem.product.title.slice(0, 30)}}</a>-->
<!--                                     <p>Sku: {{subItem.product.sku}}</p>-->
<!--                                   </div>-->
<!--                                 </div>-->

<!--                               </td>-->
<!--                               <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>-->
<!--                               <td class="whitespace-nowrap p-2">SAR {{subItem?.price}} / price</td>-->
<!--                               <td class="whitespace-nowrap p-2">SAR {{subItem?.total_price}}</td>-->
<!--                               <td class="whitespace-nowrap p-2">-->
<!--                                 <select class="p-3 border border-smooth rounded" name="" id="">-->
<!--                                   <option value="">Available</option>-->
<!--                                   <option value="">No Available</option>-->
<!--                                 </select>-->
<!--                               </td>-->
<!--                             </tr>-->

<!--                             </tbody>-->
<!--                           </table>-->
<!--                         </div>-->
<!--                       </div>-->
<!--                     </div>-->
<!--                   </div>-->
<!--                 </div >-->
<!--               </div>-->

<!--          </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <OrderApprovedModal :selectedOrders="selectedOrders" v-if="approvedModal" @save="saveRejectProduct" :reasonsRejection="reasonsRejection.data" @close="handleModalClose"/>-->
<!--    <OrderReject v-if="rejectModal" @close="rejectModalClose" :reasonsRejection="reasonsRejection.data" :selectedOrders="selectedOrders" @save="saveReject" />-->
<!--    </div>-->
  <div class="orders">
    <div class="card p-4">
      <h4 class="font-bold">{{$t('order.allOrders')}}</h4>
      <ul class="flex mb-0 list-none flex-wrap pt-3 w-2/4 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal" v-on:click="toggleTabs(1)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 1, 'border-b-2  border-primary text-primary': openTab === 1}">
            {{$t('order.allOrders')}}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(2)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 2, 'border-b-2  border-primary text-primary': openTab === 2}">
            {{$t('order.pendingApproval')}}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(3)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 3, 'border-b-2    border-primary text-primary': openTab === 3}">
            {{$t('order.readyForPickup')}}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(4)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 4, 'border-b-2   border-primary text-primary': openTab === 4}">
            {{$t('order.rejected')}}
          </a>
        </li>
      </ul>
    </div>

    <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
      <div class="flex-auto ">
        <spinner :radius="100" v-if="loading" />
        <div class="tab-content input-wrapper tab-space">
          <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <div class="card my-2 p-4" v-for="(order,index) in orders?.data" :key="index">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <input type="checkbox"  @change="setSelectedOrder(order,$event.target.checked)">
                  </div>
                  <div>
                    <p>{{$t('order.order')}}: </p>
                    <p class="font-bold">{{ order?.order_id }}</p>
                  </div>
                  <div>
                    <p>{{$t('order.orderPlaced')}}:</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>{{$t('order.paymentMethod')}}:</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>{{$t('order.payment')}}:</p>
                    <p class="font-bold"
                    ><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">
                                        Paid</span>
                    </p>
                  </div>
                  <div>
                    <p>{{$t('order.status')}}:</p>
                    <p class="font-bold"><span class="bg-theemlight
                                    px-2 text-theem rounded-3xl text-[12px]">
                                        {{order?.status}}
                                    </span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>{{$t('order.total')}}:</p>
                    <p><strong>
                      {{order?.order_total }}
                    </strong> <span>SAR</span></p>
                  </div>
                  <div>
                    <button @click="rejectModalShow(order)" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">{{$t('order.rejectOrder')}}</button>
                  </div>
                  <div>
                    <button @click="approvedModalShow(order)" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">{{$t('order.approveOrder')}}</button>
                  </div>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class=" font-medium ">
                        <tr>
                          <th scope="col" class="p-2 w-[50px]">#</th>
                          <th scope="col" class="p-2">{{$t('order.product')}}</th>
                          <th scope="col" class="p-2">{{$t('order.quantity')}}</th>
                          <th scope="col" class="p-2">{{$t('order.agreedPrice')}}</th>
                          <th scope="col" class="p-2">{{$t('order.subtotal')}}</th>
                          <th scope="col" class="p-2">{{$t('order.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class=" "  v-for="(subItem , index) in order.sub_order_items" :key="index">
                          <td class="whitespace-nowrap p-2 font-medium">{{index + 1}}</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <LazyImage
                                :data-src="subItem.product.image"
                                :title="subItem.product.title"
                                :alt="subItem.product.title"
                                class="w-10 h-10"
                              />
                              <div>
                                <a href="">{{subItem.product.title.slice(0, 30)}}</a>
                                <p>Sku: {{subItem.product.sku}}</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>
                          <td class="whitespace-nowrap p-2">SAR {{subItem?.price}} / price</td>
                          <td class="whitespace-nowrap p-2">SAR {{subItem?.total_price}}</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">{{$t('order.available')}}</option>
                              <option value="">{{$t('order.noAvailable')}}</option>
                            </select>
                          </td>
                        </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Add similar sections for other tabs -->
        </div>
      </div>
    </div>

  <OrderApprovedModal :selectedOrders="selectedOrders" v-if="approvedModal" @save="saveRejectProduct" :reasonsRejection="reasonsRejection.data" @close="handleModalClose"/>
  <OrderReject v-if="rejectModal" @close="rejectModalClose" :reasonsRejection="reasonsRejection.data" :selectedOrders="selectedOrders" @save="saveReject" />
  </div>
</template>

<script>
import { mapGetters , mapActions } from "vuex";
import LazyImage from "../../components/LazyImage.vue";
import Spinner from "../../components/Spinner.vue";

export default{
  components: {Spinner, LazyImage},
  data(){
   return{
    openTab:  1,
     loading: false,
    approvedModal:false,
     selectedOrders:[],
    rejectModal:false,
     orderStatus:[
       {id:1,name:"Pending approval"},
       {id:1,name:"Ready for pickup"},
       {id:1,name:"Rejected"},
       {id:1,name:"Rejected"}
     ],
     RejectionOrder:"",
    productTable:{
      1:false,
      2:false
    }
   }
  },
 computed :{
    ...mapGetters('order',['orders','reasonsRejection'])
 },
  methods:{
    ...mapActions('order',['getOrder','getReasonsRejection','changeStatus']),
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    productTableShow(index){
      this.productTable[index] = !this.productTable[index]
    },
    approvedModalShow(order){
      this.$store.commit('order/EMPTY_ORDER_SELECTED');
      if(this.selectedOrders.length > 0) {
        // this.approvedModal = !this.approvedModal
        this.selectedOrders.push(order);
        this.$store.commit('order/SET_ORDER_SELECTED',order);
      } else {
        this.selectedOrders.push(order);
        this.$store.commit('order/SET_ORDER_SELECTED',order);
      }
      this.approvedModal = !this.approvedModal
    },
    rejectModalShow(order){
      if(this.selectedOrders.length > 0) {
        this.rejectModal = !this.rejectModal
      } else {
        this.selectedOrders.push(order);
        this.rejectModal = !this.rejectModal
      }
    },
    saveReject(data) {
      this.loading= true;
      this.changeStatus({
         payload:{
           status: data.status,
           order_id: data.order_id.slice(0, -2),
           reject_reasons: data.reject_reasons
         }
      })
      this.getOrder();
      this.rejectModalClose();
      this.loading= false;
    },
    saveRejectProduct(data) {
      this.loading= true;
      this.changeStatus({
        payload:{
          status: data.status,
          product_id: data.order.product.id,
          reject_reasons: data.reject_reasons
        }
      })
      this.approvedModal();
      this.loading= false;
    },
    handleModalClose() {
      this.selectedOrders=[];
      this.approvedModal = false;
    },
    rejectModalClose(){
      this.selectedOrders=[];
      this.rejectModal = false;
    },
    setSelectedOrder(order,checked) {
      if (checked) {
        if (!this.selectedOrders.includes(order)) {
          this.selectedOrders.push(order);
        }
      } else {
        const index = this.selectedOrders.findIndex(selectedOrder => selectedOrder.id === order.id);
        if (index !== -1) {
          this.selectedOrders.splice(index, 1);
        }
      }

    }
  },
  mounted() {
    this.loading= true;
    this.getOrder();
    this.getReasonsRejection();
    this.loading= false;
  }

}
</script>
