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
                prepend-inner-icon="event"
                :hide-details="hideDetails"
                v-on="on"
                @blur="innerValue = parseDate($event.target.value)"
                :disabled="disabled"
                :readonly="readonly"
                :mask="typeIsMonth ? '##/####' : '##/##/####'"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="innerValue"
            no-title
            scrollable
            locale="pt-BR"
            :date-format="typeIsMonth ? 'mm/yyyy' : 'dd/mm/yyyy'"
            @change="menu = false"
            :type="type"
            :disabled="disabled"
            :readonly="readonly"
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
        }
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