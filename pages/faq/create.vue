<template>
    <div class="tab-sidebar">
        <div class="card">
            <div class="title p-2 border-b border-smooth flex justify-between">
                <h3>Add FAQ </h3>
                <nuxt-link :to="`/faq`" class="button primary-btn">List</nuxt-link>
            </div>
            <form class="p-4" action="">
                <div class="my-2 input-wrapper">
                    <label for="">FAQ Question</label>
                <input type="text" placeholder="Title here">
                </div>
                <div  class="my-2 input-wrapper">
                 <label for="">FAQ Answer</label>
                <textarea placeholder="Answer" name="" id="" cols="30" rows="10"></textarea>
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