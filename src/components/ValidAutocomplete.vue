<template>
    <ValidationProvider
        :name="$attrs.label || $attrs.name"
        :rules="rules"
    >
        <base-autocomplete
            slot-scope="data"
            v-model="innerValue"
            :error-messages="data.errors"
            :success="showSuccess && data.valid"
            :items="items"
            :hide-details="$attrs['hide-details'] || data.valid !== false"
            :attach="attach"
            v-on="$listeners"
            v-bind="$attrs"
        />
    </ValidationProvider>
</template>

<script>
import BaseAutocomplete from "./Autocomplete"
import { ValidationProvider } from "vee-validate"

export default {
    name: "ValidAutocomplete",
    components: {
        ValidationProvider,
        BaseAutocomplete
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
        items: Array,
        attach: null
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
        value: {
            deep: true,
            handler(newVal) {
                this.innerValue = newVal
            }
        }
    }
}
</script>
