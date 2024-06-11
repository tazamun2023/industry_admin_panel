<template>
    <div class="p-4 card lg:h-[371px]">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-medium">Inquiries and RFQs</h4>
            <a href="" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
        </div>
        <div class="overflow-x-auto h-[240px] my-4 scroolbar">
            <table>
                <tbody>
                    <tr>
                     <td  class="text-[13px] capitalize">
                        My suggested RFQs
                    </td>
                     <td class="ltr:text-end rtl:text-start">8</td>
                    </tr>
                    <tr>
                     <td  class="text-[13px] capitalize">
                        Presented RFQs
                    </td>
                     <td class="ltr:text-end rtl:text-start">3</td>
                    </tr>
                    <tr>
                     <td  class="text-[13px] capitalize">
                        Rejected RFQs
                    </td>
                     <td class="ltr:text-end rtl:text-start" >10</td>
                    </tr>
                    <tr>
                     <td  class="text-[13px] capitalize">
                        New negotiations
                    </td>
                     <td class="ltr:text-end rtl:text-start">10</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]"><img class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt=""> RFQs Market</button>
        </div>
    </div>
</template>