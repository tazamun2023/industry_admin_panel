<template>
    <div class="tab-sidebar">
        <div class="title">
            <h4>Details of Vendor</h4>
        </div>
        <div class="grid grid-cols-12 p-4 gap-4">
            <div class="col-span-2">
                <ul class="mb-0 list-none">
                    <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 1, 'ltr:border-l-2 rtl:border-r-2 border-primary': openTab === 1}">
                    Profile     
                    </a>
                    <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 2, 'ltr:border-l-2 rtl:border-r-2 border-primary': openTab === 2}">
                        Users
                    </a>
                    <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 3, 'ltr:border-l-2 rtl:border-r-2 border-primary': openTab === 3}">
                        Products
                    </a>
                    <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 4, 'ltr:border-l-2 rtl:border-r-2 border-primary': openTab === 4}">
                        Wirehouse
                    </a>
                    <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 5, 'ltr:border-l-2 rtl:border-r-2 border-primary': openTab === 5}">
                        Bank
                    </a>
                    <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(6)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 6, 'ltr:border-l-2 rtl:border-r-2 border-primary': openTab === 6}">
                        Content
                    </a>
                </ul>
            </div>
            <div class="col-span-10 right-area">

                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                    <template>
   <div class="grid grid-cols-2 container-c mx-auto gap-4">
        <div class="p-4">
            <div >
                <h4>Genaral Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">Slug/Subdomain</label>
                    <input type="text" placeholder="https://www.Slug" readonly>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Email</label>
                    <input type="email" placeholder="vendor@email.com">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Mobile</label>
                    <input type="number" placeholder="132234354556">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">CR number</label>
                    <input type="text" placeholder="2132213213">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Status</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Enable</option>
                        <option value="">Disable</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- --------------- -->
        <div class="p-4">
            <div >
                <h4>Primary Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">Foundated date</label>
                    <input type="date" value="12-12-12" readonly>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Production start date</label>
                    <input type="date"  value="12-00-12" >
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Primary email</label>
                    <input type="email" placeholder="vd@dd.com">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Primary mobile</label>
                    <input type="number" placeholder="345353553">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Facality Type</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
            </div>
        </div>
                <!-- --------------- -->
        <div class="p-4">
            <div >
                <h4>Location Information</h4>
            </div>
            <div class="form-group">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-wrapper  mb-2">
                    <label for="">Country</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">State</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Area name</label>
                    <input type="text" placeholder="Makkah">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Street name</label>
                    <input type="text"  placeholder="Aziziya">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Building name</label>
                    <input type="text" placeholder="Concord Tower">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Nearby</label>
                    <input type="text" placeholder="City Park">
                </div>
                
            </div>
        </div>
        <!-- --------------- -->
        <div class="p-4">
            <div >
                <h4>Social Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper  mb-2">
                    <label for="">Whatsapp</label>
                    <input type="number" placeholder="Whatsapp number">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Facebook</label>
                    <input type="url" placeholder="http://facebook.com/test">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Linkadin</label>
                    <input type="url" placeholder="http://">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Youtube</label>
                    <input type="url" placeholder="http://">
                </div>
                <div class="input-wrapper text-end mb-2">
                    <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20">Save Change</button>
                </div>
            </div>
        </div>
   </div>
</template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                    <div>
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
                                    <td>manager@info.com</td>
                                    <td>Manager</td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Jhon Doe</td>
                                    <td>343535345345</td>
                                    <td>manager@info.com</td>
                                    <td>Manager</td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox"></th>
                                <th>Product Images</th>
                                <th>Title</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Available Quantity</th>
                                <th>Created / Updated</th>
                                <th>Status</th>
                                <th>Visibility</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox"></td>
                                <td><img src="http://127.0.0.1:8000/uploads/thumb-default-image.webp" alt=""></td>
                                <td>Women’s Casual Long Sleeve Lap...</td>
                                <td>324</td>
                                <td>Cloth</td>
                                <td>23423.33</td>
                                <td>3332</td>
                                <td><span>07:02 AM, 24 Jan, 24</span><br><span>07:03 AM, 24 Jan, 24</span></td>
                                <td>pending</td>
                                <td>pending</td>
                                <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"></td>
                                <td><img src="http://127.0.0.1:8000/uploads/thumb-default-image.webp" alt=""></td>
                                <td>Women’s Casual Long Sleeve Lap...</td>
                                <td>324</td>
                                <td>Cloth</td>
                                <td>23423.33</td>
                                <td>3332</td>
                                <td><span>07:02 AM, 24 Jan, 24</span><br><span>07:03 AM, 24 Jan, 24</span></td>
                                <td>pending</td>
                                <td>pending</td>
                                <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                    <template>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Wirehouse Name</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>STC</td>
                                    <td>Makkah</td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 5, 'block': openTab === 5}">
                    <template>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Bank Name</th>
                                    <th>A/C Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>STC</td>
                                    <td>121232434334435435</td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 6, 'block': openTab === 6}">
                            <ul class="lg:flex mb-10 list-none rounded shadow flex-wrap mb-4 flex-row">
                        <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
                        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 1, 'border-b-2 border-primary': openContentTab === 1}">
                        News     
                        </a>
                        </li>
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 2, 'border-b-2 border-primary': openContentTab === 2}">
                          Video
                        </a>
                        </li>
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 3, 'border-b-2 border-primary': openContentTab === 3}">
                           Faq
                        </a>
                        </li>
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleContentTabs(4)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openContentTab !== 4, 'border-b-2 border-primary': openContentTab === 4}">
                          Certificate
                        </a>
                        </li>
                    </ul>
                    <div>
                        <div v-bind:class="{'hidden': openContentTab !== 1, 'block': openContentTab === 1}">
                            <template>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Short Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>titlte here </td>
                                    <td>titlte here  121232434334435435 ....</td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                        </div>
                        <div v-bind:class="{'hidden': openContentTab !== 2, 'block': openContentTab === 2}">
                            <template>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>titlte here </td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                        </div>
                        <div v-bind:class="{'hidden': openContentTab !== 3, 'block': openContentTab === 3}">
                            <template>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>titlte here ?</td>
                                    <td>answer here answer here answer hereanswer here...</td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                        </div>
                        <div v-bind:class="{'hidden': openContentTab !== 4, 'block': openContentTab === 4}">
                            <template>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>titlte here </td>
                                    <td><img src="http://127.0.0.1:8000/uploads/thumb-default-image.webp" alt=""></td>
                                    <td><div class="flex gap-4">
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                                <a href=""><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg></a>
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            openTab:1,
            openContentTab: 1,   
        }
    },
    methods:{
        toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    },
    toggleContentTabs: function(tabContentNumber){
      this.openContentTab = tabContentNumber
    }
    }
}
</script>