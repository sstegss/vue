<script setup lang="ts">
import MyButton from './MyButton.vue';


</script>


<template>
    <nav>
        <h1 @click="$router.push('/')" style="cursor:pointer">Company</h1>
        <div class="nav__btns">
            <MyButton @click="$router.push('/posts')">Посты</MyButton>
            <MyButton @click="$router.push('/about')" style="margin-left: 15px;">О сайте</MyButton>
        </div>
    </nav>
</template>

<style lang="css" scoped>
nav {
    padding-inline: 20px;
    height: 60px;
    background-color: lightgrey;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-self: center;
    align-items: center;
}

.nav__btns {
    margin-left: auto;
    align-content: center;
}
</style>