<template>
    <ValidationProvider
        :name="$attrs.label || $attrs.name"
        :rules="rules"
    >
        <v-select
            slot-scope="{ errors, valid }"
            v-model="innerValue"
            :error-messages="errors"
            :success="showSuccess && valid"
            :hide-details="$attrs['hide-details'] || valid !== false"
            :attach="attach"
            :browserAutocomplete="browserAutocomplete"
            :chips="chips"
            :clearable="clearable"
            :deletableChips="deletableChips"
            :dense="dense"
            :hideSelected="hideSelected"
            :items="items"
            :itemAvatar="itemAvatar"
            :itemDisabled="itemDisabled"
            :itemText="itemText"
            :itemValue="itemValue"
            :multiple="multiple"
            :openOnClear="openOnClear"
            :returnObject="returnObject"
            :searchInput="searchInput"
            :smallChips="smallChips"
            v-bind="$attrs"
            v-on="$listeners"
        />
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate"

export default {
    components: {
        ValidationProvider
    },
    props: {
        rules: {
            type: [Object, String],
            default: ""
        },
        value: {
            type: null,
            default: null
        },
        showSuccess: {
            type: Boolean,
            default: false
        },
        attach: {
            type: null,
            default: false
        },
        browserAutocomplete: {
            type: String,
            default: "on"
        },
        chips: Boolean,
        clearable: Boolean,
        deletableChips: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: () => []
        },
        itemAvatar: {
            type: [String, Array, Function],
            default: "avatar"
        },
        itemDisabled: {
            type: [String, Array, Function],
            default: "disabled"
        },
        itemText: {
            type: [String, Array, Function],
            default: "text"
        },
        itemValue: {
            type: [String, Array, Function],
            default: "value"
        },
        multiple: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean
    },
    data: () => ({
        innerValue: ""
    }),
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
    created() {
        if (this.value) {
            this.innerValue = this.value
        }
    }
}
</script>
