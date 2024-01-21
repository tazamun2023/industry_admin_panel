<template>
    <div class="tab-sidebar">
        <div class="card">
            <div class="title p-2 border-b border-smooth flex justify-between">
                <h3>Add Buisness News </h3>
                <nuxt-link :to="`/buisness-news`" class="button primary-btn">List</nuxt-link>
            </div>
            <form class="p-4" action="">
                <div class="my-2 input-wrapper">
                    <label for="">News Title</label>
                <input type="text" placeholder="Title here">
                </div>
                <div class="input-wrapper my-2">
                <label for="">News Details</label>
               <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div  class="my-2 input-wrapper">
                 <label for="">Upload Image</label>
                <input type="file" name="" id="">
                </div>
                <div class="text-end">
                    <button class="button primary-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

</script>