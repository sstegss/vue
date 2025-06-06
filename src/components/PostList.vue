<script setup lang="ts" >
import PostItem from './PostItem.vue';
interface Post {
    id?: number,
    title: string
    body: string,
}
const props = defineProps<{
    posts: Post[]
}>()
</script>

<template>
    <div v-if="posts.length > 0" class="posts">
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <PostItem @remove="$emit('remove', post)" :key="post.id" :post="post" v-for="post in props.posts"></PostItem>
        </transition-group>


    </div>
    <h2 v-else="" style="color: red">
        Список постов пустой
    </h2>

</template>

<style scoped>
.post-list-item{
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active{
    transition: all 0.3s ease;
}

.post-list-leave-to{
    opacity: 0;
    transform: translateX(30px);
}
.post-list-enter-from{
    opacity: 0;
    transform: translateY(30px);
}
.post-list-move{
    transition: transform 0.3s ease;
}

</style>