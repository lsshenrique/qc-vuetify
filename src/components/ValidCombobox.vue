<template>
    <ValidationProvider
        :name="$attrs.label || $attrs.name"
        :rules="rules"
    >
        <v-combobox
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
