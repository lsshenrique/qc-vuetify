<template>
    <ValidationProvider
        :name="$attrs.label || $attrs.name"
        :rules="rules"
        :debounce="500"
    >
        <BaseDataPicker
            slot-scope="{ errors, valid }"
            v-model="innerValue"
            :error-messages="errors"
            :success="showSuccess && valid"
            :hide-details="$attrs['hide-details'] || valid !== false"
            v-bind="$attrs"
            v-on="$listeners"
        />
    </ValidationProvider>
</template>

<script>
import BaseDataPicker from "./../base/DataPicker"
import { ValidationProvider } from "vee-validate"

export default {
    name: "ValidDataPicker",
    components: {
        ValidationProvider,
        BaseDataPicker
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
        }
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
            immediate: true,
            handler(newVal) {
                this.innerValue = newVal
            }
        }
    }
}
</script>
