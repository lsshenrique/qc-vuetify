<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        :disabled="disabled || readonly"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-bind="$attrs"
                :value="dataComputada"
                :label="label"
                :prepend-inner-icon="prependInnerIcon"
                :hide-details="hideDetails"
                v-on="on"
                @blur="innerValue = parseDate($event.target.value)"
                :disabled="disabled"
                :readonly="readonly || block"
                :mask="typeIsMonth ? '##/####' : '##/##/####'"
                :class="$vnode.data.staticClass"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="innerValue"
            no-title
            scrollable
            locale="pt-BR"
            :date-format="typeIsMonth ? 'mm/yyyy' : 'dd/mm/yyyy'"
            @change="onChange"
            :type="type"
            :disabled="disabled"
            :readonly="readonly"
            :max="max"
        >
        </v-date-picker>
    </v-menu>
</template>

<script>
import moment from "moment"

export default {
    name: "BaseDataPicker",
    props: {
        label: String,
        value: String,
        hideDetails: Boolean,
        type: {
            type: String,
            default: "date"
        },
        disabled: Boolean,
        readonly: Boolean,
        rules: {
            type: [Object, String],
            default: ""
        },
        prependInnerIcon: {
            type: String,
            default: "event"
        },
        max: String,
        block: Boolean
    },
    data: () => ({
        menu: false,
        innerValue: ""
    }),
    computed: {
        dataComputada() {
            return this.innerValue ? moment(this.innerValue).format(this.format) : ""
        },
        typeIsMonth() {
            return this.type === "month"
        },
        format() {
            return this.typeIsMonth ? "MM/YYYY" : "DD/MM/YYYY"
        }
    },
    methods: {
        parseDate(date) {
            if (!date) return null
            let dateAux = moment(date, this.format)
            return dateAux.isValid() ? dateAux.toISOString() : ""
        },
        onChange(){
            this.menu = false
            this.$emit("change")
        }
    },
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            let data = moment(newVal, ["YYYY-MM", "YYYY-MM-DD", moment.ISO_8601])
            newVal = data.isValid() ? data.format(this.format) : null

            this.$emit("input", newVal)
        },
        // Handles external model changes.
        value: {
            immediate: true,
            handler(newVal) {
                let formato = ["DD/MM/YYYY", "YYYY-MM-DD", "MM/YYYY", "YYYY-MM"]
                let data = moment(newVal, formato)
                this.innerValue = data.isValid() ? data.toISOString() : ""
            }
        }
    }
}
</script>

<style>
</style>
