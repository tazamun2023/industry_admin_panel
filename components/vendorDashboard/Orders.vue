<template>
    <div class="p-4 card">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-medium">Orders</h4>
          
        </div>
        <div class="my-4 scroolbar rounded-[12px] border border-cardb">
            <table>
                <thead>
                    <tr>
                        <th class="text-[14px] capitalize border-b border-cardb">Order ID</th>
                        <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Product <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                        <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Qty  <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                        <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Date <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                        <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Revenue <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                        <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Net  Profit <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                        <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Status <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                       <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="n in 15">
                    <td  class="text-[13px] border-b border-cardb capitalize">
                        #546542{{ n }}
                    </td>
                    <td  class="text-[13px] border-b border-cardb capitalize">
                        <span class="text-semibold">Product Name</span>
                    </td>
                    <td  class="text-[13px] border-b border-cardb capitalize">
                       5
                    </td>
                    <td  class="text-[13px] border-b border-cardb capitalize">
                        Jan 10, 2020
                    </td>
                    <td  class="text-[13px]  border-b border-cardb capitalize">
                        200 <span class="text-primary">SAR</span>
                    </td>
                    <td  class="text-[13px] border-b border-cardb capitalize">
                        200 <span class="text-primary">SAR</span>
                    </td>
                   
                    <td  class="text-[13px] border-b border-cardb capitalize">
                       <span class="text-primary"> Completed</span>
                    </td>
                    <td class="border-b border-cardb">
                        <div class="flex gap-4 items-center">
                            <delete-button-icon/>
                            <edit-button-icon/>
                        </div>
                    </td>
                    
                    </tr>

                </tbody>
            </table>
            <GlobalPagination/>
        </div>
        
    </div>
</template>

<script>
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import GlobalPagination from "../../components/GlobalPagination.vue";
export default{
    components:{
        DeleteButtonIcon,
        EditButtonIcon,
        GlobalPagination
    }
}
</script>