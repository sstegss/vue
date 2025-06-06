<script setup lang="ts">
interface Post {
    id?: number,
    title: string
    body: string,
}

defineProps<{
    post: Post
}>();

</script>

<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div><b>Название:</b> {{ post.title }} </div>
            <div><b>Описание:</b> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <MyButton @click="$router.push(`/posts/${post.id}`)">Открыть</MyButton>
            <MyButton @click="$emit('remove', post)" style="margin-left: 10px;">Удалить</MyButton>
        </div>
    </div>
</template>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns{
    display: flex;
}
</style>