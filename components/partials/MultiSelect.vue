<template id="MultiSelect">
    <div>
        <div class="dropdown" @click="showDropdown">
            <div class="overselect h-[44px] rounded-[10px]"></div>
            <select class="custom-select h-[44px] rounded-[10px] c-form-input p-2 border capitalize rounded border-smooth" :disabled="disabled">
                <option value="">{{ title }} <strong>{{ lengthSeleted }}</strong></option>
            </select>
        </div>
        <div class="multiselect" v-if="show">
            <ul class="flex flex-col ">
                <li class="flex justify-between  hover:bg-primarylight cursor-pointer px-2 py-1"
                    v-for="(option, index) in options" :key="index" :checked="selected.value == option.value">
                    <input type="checkbox" :id="index" :value="option.value" v-model="selected"
                        @change="onCheck($event, option.value)">
                    <label :for="index" class="font-semibold ">{{ $t(`statusOrder.${option[label]}`) }}</label>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    name: 'MultiSelect',
    template: '#MultiSelect',
    props: {
        options: {
            type: Array(),
            default: null,
        },
        label: {
            type: String,
            default: 'title',
        },
        title: {
            type: String,
            default: 'selectd search',
        },
        selectedAll: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        disabledData: {
            type: String,
            default: null,
        },
    },
    computed: {
        lengthSeleted() {
            return this.options.length === this.selected.length ? `(${this.$i18n.t('statusOrder.all')})` :
                this.selected.length == 1 ? this.selected[0] : this.selected.length == 0 ? '' : '('+this.selected.length+')'
        }
    },
    data() {
        return {
            show: false,
            selected: []
        }
    },

    methods: {
        showDropdown() {
            this.show = !this.show
        },
        handelSelectedAll() {
            if (this.selectedAll) {
                this.selected = this.options.map(option => option.value)
                this.$emit('checked', this.selected)
            }
            if (this.disabled) {
                this.selected = this.disabledData
            }
        },
        onCheck(e, val) {
            if (val === 'all') {
                if (e.target.checked) this.selected = this.options.map(option => option.value);
                else this.selected = '';
            } else {
                if (e.target.checked) {
                    if (this.selected === null || this.selected == true || this.selected == false) {
                        this.selected = []
                    }
                    if (!this.selected.includes(val)) {
                        this.selected.push(val);
                    }
                }
                else {
                    const index = this.selected.indexOf(val);
                    if (index !== -1) {
                        this.selected.splice(index, 1);
                    }
                }
            }
            this.$emit('checked', this.selected)
        },
        watch: {
            // selected() {
            //     this.$emit('checked', this.selected)
            // }
        },
        mounted() {
            this.handelSelectedAll()
        }

    }
}
</script>

<style lang="css">
.dropdown {
    position: relative;
    cursor: pointer;
}

.multiselect {
    position: relative;
    background-color: #fff;
}

.multiselect ul {
    background-color: #fff;
    border: 1px solid #ddd;
    border-top: 0;
    border-radius: 0 0 3px 3px;
    left: 0px;
    padding: 8px 8px;
    position: absolute;
    top: 0rem;
    width: 100%;
    list-style: none;
    max-height: 250px;
    overflow: auto;
    z-index: 1000;
}

.overselect {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

input[type="checkbox"]:checked {
    background-color: rgb(1 167 129 / 1);
    border-color: #fff;
    box-shadow: none;
}
</style>
