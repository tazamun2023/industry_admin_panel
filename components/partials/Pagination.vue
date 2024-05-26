<template>
  <div>
    <div v-if="totalPage > 1">
      <div class=" flex border-t border-cardb p-4 justify-between items-center gap-4">

        <button :disabled="currentPage === 1"
                @click.prevent="navigateToFirst"
                :class="{disabled: currentPage === 1}"
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
          <svg class="w-4 h-4 text-primary rtl:rotate-180" width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L6 8L9 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
          {{ $t('app.Previous') }}
        </button>


        <div class="flex items-center gap-2">

          <template v-for="(value, index) in visiblePages">
            <button
              v-if="currentPage === value"
              :key="index"
              @click.prevent="paginate(value)"
              class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-primary text-center align-middle font-sans text-xs font-medium  border-none uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 font-bold top-1/2 left-1/2">
              {{ value }}</span>
            </button>
            <button v-else
                    :key="index"
                    :disabled="value==='...'"
                    @click.prevent="paginate(value)"
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase border-none transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
      <span class="absolute transform -translate-x-1/2 -translate-y-1/2 font-bold top-1/2 left-1/2">
         {{ value }}
      </span>
            </button>
          </template>
        </div>

        <button
          :class="{disabled: currentPage === totalPage}"
          :disabled="currentPage === totalPage"
          @click.prevent="paginate(currentPage+1)"
          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          {{ $t('app.Next') }}

          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            aria-hidden="true" class="w-4 h-4 text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg> -->
          <svg class="w-4 h-4 text-primary rtl:rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 13.75L12.5 10L8.75 6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      sortByType: this.$route.query.orderByType || "desc",
      sortBy: this.$route.query.orderBy || "created_at",
      currentPage: Number(this.$route.query.page) || this.page,
      search: this.$route.query.search || null,
    };
  },
  props: {
    changingRoute: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
    },
    pagePer: {
      type: Number,
      default: 5,
    },
  },
  watch: {
    currentPage() {
      this.$emit('handCurrentPage', this.currentPage)
    }
  },
  computed: {
    visiblePages() {
      const visiable_pages = [];
      let pageCutLow = this.currentPage - 1;
      let pageCutHigh = this.currentPage + 1;

      // Show all the pagination elements if there are less than 6 pages total
      if (this.totalPage < 6) {
        for (let p = 1; p <= this.totalPage; p++) {
          visiable_pages.push(p);
        }
      }
      // Use "..." to collapse pages outside of a certain range
      else {
        // Show the very first page followed by a "..." at the beginning of the
        // pagination section (after the Previous button)
        if (this.currentPage > 2) {
          visiable_pages.push(1);
          if (this.currentPage > 3) {
            visiable_pages.push("...");
          }
        }
        // Determine how many pages to show after the current page index
        if (this.currentPage === 1) {
          pageCutHigh += 2;
        } else if (this.currentPage === 2) {
          pageCutHigh += 1;
        }
        // Determine how many pages to show before the current page index
        if (this.currentPage === this.totalPage) {
          pageCutLow -= 2;
        } else if (this.currentPage === this.totalPage - 1) {
          pageCutLow -= 1;
        }
        // Output the indexes for pages that fall inside the range of pageCutLow
        // and pageCutHigh
        for (let p = pageCutLow; p <= pageCutHigh; p++) {
          if (p === 0) {
            p += 1;
          }
          if (p > this.totalPage) {
            continue
          }
          visiable_pages.push(p);
        }
        // Show the very last page preceded by a "..." at the end of the pagination
        // section (before the Next button)
        if (this.currentPage < this.totalPage - 1) {
          if (this.currentPage < this.totalPage - 2) {
            visiable_pages.push("...");
          }
          visiable_pages.push(this.totalPage);
        }
      }
      return visiable_pages;
    },
  },
  methods: {


    routeParam() {
      if (this.isDefaultPage()) {
        this.resettingRoute();
      } else {
        this.clearQuery();
        this.$emit("fetching-data");
      }
      this.scrollToTop();
    },
    nextFivePaginate() {
      let m = this.currentPage + 1;
      if (m >= this.totalPage) {
        return false
      } else {
        this.currentPage = m;
        this.getDataWithRoute();
      }
    },
    prevFivePaginate() {
      let m = this.currentPage - 1;
      if (m <= 0) {
        return false
      } else {
        this.currentPage = m;
        this.getDataWithRoute();
      }
    },
    resettingRoute(routeParams = {}) {
      this.clearQuery();
      this.$router.push({
        query: {
          ...routeParams,
          ...{
            orderBy: this.orderBy,
            orderByType: this.orderByType,
            page: this.currentPage,
            search: this.search,
          },
        },
      });
      this.$emit("fetching-data");
    },
    clearQuery() {
      this.orderByType = "desc";
      this.orderBy = "created_at";
      this.currentPage = 1;
    },
    isDefaultPage() {
      return (
        this.orderByType === "desc" &&
        this.orderBy === "created_at" &&
        this.currentPage === 1
      );
    },
    settingRoute() {
      this.$router.push({
        query: {
          ...this.$route.query,
          ...{
            orderBy: this.orderBy,
            orderByType: this.orderByType,
            page: this.currentPage,
            search: this.search,
          },
        },
      });
    },
    dropdownSelected(isOrderType, data) {
      this.currentPage = 1;
      if (isOrderType) this.orderByType = data.key;
      else this.orderBy = data.key;

      this.getDataWithRoute();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    getDataFromRoute() {
      this.sortByType = this.$route.query.orderByType || "desc";
      this.sortBy = this.$route.query.orderBy || "created_at";
      this.currentPage = Number(this.$route.query.page) || 1;
      this.search = this.$route.query.search || null;

      this.$emit("fetching-data");
    },
    getDataWithRoute() {
      if (this.changingRoute) {
        this.settingRoute();
        this.scrollToTop();
      }
      this.$emit("fetching-data", {
        orderBy: this.orderBy,
        orderByType: this.orderByType,
        page: this.currentPage,
        search: this.search,
      });
    },
    navigate(param) {
      if (
        (param > 0 && this.currentPage >= this.totalPage) ||
        (param < 0 && this.currentPage <= 1)
      )
        return;

      this.currentPage += param;

      this.getDataWithRoute();
    },
    paginate(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.getDataWithRoute();
      }
    },
    loadData() {
      this.getDataFromRoute();
    },
    navigateToFirst() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
        this.getDataWithRoute();
      }
    },
    navigateToLast() {
      if (this.currentPage !== this.totalPage) {
        this.currentPage = this.totalPage;
        this.getDataWithRoute();
      }
    },
  },
  destroyed() {
    window.removeEventListener("popstate", this.loadData);
  },
  mounted() {
    window.addEventListener("popstate", this.loadData);
  },
};
</script>
