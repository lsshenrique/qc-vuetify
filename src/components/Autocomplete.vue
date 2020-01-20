<template>
    <v-autocomplete
        ref="autocomplete"
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
        :attach="attach"
        :readonly="readonly"
        @click="onFocus"
        @blur="onBlur"
        @mousedown="onMouseDown"
        @keyup.esc="onKeyEsc"
        @keydown="onKeyDown"
        @input="onInput"
        @update:searchInput="onUpdate"
    >
        <template v-slot:prepend-item>
            <template v-if="search && selectAll">
                <v-list-tile
                    ripple
                    @click.stop="selecionarTodos"
                >
                    <v-icon>{{selectAllIcon}}</v-icon>
                    <v-list-tile-action>
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
    name: "Autocomplete",
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
        },
        readonly: {
            default: false
        },
        attach: null
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
        },
        isAttached() {
            return this.attach === true || this.attach === ""
        },
        isReadonly() {
            return this.readonly === true || this.readonly === ""
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
        onFocus(e) {
            this.hasFocus = true
            this.openMenuCondicional(e)
        },
        onBlur(e) {
            this.hasFocus = false
            this.closeMenuCondicional(e)
        },
        onKeyEsc(e) {
            this.search = null
            this.hasFocus = false
            this.closeMenuCondicional(e)
        },
        onKeyDown(e) {
            this.$emit("keydown", e)
            this.openMenuCondicional(e)
        },
        onMouseDown(e) {
            this.$emit("mousedown", e)
        },
        onInput(e) {
            this.$emit("input", e)
            this.openMenuCondicional(e)
        },
        onUpdate(e) {
            this.$emit("update", e)
        },
        openMenuCondicional(e) {
            if (!this.isAttached || !e) return

            if (this.isReadonly) {
                this.forceCloseMenu()
                return
            }

            let autocomplete = this.$refs.autocomplete

            autocomplete.isMenuActive = true
            autocomplete.$_menuProps.value = true
            autocomplete.$refs.menu.isActive = true

            if (!autocomplete.isFocused) {
                autocomplete.isFocused = true
                autocomplete.$emit("focus")
                autocomplete.$refs.input.focus()
            }
        },
        closeMenuCondicional(e) {
            if (!this.isAttached) return

            // let autocomplete = this.$refs.autocomplete

            // if (e && e.path[0]) {
            //     let firstEl = e.path[0]

            //     if (firstEl.tagName !== "INPUT" || e.type !== "blur") {
            //         if (autocomplete.content.contains(firstEl) || autocomplete.$el.contains(firstEl)) {
            //             this.openMenuCondicional(e)
            //             return
            //         }
            //     }
            // }

            this.forceCloseMenu()
        },
        forceCloseMenu() {
            let autocomplete = this.$refs.autocomplete
            autocomplete.isMenuActive = false
            autocomplete.isFocused = false
            autocomplete.$refs.input && autocomplete.$refs.input.blur()
            autocomplete.selectedIndex = -1
        }
    },
    created() {
        if (this.value) {
            this.innerValue = this.value
        }
    }
}
</script>