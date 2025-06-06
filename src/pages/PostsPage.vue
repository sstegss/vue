<script setup lang="ts">
import PostForm from "../components/PostForm.vue";
import PostList from "../components/PostList.vue";
import { computed, onMounted, ref, type ComputedRef, } from "vue";
import { useStore } from "vuex/types/index.js";
interface Post {
    id?: number,
    title: string
    body: string,
}
interface SortOptions {
    value: string,
    name: string
}
interface PostState {
    posts: Post[],
    isPostsLoading: boolean,
    page: number,
    limit: number,
    totalPages: number,
    selectedSort: string,
    sortOptions: SortOptions[],
    searchQuery: string,
}
const store = useStore();
const dialogVisible = ref(false)



const posts = computed(() => store.state.post.posts);
const isPostsLoading = computed(() => store.state.post.isPostsLoading);
const page = computed(() => store.state.post.page);
const limit = computed(() => store.state.post.limit);
const totalPages = computed(() => store.state.post.totalPages);
const selectedSort = computed(() => store.state.post.selectedSort);
const sortOptions = computed(() => store.state.post.sortOptions);
const searchQuery = computed(() => store.state.post.searchQuery);
const sortedPosts = computed(() => store.getters['post/sortedPosts']);
const sortedAndSearchPosts = computed(() => store.getters['post/sortedAndSearchPosts']);

const setPage = (value:number) => store.commit('post/',value);
const setSearchQuery= (value:string) => store.commit('post/',value);
const setSelectedSort = (value:string) => store.commit('post/',value);
const loadMorePosts= () => store.dispatch('post/');
const fetchPosts= () => store.dispatch('post/');

const createPost = (post: Post) => {
    store.state.post.posts.push(post)
    dialogVisible.value = false
};

const removePost = (post: Post) => {
    store.state.post.posts = store.state.post.posts.filter((p: Post) => p.id !== post.id)
};

const showDialog = () => {
    dialogVisible.value = true
}

onMounted(()=>{
    fetchPosts()
})

</script>

<template>

    <div>
        <h1>Страница с постами</h1>
        <MyInput :model-value="searchQuery" @update:model-value="setSearchQuery" />
        <div class="app__btns">
            <MyButton @click="showDialog" >
                Создать пост
            </MyButton>
            <MySelect :model-value="selectedSort" :options="sortOptions" @update:model-value="setSelectedSort" />
        </div>

        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost" />
        </MyDialog>
        
        <PostList 
            v-if="!isPostsLoading" 
            :posts="sortedAndSearchPosts" 
            @remove="removePost" 
        />
        <div v-else>Идёт загрузка</div>
        <div v-intersection="loadMorePosts"  class="observer"></div>
    </div>
</template>

<style>
.app__btns {
    margin-block: 15px;
    display: flex;
    justify-content: space-between;
}

.observer {
    height: 30px;
}
</style>