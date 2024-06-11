<template>
    <div class="p-4 card lg:h-[371px]">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-medium">Low Stock</h4>
            <a href="" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
        </div>
        <div class="overflow-x-auto h-[240px] my-4 scroolbar">
            <table>
                <thead>
                    <tr>
                        <th class="text-[14px] capitalize">Product</th>
                        <th class="text-[14px] capitalize">Qty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td  class="text-[13px] capitalize">
                        <div class="flex items-center gap-4">
                            <img class="w-[36px] h-[36px] rounded-full" src="~/assets/icon/pimage.svg" alt="">
                           <p>Deco accessory</p>
                        </div>
                    </td>
                   <td>0</td>
                    </tr>
                    <tr>
                        <td  class="text-[13px] capitalize">
                        <div class="flex items-center gap-4">
                            <img class="w-[36px] h-[36px] rounded-full" src="~/assets/icon/pimage.svg" alt="">
                           <p>Deco accessory</p>
                        </div>
                    </td>
                   <td>0</td>
                    </tr>
                    <tr>
                        <td  class="text-[13px] capitalize">
                        <div class="flex items-center gap-4">
                            <img class="w-[36px] h-[36px] rounded-full" src="~/assets/icon/pimage.svg" alt="">
                           <p>Deco accessory</p>
                        </div>
                    </td>
                   <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]"><img class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt=""> Refresh Stock</button>
        </div>
    </div>
</template>