<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    show: boolean
}>();

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>()

const isShow = ref(props.show);

const hideDialog = () => {
    emit('update:show', false);
}
watch(() => props.show, (newValue)=>{
    isShow.value = newValue
})



</script>

<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    padding: 30px;
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 100px;
    min-width: 350px;
}
</style>