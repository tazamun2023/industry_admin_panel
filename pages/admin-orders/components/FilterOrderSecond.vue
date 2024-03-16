<template>
  <div class="flex gap-4">
    <div class="relative">
      <input
        type="text"
        placeholder="Order #"
        class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <!-- Search Icon -->
        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
    </div>
    <select class="p-2 border rounded border-smooth" name="" id="">
      <option value="">Ready to Ship</option>
      <option value="">Ready to Delivery</option>
    </select>
    <select class="p-2 border rounded border-smooth" name="" id="">
      <option value="">Invoice</option>
      <option value="">Invoice 1</option>
    </select>
    <select class="p-2 border rounded border-smooth" name="" id="">
      <option value="">Order Type</option>
      <option value="">All</option>
      <option value="">Cart Orders</option>
      <option value=""> Negotiated Orders </option>
    </select>
    <select class="p-2 border rounded border-smooth" name="" id="">
      <option value="">Sort By</option>
      <option value="">Last Update (Oldest)</option>
      <option value="">Last Update (Newest)</option>
      <option value="">Price  (Highest)</option>
      <option value="">Price (Lowest)</option>
    </select>
  </div>
</template>
<script setup>
</script>
