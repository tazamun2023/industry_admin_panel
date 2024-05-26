<template>
  <div>
    <div class="">
      <FilterGlobal page-heading="Rejection Reasons" route="rejection-reasons/create"/>
      <div class="table-wrapper p-4">
       <div class="border border-cardb rounded-[12px]">
        <table  class="mn-w-600x">
            <thead>
              <tr>
                <th>#</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Group</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
              <td class="font-medium">Here you can put the reason of reject</td>
              <td>Products</td>
              <td>group of products reason</td>
              <td>
               <SwitchToggle checked="checked"/>
              </td>
              <td>
              <div class="flex gap-4 items-center">
                <edit-button-icon/>
               <delete-button-icon/>
              </div>
              </td>
              </tr>
              <tr>
                <td>1</td>
              <td  class="font-medium">Here you can put the reason of reject</td>
              <td>RFQs</td>
              <td>group of products reason</td>
              <td>
                <SwitchToggle/>
              </td>
              <td>
              <div class="flex gap-4 items-center">
                <edit-button-icon/>
               <delete-button-icon/>
              </div>
              </td>
              </tr>
            </tbody>
        </table>
        <GlobalPagination/>
       </div>
    </div>
  </div>
  </div>
</template>

<script>
import DeleteButtonIcon from '../../components/partials/DeleteButtonIcon.vue'
import EditButtonIcon from '../../components/partials/EditButtonIcon.vue'

  export default {
    data() {
      return {

      }
    },
    props: {},
    mixins: [],
    components: {
        EditButtonIcon,
        DeleteButtonIcon

    },
    computed: {

    },
    methods: {

    },
    created() {
    },
    async mounted() {

    }
  }
</script>


