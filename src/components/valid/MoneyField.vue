<template>
    <ValidationProvider
        :name="$attrs.label || name"
        :rules="rules"
        :vid="$vnode.data.ref"
    >
        <BaseMoneyField
            slot-scope="{ errors, valid }"
            v-model.lazy="innerValue"
            v-bind="$attrs"
            class="text-xs-right"
            :error-messages="errors"
            :success="showSuccess && valid"
            :hide-details="$attrs['hide-details'] || valid !== false"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        >
            <!-- Pass on all named slots -->
            <slot
                v-for="slot in Object.keys($slots)"
                :name="slot"
                :slot="slot"
            />

            <!-- Pass on all scoped slots -->
            <!-- <template
                v-for="slot in Object.keys($scopedSlots)"
                :slot="slot"
                slot-scope="scope"
            >
                <slot
                    :name="slot"
                    v-bind="scope"
                />
            </template> -->
        </BaseMoneyField>
    </ValidationProvider>
</template>

<script>
import BaseMoneyField from "./../base/BaseMoneyField"
import { ValidationProvider } from "vee-validate"

export default {
    name: "ValidMoneyField",
    components: {
        ValidationProvider,
        BaseMoneyField
    },
    props: {
        rules: {
            type: [Object, String],
            default: ""
        },
        // must be included in props
        value: {
            type: [String, Number],
            default: 0
        },
        name: {
            type: String,
            default: ""
        },
        showSuccess: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        innerValue: "0,00"
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
