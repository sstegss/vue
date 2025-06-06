<script setup lang="ts">
    // export default {
    //     name : 'my-input',
    //     props:{
    //         modelValue:[String,Number]
    //     },
    //     methods:{
    //         updateInput(event: Event){
    //             const target = event.target as HTMLInputElement
    //             this.$emit('update:modelValue', target.value)
    //         }
    //     }
    // }
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