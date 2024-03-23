<template>
  <div class="tab-sidebar p-4">
    <div class="flex mb-2 justify-between">
      <h3>Add Vendor User</h3>
      <button class="bg-primary border p-2 leading-3 text-white w-[100px]">List</button>
    </div>
    <div>
      <form action="">
        <div class="input-wrapper">
          <label for="">User Name</label>
          <input type="text" placeholder="Username">
        </div>
        <div class="input-wrapper">
          <label for="">Name</label>
          <input type="text" placeholder="name">
        </div>
        <div class="input-wrapper">
          <label for="">Email</label>
          <input type="email" placeholder="email">
        </div>
        <div class="input-wrapper">
          <label class="w-full" for="">Role</label>
          <select class="w-50 p-2 border border-smooth rounded" name="" id="">
            <option value="">Select role</option>
            <option value="">Role 1</option>
            <option value="">Role 2</option>
          </select>
        </div>
        <div class="input-wrapper">
          <label for="verified"><input type="checkbox"> Is Verified</label>
        </div>
        <div class="input-wrapper mb-0 text-end">
          <button class="bg-primary leading-3 w-[100px] p-2 rounded text-white">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>