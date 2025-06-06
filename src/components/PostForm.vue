<script setup lang="ts">
import { ref } from 'vue';

interface Post {
    id?: number,
    title: string
    body: string,
}

const emit = defineEmits<{
    (e: 'create', post: Post): void;
}>();

const post = ref<Post>({
    title: '',
    body: '',
});
const createPost = () => {
    const newPost: Post = {
        ...post.value,
        id: Date.now()
    };
    emit('create', newPost);

    post.value = {
        title: '',
        body: '',
    }
}
</script>

<template>
    <form @submit.prevent="createPost">
        <h3>создание поста</h3>
        <my-input v-focus v-model.trim="post.title" placeholder="Название" />
        <my-input v-model.trim="post.body" placeholder="Описание" />
        <my-button type="submit" style="align-self: flex-end; margin-top: 15px">Отправить</my-button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>