<template>
   <div class="grid grid-cols-2 container-c mx-auto gap-4">
        <div class="card p-4">
            <div class="title">
                <h4>Genaral Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">Slug/Subdomain</label>
                    <input type="text" placeholder="Slug" readonly>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Email</label>
                    <input type="email" placeholder="Email">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Mobile</label>
                    <input type="number" placeholder="Mobile">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">CR number</label>
                    <input type="text" placeholder="CR Number">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Status</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Enable</option>
                        <option value="">Disable</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Primary Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">Foundated date</label>
                    <input type="date" placeholder="12-12-12" readonly>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Production start date</label>
                    <input type="date"  placeholder="00-00-00" readonly>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Primary email</label>
                    <input type="email" placeholder="Email">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Primary mobile</label>
                    <input type="number" placeholder="Mobile">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Facality Type</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
            </div>
        </div>
                <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Location Information</h4>
            </div>
            <div class="form-group">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-wrapper  mb-2">
                    <label for="">Country</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">State</label>
                    <select class="border border-smooth w-100 p-2 rounded" name="" id="">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Area name</label>
                    <input type="text" placeholder="Area name">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Street name</label>
                    <input type="text"  placeholder="Street name">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Building name</label>
                    <input type="text" placeholder="Building name">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Nearby</label>
                    <input type="text" placeholder="Nearby">
                </div>
                
            </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Social Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper  mb-2">
                    <label for="">Whatsapp</label>
                    <input type="number" placeholder="Whatsapp number">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Facebook</label>
                    <input type="url" placeholder="http://">
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">Linkadin</label>
                    <input type="url" placeholder="http://">
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Youtube</label>
                    <input type="url" placeholder="http://">
                </div>
                <div class="input-wrapper text-end mb-2">
                    <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20">Save Change</button>
                </div>
            </div>
        </div>
   </div>
</template>

<style>
.container-c{
    min-width: 650px;
    max-width: 1200px;
}
</style>