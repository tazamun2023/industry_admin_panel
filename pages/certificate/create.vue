<template>
    <div class="tab-sidebar" 
    v-if="$can('manage_content')"
    >
        <div class="card">
            <div class="title p-2 border-b border-smooth flex justify-between">
                <h3>Add Certificate </h3>
                <nuxt-link :to="`/buisness-news`" class="button primary-btn">List</nuxt-link>
            </div>
            <form class="p-4" action="">
                <div class="my-2 input-wrapper">
                    <label for="">Certificate Title</label>
                <input type="text" placeholder="Title here">
                </div>
                <div class="my-2 input-wrapper">
                    <label for="">Upload Certificate</label>
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