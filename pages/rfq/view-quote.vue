<template>
  <div>
    <div class="card my-4 p-4">
      <h4 class="font-bold pb-2">Quote Details</h4>
      <div class="flex justify-between">
          <div>
            <p class="font-bold">Quote Id</p>
            <p>Q2344556778</p>
          </div>
          <div>
            <p class="font-bold">Status</p>
            <p>Quoted Submitted</p>
          </div>
          <div>
            <p class="font-bold">Price Valid Until</p>
            <p>16 mar 2024, 10:55 pm</p>
          </div>
          <div>
            <p class="font-bold">Quotes Submitted</p>
            <p>16 mar 2024, 10:55 pm</p>
          </div>
      </div>
    </div>
    <div class="card my-4 p-4">
      <h4 class="font-bold pb-2">RFQ Details</h4>
      <div class="flex justify-between">
          <div>
            <p class="font-bold">RFQ Id</p>
            <p>Rfq344556778</p>
          </div>
          <div>
            <p class="font-bold">Shipping Country</p>
            <p class="flex gap-2 items-center"><img class="w-4 h-4" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ae.svg" alt=""> United Arab Amirats</p>
          </div>
          <div>
            <p class="font-bold">Shipping City</p>
            <p>Sana</p>
          </div>
          <div>
            <p class="font-bold">Shipping Terms</p>
            <p>doorToDoor</p>
          </div>
      </div>
    </div>
    <div class="card my-4 p-4">
      <h4 class="font-bold pb-2">Products in your quote</h4>
      <div class="flex flex-col overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table
                class="min-w-full text-start text-sm font-light text-surface dark:text-white">
                <thead
                  class="border-b border-neutral-200 font-medium">
                  <tr>
                    <th scope="col" class="px-3 py-1">#</th>
                    <th scope="col" class="px-3 py-1">Product(1)</th>
                    <th scope="col" class="px-3 py-1">Category</th>
                    <th scope="col" class="px-3 py-1">Quantity</th>
                    <th scope="col" class="px-3 py-1">Unit Offer Price</th>
                    <th scope="col" class="px-3 py-1">Total Offer Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-neutral-200">
                    <td class="whitespace-nowrap px-3 py-1 font-medium">1</td>
                    <td class="whitespace-nowrap px-3 py-1">
                      <div class="flex gap-4 items-center">
                        <img class="w-20 h-20" src="https://cfn-catalog-prod.tradeling.com/up/5fba0c6142480f001bed85d4/c86e5ff2a9eab17b27998dfb5d71466a.jpeg" alt="">
                        <a class="underline text-primary" href="">Pepsi Carbonated Soft Drink Can 330 ml x 24</a>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-1">Food & Bavarage</td>
                    <td class="whitespace-nowrap px-3 py-1">11 Cartoon</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR 500</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR 100</td>
                  </tr>
                  <tr class="border-neutral-200">
                    <td class="whitespace-nowrap px-3 py-1 font-medium">1</td>
                    <td class="whitespace-nowrap px-3 py-1">
                      <div class="flex gap-4 items-center">
                        <img class="w-20 h-20" src="https://cfn-catalog-prod.tradeling.com/up/5fba0c6142480f001bed85d4/c86e5ff2a9eab17b27998dfb5d71466a.jpeg" alt="">
                        <a class="underline text-primary" href="">Pepsi Carbonated Soft Drink Can 330 ml x 24</a>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-1">Food & Bavarage</td>
                    <td class="whitespace-nowrap px-3 py-1">11 Cartoon</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR 500</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR 100</td>
                  </tr>
                  <tr class="border-neutral-200">
                    <td class="whitespace-nowrap px-3 py-1 font-medium">1</td>
                    <td class="whitespace-nowrap px-3 py-1">
                      <div class="flex gap-4 items-center">
                        <img class="w-20 h-20" src="https://cfn-catalog-prod.tradeling.com/up/5fba0c6142480f001bed85d4/c86e5ff2a9eab17b27998dfb5d71466a.jpeg" alt="">
                        <a class="underline text-primary" href="">Pepsi Carbonated Soft Drink Can 330 ml x 24</a>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-1">Food & Bavarage</td>
                    <td class="whitespace-nowrap px-3 py-1">11 Cartoon</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR 500</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR 100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-end">
              <p class="capitalize">Total quoted price (Excl.VAT): <span class="text-primary">SAR 12214234</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="font-bold pb-2">Additional Information</h4>
    <div class="card my-4 p-4">
      <h4 class="font-bold pb-2">Additional Details</h4>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam maxime ipsum sit perspiciatis est iste voluptatum dolorum porro autem eveniet consequatur impedit iure, voluptatem, explicabo placeat, eligendi maiores cumque natus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam maxime ipsum sit perspiciatis est iste voluptatum dolorum porro autem eveniet consequatur impedit iure, voluptatem, explicabo placeat, eligendi maiores cumque natus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam maxime ipsum sit perspiciatis est iste voluptatum dolorum porro autem eveniet consequatur impedit iure, voluptatem, explicabo placeat, eligendi maiores cumque natus.</p>
      </div>
    </div>
  </div>
</template>
