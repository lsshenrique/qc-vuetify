<template>
    <v-text-field
        v-model="innerValue"
        v-bind="$attrs"
        class="text-xs-right"
        @input.native="input"
    >
        <!-- Pass on all named slots -->
        <slot
            v-for="slot in Object.keys($slots)"
            :name="slot"
            :slot="slot"
        />

        <!-- Pass on all scoped slots -->
        <template
            v-for="slot in Object.keys($scopedSlots)"
            :slot="slot"
            slot-scope="scope"
        >
            <slot
                :name="slot"
                v-bind="scope"
            />
        </template>
    </v-text-field>
</template>

<script>
import _ from "lodash"
import { format, unformat, setCursor, defaults } from "../../util/moneyMask.js"

export default {
    name: "BaseMoneyField2",
    props: {
        // must be included in props
        value: {
            type: [String, Number],
            default: 0
        },
        masked: {
            type: Boolean,
            default: false
        },
        precision: {
            type: Number,
            default: () => defaults.precision
        },
        decimal: {
            type: String,
            default: () => defaults.decimal
        },
        thousands: {
            type: String,
            default: () => defaults.thousands
        }
    },
    data: () => ({
        innerValue: null
    }),
    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                let formatted = format(newValue, this.$props)

                if (formatted !== this.innerValue) {
                    this.innerValue = formatted
                }
            }
        }
    },
    methods: {
        input(evt) {
            let opt = this.$props
            let el = this.getInput(evt.target)

            var positionFromEnd = el.value.length - el.selectionEnd
            el.value = format(el.value, opt)

            positionFromEnd = Math.max(el.value.length - positionFromEnd, 1)
            setCursor(el, positionFromEnd)

            this.emitInputLazy(el.value)
        },
        getInput(el) {
            if (!el) el = this.$el
            if (!el) return

            return el.tagName.toLocaleUpperCase() !== "INPUT" ? el.getElementsByTagName("input")[0] : el
        },
        emitInputLazy: _.debounce(function(value) {
            this.innerValue = value
            // this.$emit("input", value)
            this.$emit("input", this.masked ? value : unformat(value, this.precision))
        }, 200)
    }
}
</script>
