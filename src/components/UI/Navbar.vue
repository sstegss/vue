<template>
    <nav>
        <h1 @click="$router.push('/')" style="cursor: pointer;">Company</h1>
        <div class="nav__btns">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 15px;">О сайте</my-button>
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