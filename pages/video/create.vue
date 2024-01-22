<template>
    <div class="tab-sidebar">
        <div class="card">
            <div class="title p-2 border-b border-smooth flex justify-between">
                <h3>Add Video </h3>
                <nuxt-link :to="`/buisness-news`" class="button primary-btn">List</nuxt-link>
            </div>
            <form class="p-4" action="">
                <div class="my-2 input-wrapper">
                    <label for="">Video Title</label>
                <input type="text" placeholder="Title here">
                </div>
                <div  class="my-2 input-wrapper">
                 <label for="">Video Link</label>
                <input type="url" name="" id="" placeholder="Video Link">
                </div>
                <div  class="my-2 input-wrapper">
                 <label for="">Video Ordering</label>
                <input type="number" name="" id="" placeholder="example 1">
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