<script>
import Navbar from './components/UI/Navbar.vue';


export default {
    components: {
        Navbar
    }
}
</script>
<template>
    <Navbar />
    <div class="app">
        <router-view></router-view>
    </div>
</template>
<style lang="css">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>