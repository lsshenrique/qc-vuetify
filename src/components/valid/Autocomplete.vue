<template>
    <ValidationProvider
        :name="$attrs.label || $attrs.name"
        :rules="rules"
    >
        <base-autocomplete
            slot-scope="{ errors, valid }"
            v-model="innerValue"
            :error-messages="errors"
            :success="showSuccess && valid"
            :items="items"
            :hide-details="$attrs['hide-details'] || valid !== false"
            v-on="$listeners"
            v-bind="$attrs"
        />
    </ValidationProvider>
</template>

<script>
import BaseAutocomplete from "./../base/Autocomplete"
import { ValidationProvider } from "vee-validate"

export default {
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
        items: Array
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
