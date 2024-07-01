<template>
  <li class="tree-node">

    <!-- <slot
      name="checkbox"
      v-bind:id="node.id"
    /> -->


    <div @click="toggleVisibility" class="pt-2 pl-2 border-b-2 border-graylight pr-2 flex justify-between my-1"
         :class="{ 'bg-graylight rounded-lg': node.child.length > 0 }">

    <span class="node-data leading-9">

      <img v-if="node.child.length > 0" class="w-3 h-3 arrocon" src="~/assets/icon/Listbutton.svg" alt="">
    <lazy-image
      :data-src="getThumbImageURL(node.image)"
      :alt="node.title"
    />
    {{ node.title }}
    </span>

      <div class="flex flex-row gap-4">


    <span class="mx-2" v-if="$can('manage_categories')" @click.prevent="deleteNode(node)">
      <img class="w-4 h-4 mt-[11px]" src="~/assets/icon/trash-01.svg" alt="">
    </span>
    <span
          v-if="$can('manage_categories')" class="text-white mx-2" @click.prevent="editNode(node)">
      <img class="w-4 h-4 mt-[11px]" src="~/assets/icon/edit-01.svg" alt="">
    </span>
    <switch-toggle :id="node.id"
                       :is-read-only="!($can('manage_categories'))"
                       col="status"
                       set-api="toggleCategory"
                       :change-in-server="true"
                       :value="node.status==1"/>
      </div>

    </div>

    <ul v-if="showChildren">
      <tree-node
        v-for="childNode in node.child"
        :key="childNode.id"
        :node="childNode"
        @edit="editNode"
        @delete="deleteNode"
      >

        <template
          v-slot:checkbox="{id}"
        >
          <slot
            name="inner-checkbox"
            v-bind:id="childNode.id"
          />
        </template>

      </tree-node>
    </ul>
  </li>
</template>

<script>
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage"
import SwitchToggle from "./SwitchToggle.vue";

export default {
  name: 'TreeNode',
  components: {SwitchToggle, LazyImage},
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showChildren: false
    };
  },
  mixins: [util],
  methods: {
    editNode(node) {

      this.$emit('edit', node)
    },
    deleteNode(node) {
      this.$emit('delete', node)
    },
    toggleVisibility() {
      this.showChildren = !this.showChildren;
    },
  },

}
</script>

<style>
.rtl .tree-node {
  margin-left: 0;
  margin-right: 10px;
}

.tree-node {
  margin-left: 10px;
  cursor: pointer;
}

.rtl .tree-node .node-data {
  padding-left: 0;
  padding-right: 50px;
}

.tree-node .node-data {
  padding-left: 50px;
  min-height: 50px;
  position: relative;
}

.rtl .tree-node .node-data img {
  right: 0;
  left: auto;
}


.tree-node .node-data img {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -20px;
  height: 40px;
  width: 40px;
}

.arrocon {
  width: 33px !important;
  height: 27px !important;
}
</style>
