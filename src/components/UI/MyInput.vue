<script setup lang="ts">
defineProps<{
    modelValue: string | number;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>();

const updateInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value)
}
</script>

<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>



<style scoped>
.input {
    width: 100%;
    border: 2px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>