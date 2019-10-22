<template>
    <v-tooltip
        :top="tooltipPosition === 'top'"
        :right="tooltipPosition === 'right'"
        :bottom="tooltipPosition === 'bottom'"
        :left="tooltipPosition === 'left'"
        :content-class="tooltipPosition"
        :disabled="disabled"
        :max-width="maxWidth"
    >
        <template v-slot:activator="{ on }">
            <v-badge
                v-if="badgeCount"
                overlap
                :color="badgeColor"
                :top="badgePosition === 'top'"
                :right="badgePosition === 'right'"
                :bottom="badgePosition === 'bottom'"
                :left="badgePosition === 'left'"
                :class='badgeClass'
            >
                <template v-slot:badge>
                    <span v-on="on">{{ badgeCount }}</span>
                </template>
                <v-icon
                    v-on="on"
                    :color="color"
                >{{icon}}</v-icon>
            </v-badge>

            <v-icon
                v-else
                v-on="on"
                :color="color"
                :class="$vnode.data.staticClass"
            >{{icon}}</v-icon>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>

</template>

<script>
export default {
    props: {
        icon: String,
        tooltip: String,
        tooltipPosition: {
            type: String,
            default: "top"
        },
        color: String,
        badgeCount: [String, Number],
        badgeClass: [String, Object],
        badgeColor: {
            type: String,
            default: 'grey'
        },
        badgePosition: {
            type: String,
            default: 'bottom'
        },
        disabled: Boolean,
        maxWidth: null
    }
}
</script>