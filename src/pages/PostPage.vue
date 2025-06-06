<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import PostItem from '../components/PostItem.vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

interface Post {
    title: string
    body: string,
}

const post = ref<Post | null>(null)
const route = useRoute()

const fetchPost = async (id: Number) => {
    try {
        const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post.value = response.data
    } 
    catch(e:unknown){
        if (e instanceof Error){
            console.error('Ошибка загрузки поста', e.message)
        } else{
            console.error('Неизвестная ошибка', e)
        }
    }
}

onMounted(()=>{
    const id = Number(route.params.id)
    if (id) fetchPost(id)
})

watch(
    () => route.params.id,
    (newId) => {
        if (newId) fetchPost(Number(newId))
    },
    { immediate: true }
)


</script>

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