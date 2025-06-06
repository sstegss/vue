<script setup lang="ts">
interface SelectOption {
  value: string,
  name: string
}

const { modelValue = '', options = [] } = defineProps<{
  modelValue: string,
  options: SelectOption[],
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handlerChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value
)};
</script>

<template>
  <select :value="modelValue" @change="handlerChange">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
