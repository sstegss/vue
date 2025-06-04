<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script lang="ts">
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
    padding: 10px;
    border: 2px solid teal;
    background: none;
    color: teal;
    border-radius: 5px;
    cursor: pointer;
}
</style>