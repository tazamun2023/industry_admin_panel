<template>
    <div>
        <div class="card p-4">
           <div class="flex justify-between">
                <div>
                    <h4 class="font-bold">My Payment Information</h4>
                    <p>Providing this bank account information allows us to deposit payments into your account, including payouts from orders</p>
                </div>
                <div>
                    <button @click="Cardmodal=true" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Add Payment</button>
                </div>
           </div>
        </div>
        <div class="lg:grid lg:grid-cols-3    my-2 gap-4">
          <div class="card p-4">
            <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                    <h4 class="font-bold">STC Bank</h4>
                    <span class="bg-smooth p-1 h-[20px] rounded-lg leading-3 text-primary text-xs mt-1">Default</span>
                </div>
                <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning">Remove</button>
                    <button class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Edit</button>
                </div>
            </div>
            <div class="w-3/4">
                <table>
                    <tr class="hover:bg-none">
                        <td class="border-none">Bank Holders Name</td>
                        <td class="border-none">Ziaur Rahaman</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">Bank Name</td>
                        <td class="border-none">STC Bank Saudi</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">IBAN</td>
                        <td class="border-none">1232342342353534546</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">Swift Code</td>
                        <td class="border-none">2323234546</td>
                    </tr>
                </table>
            </div>
            <div class="flex justify-end">
                <input type="checkbox" name="" id=""> <span>Set as Default</span>
            </div>
          </div>
          <div class="card p-4">
            <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                    <h4 class="font-bold">IDB Bank</h4>
                    <span class="bg-smooth p-1 h-[20px] rounded-lg leading-3 text-primary text-xs mt-1">Default</span>
                </div>
                <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning">Remove</button>
                    <button class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Edit</button>
                </div>
            </div>
            <div class="w-3/4">
                <table>
                    <tr class="hover:bg-none">
                        <td class="border-none">Bank Holders Name</td>
                        <td class="border-none">Ziaur Rahaman</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">Bank Name</td>
                        <td class="border-none">STC Bank Saudi</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">IBAN</td>
                        <td class="border-none">1232342342353534546</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">Swift Code</td>
                        <td class="border-none">2323234546</td>
                    </tr>
                </table>
            </div>
            <div class="flex justify-end">
                <input type="checkbox" name="" id=""> <span>Set as Default</span>
            </div>
          </div>
        </div>
        <!-- -----------------modal------------ -->
        <template v-if="Cardmodal">
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
        <svg @click="Cardmodal=false" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <!-- Modal Content -->
        <div class="mb-4">
            <h4>Add Bank</h4>
            <form class="px-2" action="">
                <div class="input-wrapper">
                    <label for="">Bank name*</label>
                    <input type="text" placeholder="Enter Bank name">
                </div>
                <div class="input-wrapper flex gap-4">
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">Where is your bank located *</label>
                        <select class="p-2 border border-smooth rounded w-full">
                            <option value="">Bangladesh</option>
                            <option value="">Yameen</option>
                        </select>
                    </div>
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">IBAN*</label>
                        <input type="text" placeholder="IBAN">
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-wrapper w-full">
                        <label for="">Bank account number*</label>
                        <input type="text" placeholder="Enter Bank account number*">
                    </div>
                    <div class="input-wrapper w-full">
                        <label for="">Bank account holder's name*</label>
                        <input type="text" placeholder="Enter Bank account holder's name">
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-wrapper w-full">
                        <label for="">Swift/BIC code*</label>
                        <input type="text" placeholder="Swift/BIC code*">
                    </div>
                </div>
                <div class="input-wrapper w-full">
                    <div class="flex gap-1">
                    <input type="checkbox">
                    <label for="">Set bank details as default</label>
                   </div>
                </div>
                <div class="flex justify-end gap-4">
                    <button  @click="Cardmodal=false" class="btn bg-smooth hover:text-primary  border-secondary mt-20">Cancel</button>
                    <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20">Save Change</button>
                </div>
            </form>
        </div>
        <!-- Close Button -->
        

      </div>
    </div>
  </template>
        <!-- -----------------modal end------------ -->
    </div>
</template>
<style scoped>
table td {
    border-bottom: 0px !important;
}
</style>
<script>
export default{
    data(){
        return{
            Cardmodal:false,
        }
    },

}
</script>