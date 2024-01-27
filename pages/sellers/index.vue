<template>
    <div class="card p-4">
        <div class="title mb-2">
            <h4>All Vendors List</h4>
        </div>
        <div>
            <div class="w-50 mb-4">
                <ul class="lg:flex mb-0 list-none rounded shadow flex-wrap mb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 1, 'border-b-2 border-primary': openTab === 1}">
                   All
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 2, 'border-b-2 border-primary': openTab === 2}">
                    Approved
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 3, 'border-b-2 border-primary': openTab === 3}">
                    Not Verified
                </a>
                </li>

            </ul>
            </div>
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <template>
                    <div class="flex gap-4">
            <input type="text" class="w-1/4" placeholder="Search...">
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Country</option>
                    <option value="">UAE</option>
                    <option value="">KSA</option>
            </select>
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by State</option>
                    <option value="">Madina</option>
                    <option value="">Makkah</option>
            </select>
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Type</option>
                    <option value="">Approved</option>
                    <option value="">Not Approved</option>
            </select>
            <select @change="SearchDate(1)" class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Date</option>
                    <option value="">Subscribe Date</option>
                    <option value="">Foundation Date</option>
                    <option value="">Production Date</option>
            </select>
            <input class="w-50" v-if="searcBydateInput==1" type="date" placeholder="00-00-00">
            <button class="bg-primary text-white hover:text-primary">Filter</button>
            <button>Clear</button>
                   </div>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id=""></th>
                        <th>Sl</th>
                        <th>Logo</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Primary Phone</th>
                        <th>Subscribe Date</th>
                        <th>Foundation Date</th>
                        <th>Production Date</th>
                        <th>Location</th>
                        <th>Number of Products</th>
                        <th>Type</th>
                        <th>Approved?</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" name="" id=""></td>
                        <td>1</td>
                        <td><a class="text-primary" href=""><img src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/960590de34aa9587df59041183754f83.jpg" alt=""></a></td>
                        <td><a class="text-primary"  href="">Aramco oil comp....</a></td>
                        <td>aramco@.gmail.com</td>
                        <td>1234355677879</td>
                        <td>12-12-12</td>
                        <td>12-12-12</td>
                        <td>12-12-12</td>
                        <td>Makkah</td>
                        <td>122</td>
                        <td>Registered</td>
                        <td><span class="bg-smooth px-2 text-xs rounded-lg text-primary">Approved</span></td>
                        <td>Active</td>
                        <td>
                            <div class="flex gap-4">
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                           </svg>
                           <a href=""><svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                </g>
                            </svg></a>
                            <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                            </svg>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
                </template>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <template>
                    <div class="flex gap-4">
            <input type="text" class="w-1/4" placeholder="Search...">
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Country</option>
                    <option value="">UAE</option>
                    <option value="">KSA</option>
            </select>
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by State</option>
                    <option value="">Madina</option>
                    <option value="">Makkah</option>
            </select>

            <select @change="SearchDate(2)" class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Date</option>
                    <option value="">Subscribe Date</option>
                    <option value="">Foundation Date</option>
                    <option value="">Production Date</option>
            </select>
            <input class="w-50" v-if="searcBydateInput==2" type="date" placeholder="00-00-00">
            <button class="bg-primary text-white hover:text-primary">Filter</button>
            <button>Clear</button>
        </div>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id=""></th>
                        <th>Sl</th>
                        <th>Logo</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Primary Phone</th>
                        <th>Subscribe Date</th>
                        <th>Foundation Date</th>
                        <th>Production Date</th>
                        <th>Location</th>
                        <th>Number of Products</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" name="" id=""></td>
                        <td>1</td>
                        <td><a class="text-primary" href=""><img src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/960590de34aa9587df59041183754f83.jpg" alt=""></a></td>
                        <td><a class="text-primary"  href="">Aramco oil comp....</a></td>
                        <td>aramco@.gmail.com</td>
                        <td>1234355677879</td>
                        <td>12-12-12</td>
                        <td>12-12-12</td>
                        <td>12-12-12</td>
                        <td>Makkah</td>
                        <td>122</td>
                        <td>Registered</td>
                        <td>Active</td>
                        <td>
                            <div class="flex gap-4">
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                           </svg>
                           <a href=""><svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                </g>
                            </svg></a>
                            <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                            </svg>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
                </template>
            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <template>
                    <div class="flex gap-4">
            <input type="text" class="w-1/4" placeholder="Search...">
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Country</option>
                    <option value="">UAE</option>
                    <option value="">KSA</option>
            </select>
            <select class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by State</option>
                    <option value="">Madina</option>
                    <option value="">Makkah</option>
            </select>

            <select @change="SearchDate(3)" class="border border-smooth p-2 rounded-lg" name="" id="">
                    <option value="">Search by Date</option>
                    <option value="">Subscribe Date</option>
                    <option value="">Foundation Date</option>
                    <option value="">Production Date</option>
            </select>
            <input class="w-50" v-if="searcBydateInput==3" type="date" placeholder="00-00-00">
            <button class="bg-primary text-white hover:text-primary">Filter</button>
            <button>Clear</button>
        </div>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id=""></th>
                        <th>Sl</th>
                        <th>Logo</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Primary Phone</th>
                        <th>Subscribe Date</th>
                        <th>Foundation Date</th>
                        <th>Production Date</th>
                        <th>Location</th>
                        <th>Number of Products</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" name="" id=""></td>
                        <td>1</td>
                        <td><a class="text-primary" href=""><img src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/960590de34aa9587df59041183754f83.jpg" alt=""></a></td>
                        <td><a class="text-primary"  href="">Aramco oil comp....</a></td>
                        <td>aramco@.gmail.com</td>
                        <td>1234355677879</td>
                        <td>12-12-12</td>
                        <td>12-12-12</td>
                        <td>12-12-12</td>
                        <td>Makkah</td>
                        <td>122</td>
                        <td>Registered</td>
                        <td>Active</td>
                        <td>
                            <div class="flex gap-4">
                                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                           </svg>
                           <a href=""><svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                </g>
                            </svg></a>
                            <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                            </svg>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
export default{
    data(){
        return {
            searcBydateInput:false,
            openTab: 1,
        }
    },
    methods:{
        SearchDate(index){
         this.searcBydateInput = index;
        },
        toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    },
    }
}
</script>
