<template>
  <div class="tab-sidebar">
        <div class="title">
            <h4>Details of Customer</h4>
        </div>
        <div class="grid grid-cols-12 p-4 gap-4">
            <div class="col-span-2">
                <ul class="mb-0 list-none">
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 1, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 1}">
                    Profile
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 2, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 2}">
                        Users
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 3, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 3}">
                        Orders
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 4, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 4}">
                        Address
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 5, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 5}">
                        Payment 
                    </a>
                </ul>
            </div>
            <div class="col-span-10 ltr:border-l rtl:border-r border-smooth p-2 right-area">

                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                   <template>
                    <div class="card p-4">
                        <form action="">
                            <div class="input-wrapper mb-2">
                                <label for="">Company name:</label>
                                <input type="text" placeholder="Company name">
                            </div>
                            <div class="input-wrapper mb-2">
                                <label for="">Billing email address:</label>
                                <input type="email" placeholder="Billing email address:">
                            </div>
                            <div class="input-wrapper mb-2">
                                <label for="">Business type:</label>
                                <input type="text" placeholder="Business type:">
                            </div>
                            <div class="input-wrapper mb-2">
                                <label for="">Building number or name:</label>
                                <input type="text" placeholder="Building number or name:">
                            </div>
                            <div class="input-wrapper mb-2">
                                <label for="">Street name:</label>
                                <input type="text" placeholder="Building number or name:">
                            </div>
                            <div class="input-wrapper mb-2">
                                <label for="">Zip Code</label>
                                <input type="text" placeholder="Zip Code">
                            </div>
                            <div class="input-wrapper mb-2">
                                <div class="flex w-full gap-4">
                                   <div class="input-wrapper w-full">
                                    <label class="w-full" for="">Country</label>
                                    <select class="p-2 w-full rounded border border-smooth " name="" id="">
                                        <option value="">Bangladesh</option>
                                        <option value="">KSA</option>
                                    </select>
                                   </div>
                                   <div class="input-wrapper w-full">
                                    <label  class="w-full" for="">State</label>
                                    <select  class="p-2 rounded w-full border border-smooth " name="" id="">
                                        <option value="">Dhaka</option>
                                        <option value="">Makkah</option>
                                    </select>
                                   </div>
                                   <div class="input-wrapper w-full">
                                    <label  class="w-full" for="">City</label>
                                    <select  class="p-2 rounded w-full border border-smooth " name="" id="">
                                        <option value="">Mirpur</option>
                                        <option value="">Makkah</option>
                                    </select>
                                   </div>
                                </div>
                            </div>
                            <div class="input-wrapper text-end mb-2">
                                <button class="bg-primary p-2 border border-smooth rounded leading-3 text-white hover:text-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                   </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                    <template>
                        <table>
                            <thead>
                            <tr>
                            <th>User name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Roll</th>
                            <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>Jhon Doe</td>
                            <td>343535345345</td>
                            <td>manager@info.com 1</td>
                            <td>Manager</td>

                            <td><div class="flex gap-4">
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                            <svg class="w-4 h-4 cursor-pointer text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                </g>
                                </svg>
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                </svg>
                            </div></td>
                            </tr>
                            </tbody>
                        </table>
                    </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                    <template>
                    <table>
                            <thead>
                            <tr>
                            <th>Order No.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Order date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>123213</td>
                            <td>Title here</td>
                            <td>3</td>
                            <td>SAR 2132</td>
                            <td>11-jan, 24</td>
                            </tr>
                            </tbody>
                        </table>
                 </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                    <template>
                    <table>
                            <thead>
                            <tr>
                            <th>Addrass Name</th>
                            <th>Address Type</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>District</th>
                            <th>Street</th>
                            <th>Building No.</th>
                            <th>Nearest landmark</th>
                            <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>Makkah</td>
                            <td>Shipping</td>
                            <td>KSA</td>
                            <td>Makakh</td>
                            <td>111</td>
                            <td>Makakh</td>
                            <td>Mazjidul Haram</td>
                            <td>11/11</td>
                            <td>Mina</td>

                            <td><div class="flex gap-4">
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                            <svg class="w-4 h-4 cursor-pointer text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                </g>
                                </svg>
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                </svg>
                            </div></td>
                            </tr>
                            </tbody>
                        </table>
                 </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 5, 'block': openTab === 5}">
                  <template>
                    <table>
                    <thead>
                    <tr>
                        <th>Bank Name/Card Name</th>
                        <th>Account/Holder name</th>
                        <th>A/C/Card Number</th>
                        <th>Type</th>
                        <th>Expire At</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>DBBL</td>
                        <td>ZIAUR RAHAMAN</td>
                        <td>233243243234</td>
                        <td>Default</td>
                        <td>12 jan, 25</td>
                    </tr>

                    </tbody>
                    </table>
                  </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            openTab:1,
        }
    },
    methods:{
        toggleTabs: function(tabNumber){
       this.openTab = tabNumber
        }, 
    }
}
</script>