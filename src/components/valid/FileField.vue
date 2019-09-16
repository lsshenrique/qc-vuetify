<template>
    <ValidationProvider
        :name="$attrs.label || name"
        :rules="rules"
        :vid="$vnode.data.ref"
    >
        <core-file-field
            slot-scope="{ errors, valid }"
            v-model="innerValue"
            v-bind="$attrs"
            :hide-details="$attrs['hide-details'] || valid !== false"
            :error-messages="errors"
            :success="valid"
            v-on="$listeners"
        />
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate"

export default {
    name: "ValidTextField",
    components: {
        ValidationProvider
    },
    props: {
        rules: {
            type: [Object, String],
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        // eslint-disable-next-line
        value: {
            default: null
        }
    },
    data: () => ({
        innerValue: ""
    }),
    watch: {
        value(newVal) {
            if (newVal instanceof File) this.innerValue = newVal
            else this.innerValue = null
        },
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("input", newVal)
        }
    },
    created() {
        if (this.value) {
            this.innerValue = this.value
        }
    }
}
</script>
