<template>
    <v-tooltip
        :top="tooltipPosition === 'top'"
        :right="tooltipPosition === 'right'"
        :bottom="tooltipPosition === 'bottom'"
        :left="tooltipPosition === 'left'"
        :content-class="tooltipPosition"
        :disabled="disabled"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                v-model="innerValue"
                v-bind="$attrs"
                :class="$vnode.data.staticClass"
                :color="color"
                :disabled="disabled"
                v-on="on"
                @click="e => $emit('click', e)"
            >
                <v-icon v-if="iconValue">{{iconValue}}</v-icon>
                <slot></slot>
            </v-btn>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
export default {
    props: {
        iconValue: String,
        tooltip: String,
        tooltipPosition: {
            type: String,
            default: "top"
        },
        color: String,
        disabled: Boolean,
        value: {
            type: null,
            default: null
        }
    },
    data: () => ({
        innerValue: null
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

<style>
</style>
