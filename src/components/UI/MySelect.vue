<template>
  <select :value="modelValue" @change="handlerChange">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import type { PropType } from 'vue';

interface SelectOption{
  value: string,
  name: string
}
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [] as SelectOption[]
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handlerChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      emit('update:modelValue', target.value)
    };
    return { handlerChange };
  }
}
</script>
