<template>
    <v-autocomplete
        v-model="innerValue"
        v-bind="$attrs"
        v-on="$listeners"
        :search-input.sync="search"
        :multiple="multiple"
        :items="items"
        :filter="filter"
        :item-text="itemText"
        :item-value="itemValue"
        :menu-props="menuProps"
        @blur="onBlur"
        @click="onFocus"
        @keyup.esc="onKeyEsc"
    >
        <template v-slot:prepend-item>
            <template v-if="search && selectAll">
                <v-list-tile
                    ripple
                    @click.stop="selecionarTodos"
                >
                    <v-list-tile-action>
                        <v-icon>{{selectAllIcon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ selectAllText }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider class="mt-2"></v-divider>
            </template>
        </template>
    </v-autocomplete>
</template>

<script>
import _ from "lodash"

export default {
    props: {
        value: {
            type: null,
            default: null
        },
        itemValue: {
            type: String,
            default: "value"
        },
        itemText: {
            type: String,
            default: "text"
        },
        multiple: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: function() {
                return []
            }
        },
        selectAll: {
            type: Boolean,
            default: false
        },
        selectAllText: {
            type: String,
            default: "Selecionar todos"
        },
        selectAllIcon: {
            type: String,
            default: "select_all"
        }
    },
    data: () => ({
        innerValue: "",
        search: null,
        hasFocus: false
    }),
    computed: {
        menuProps() {
            if (!this.multiple) return {}
            return this.hasFocus || this.search ? { value: true } : { value: false }
        }
    },
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("input", newVal)
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal
        }
    },
    methods: {
        filter(item, queryText, itemText) {
            if (item[this.itemValue] === -1) return true
            return itemText && queryText && itemText.toLowerCase().indexOf(queryText.toLowerCase()) > -1
        },
        selecionarTodos() {
            let _items = this.items
                .filter(x => this.filter(x, this.search, x[this.itemText]))
                .map(x => x[this.itemValue])
                .filter(x => x !== -1)

            this.innerValue = _.uniq(_items)
            this.search = null
            this.hasFocus = false
        },
        onFocus() {
            this.hasFocus = true
        },
        onBlur() {
            this.hasFocus = false
        },
        onKeyEsc() {
            this.search = null
            this.hasFocus = false
        }
    },
    created() {
        if (this.value) {
            this.innerValue = this.value
        }
    }
}
</script>

<style>
</style>
