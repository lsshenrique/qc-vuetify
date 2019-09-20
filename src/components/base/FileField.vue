<template>
    <div>
        <v-text-field
            v-bind="$attrs"
            v-model="fileName"
            readonly
            :prepend-icon="$attrs['prepend-icon'] || 'mdi-paperclip'"
            v-on="$listeners"
            @click="$refs.fileUpload.click()"
        />
        <input
            ref="fileUpload"
            :accept="$attrs.accept"
            type="file"
            style="display: none"
            @change="onFileChanged"
        >
    </div>
</template>

<script>
export default {
    props: ["value"],
    data: () => ({
        fileName: ""
    }),
    watch: {
        value(newVal) {
            if (newVal instanceof File) {
                this.fileName = newVal.name
            } else {
                this.fileName = null
                this.$refs.fileUpload.value = null
            }
        }
    },
    methods: {
        onFileChanged(e) {
            const file = e.target.files && e.target.files[0]

            if (file !== undefined) {
                this.fileName = file.name
            } else {
                this.fileName = ""
            }

            this.$emit("input", file)
        }
    }
}
</script>

<style>
</style>
