<template>
    <v-text-field
        v-model.lazy="innerValue"
        v-money="money"
        v-bind="$attrs"
        class="text-xs-right"
    />
</template>

<script>
import { VMoney } from "v-money"
import _ from "lodash"

export default {
    name: "BaseMoneyField",
    props: {
        // must be included in props
        value: {
            type: [String, Number],
            default: 0
        }
    },
    directives: { money: VMoney },
    data: () => ({
        innerValue: "0,00",
        money: { decimal: ",", thousands: "." }
    }),
    watch: {
        // Handles internal model changes.
        innerValue: _.debounce(function(newVal, oldVal) {
            let aux = this.numberToString(newVal)

            if (aux !== this.value) {
                this.$emit("input", aux)
            }
        }, 200),
        // Handles external model changes.
        value: {
            immediate: true,
            handler(newVal) {
                if(this.$attrs["label"] === "Valor Fixo")debugger

                this.innerValue = this.numberToString(newVal)
            }
        }
    },
    methods: {
        numberToString(value) {
            if (typeof value === "string") {
                let valor = value.replace(/\./g, "").replace(",", ".")
                valor = parseFloat(valor)
                return isNaN(valor) ? 0 : valor
            } else {
                return value
            }
        },
        stringToNumber() {
            if (typeof value === "number") {
                let valor = parseFloat(value)

                if (isNaN(valor)) valor = 0

                return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            } else {
                return value
            }
        }
    }
}
</script>
