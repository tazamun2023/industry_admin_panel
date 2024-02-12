<template>
    <div>
       <div class="card p-4">
           <div class="p-2">
            <h4>All Customer Information</h4>
           </div>
           <div class="w-full">
            <div class="w-50 mb-4">
                <ul class="lg:flex mb-0 list-none rounded shadow flex-wrap mb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 1, 'border-b-2 border-primary': openTab === 1}">
                   All
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 2, 'border-b-2 border-primary': openTab === 2}">
                  Verified
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 3, 'border-b-2 border-primary': openTab === 3}">
                    Not Verified
                </a>
                </li>

            </ul>
            </div>
           </div>
           <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <div class="flex justify-between py-2">
                <div class="flex gap-4">
                    <input type="text" placeholder="search">
                    
                    <div class="flex gap-4">
                        <select name="" id="" class="p-2 border  w-[300px]  rounded border-smooth">
                        <option value="">Status</option>
                        <option value="">Varified</option>
                        <option value="">NOn Varified</option>
                    </select>
                    <select name="" id="" class="p-2 border  w-[300px]  rounded border-smooth">
                        <option value="">Country</option>
                        <option value="">Bangladesh</option>
                        <option value="">Yameen</option>
                    </select>
                    <select name="" id="" class="p-2 border  w-[300px]  rounded border-smooth">
                        <option value="">State</option>
                        <option value="">Dhaka</option>
                        <option value="">Sana</option>
                    </select>
                </div>
                </div>
               
            </div>
            <table>
        <thead>
        <tr>
          <th><input type="checkbox"></th>
          <th>Customer name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
          <th>State</th>
          <th>Orders</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>

        <tr>
          <td><input type="checkbox"></td>
          <td>Jhon Doe</td>
          <td>343535345345</td>
          <td>manager@info.com</td>
          <td>Bangladesh</td>
          <td>Dhaka</td>
          <td>3</td>

          <td><span class="text-primary">Varified</span></td>
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
      <div class="flex justify-end items-center mt-4">
            <nav aria-label="Pagination">
                <ul class="pagination">
                <li class="pagination-item disabled" aria-disabled="true" aria-label="Previous">
                    <span class="pagination-link">&laquo;</span>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">1</a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">2</a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">3</a>
                </li>
                <li class="pagination-item" aria-current="page">
                    <span class="pagination-link">4</span>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">5</a>
                </li>
                <li class="pagination-item" aria-disabled="true" aria-label="Next">
                    <span class="pagination-link">&raquo;</span>
                </li>
                </ul>
            </nav>
            </div>

            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <div class="flex justify-between py-2">
                <div class="flex gap-4">
                    <input type="text" placeholder="search">
                    <div class="flex gap-4">
                    <select name="" id="" class="p-2  w-[300px]  border rounded border-smooth">
                        <option value="">Country</option>
                        <option value="">Bangladesh</option>
                        <option value="">Yameen</option>
                    </select>
                    <select name="" id="" class="p-2  w-[300px]  border rounded border-smooth">
                        <option value="">State</option>
                        <option value="">Dhaka</option>
                        <option value="">Sana</option>
                    </select>
                </div>
                </div>

            </div>
                <table>
        <thead>
        <tr>
          <th><input type="checkbox"></th>
          <th>Customer name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
          <th>State</th>
          <th>Orders</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><input type="checkbox"></td>
          <td>Jhon Doe</td>
          <td>343535345345</td>
          <td>manager@info.com 1</td>
          <td>Bangladesh</td>
          <td>Dhaka</td>
          <td>3</td>

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
      <div class="flex justify-end items-center mt-4">
            <nav aria-label="Pagination">
                <ul class="pagination">
                <li class="pagination-item disabled" aria-disabled="true" aria-label="Previous">
                    <span class="pagination-link">&laquo;</span>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">1</a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">2</a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">3</a>
                </li>
                <li class="pagination-item" aria-current="page">
                    <span class="pagination-link">4</span>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">5</a>
                </li>
                <li class="pagination-item" aria-disabled="true" aria-label="Next">
                    <span class="pagination-link">&raquo;</span>
                </li>
                </ul>
            </nav>
            </div>

            </div>

            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <div class="flex justify-between py-2">
                <div class="flex gap-4">
                    <input type="text" placeholder="search">
                    <div class="flex gap-4">
                    <select name="" id="" class="p-2 border w-[300px] rounded border-smooth">
                        <option value="">Country</option>
                        <option value="">Bangladesh</option>
                        <option value="">Yameen</option>
                    </select>
                    <select name="" id="" class="p-2 border  w-[300px]  rounded border-smooth">
                        <option value="">State</option>
                        <option value="">Dhaka</option>
                        <option value="">Sana</option>
                    </select>
                </div>
                </div>
                
            </div>
                <table>
        <thead>
        <tr>
          <th><input type="checkbox"></th>
          <th>Customer name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
          <th>State</th>
          <th>Orders</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>

        <tr>
          <td><input type="checkbox"></td>
          <td>Jhon Doe</td>
          <td>343535345345</td>
          <td>manager@info.com 2</td>
          <td>Bangladesh</td>
          <td>Dhaka</td>
          <td>3</td>


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
      <div class="flex justify-end items-center mt-4">
            <nav aria-label="Pagination">
                <ul class="pagination">
                <li class="pagination-item disabled" aria-disabled="true" aria-label="Previous">
                    <span class="pagination-link">&laquo;</span>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">1</a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">2</a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">3</a>
                </li>
                <li class="pagination-item" aria-current="page">
                    <span class="pagination-link">4</span>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">5</a>
                </li>
                <li class="pagination-item" aria-disabled="true" aria-label="Next">
                    <span class="pagination-link">&raquo;</span>
                </li>
                </ul>
            </nav>
            </div>

            </div>
            
       </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                openTab: 1,
            }
        },
        methods:{
            toggleTabs: function(tabNumber){
             this.openTab = tabNumber
            },
        }
    }
</script>