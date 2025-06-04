<template>
    <div>
        <h1>Это страница поста с ID = {{ $route.params.id }}</h1>
        <div v-if="post">
            <div style="font-weight: 700;">{{ post.title }}</div>
            <div>{{ post.body }}</div>
        </div>
        <div v-else>загрузка...</div>
    </div>
</template>

<script lang="ts">
import PostItem from '../components/PostItem.vue'
import axios from 'axios';
export default {
    components: { PostItem },
    data() {
        return {
            post: {
                title: '',
                body: '',
            },
            id: -1,
        }
    },
    methods: {
        async fetchPost(id: Number) {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                this.post = response.data;

            }
            catch (e: unknown) {
                if (e instanceof Error) console.error('Ошибка загрузки поста', e.message)
                else console.error('Неизвестная ошибка', e)

            }
        },
    },
    mounted() {
        this.id = Number(this.$route.params.id)
        this.fetchPost(this.id)
    },
    watch: {
        '$route.params.id': {
            handler(newId) {
                this.fetchPost(newId);
            },
            immediate: true
        }
    }
}
</script>
