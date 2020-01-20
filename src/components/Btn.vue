<template>
    <v-tooltip
        v-if="tooltip"
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
                :small="small"
                :fab="fab"
                @click="e => $emit('click', e)"
            >
                <v-icon
                    v-if="iconValue"
                    :small="small && !fab"
                >{{iconValue}}</v-icon>
                <span
                    v-if="text"
                    class="ml-2"
                >{{text}}</span>
                <slot></slot>
            </v-btn>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
    <v-btn
        v-else
        v-model="innerValue"
        v-bind="$attrs"
        :class="$vnode.data.staticClass"
        :color="color"
        :disabled="disabled"
        :small="small"
        :fab="fab"
        @click="e => $emit('click', e)"
    >
        <v-icon
            v-if="iconValue"
            :small="small && !fab"
        >{{iconValue}}</v-icon>
        <span
            v-if="text"
            class="ml-2"
        >{{text}}</span>
        <slot></slot>
    </v-btn>
</template>

<script>
export default {
    props: {
        iconValue: String,
        tooltip: String,
        text: String,
        tooltipPosition: {
            type: String,
            default: "top"
        },
        fab: Boolean,
        color: String,
        disabled: Boolean,
        value: {
            type: null,
            default: null
        },
        small: Boolean
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
