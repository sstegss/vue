<template>
    <form @submit.prevent="createPost">
        <h3>создание поста</h3>
        <my-input v-focus v-model.trim="post.title" placeholder="Название" />
        <my-input v-model.trim="post.body" placeholder="Описание" />
        <my-button  type="submit"
            style="align-self: flex-end; margin-top: 15px">Отправить</my-button>
    </form>
</template>
<script lang="ts">
interface Post {
    id?: number,
    title: string
    body: string,
}
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            } as Post
        }
    },
    methods: {
        createPost() {
            const newPost: Post = {
                ...this.post,
                id: Date.now()
            };
            this.$emit('create', newPost)
            this.post = {
                title: "",
                body: "",
            }
        },

    },
    emits:['create']
}
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>