<script setup lang="ts">
import { useStore } from "vuex";
import PostForm from "../components/PostForm.vue";
import PostList from "../components/PostList.vue";
import { computed, onMounted, ref } from "vue";
import MyButton from "../components/UI/MyButton.vue";
import MyInput from "../components/UI/MyInput.vue";
import MyDialog from "../components/UI/MyDialog.vue";
interface Post {
    id?: number,
    title: string
    body: string,
}
const store = useStore();
const dialogVisible = ref(false)



const isPostsLoading = computed(() => store.state.post.isPostsLoading);
const selectedSort = computed(() => store.state.post.selectedSort);
const sortOptions = computed(() => store.state.post.sortOptions);
const searchQuery = computed({
    get: () => store.state.post.searchQuery,
    set: (value: string) => store.commit('post/setSearchQuery', value)
});
const sortedAndSearchPosts = computed(() => store.getters['post/sortedAndSearchPosts']);

const setSelectedSort = (value: string) => store.commit('post/setSelectedSort', value);
const loadMorePosts = () => store.dispatch('post/loadMorePosts');
const fetchPosts = () => store.dispatch('post/fetchPosts');

const createPost = (post: Post) => {
    store.commit('post/createPost', post)
    dialogVisible.value = false
};

const removePost = (post: Post) => {
    store.state.post.posts = store.state.post.posts.filter((p: Post) => p.id !== post.id)
};

const showDialog = () => {
    dialogVisible.value = true
}

onMounted(() => {
    fetchPosts()
})
</script>

<template>

    <div>
        <h1>Страница с постами</h1>
        <MyInput v-model="searchQuery"  />
        <div class="app__btns">
            <MyButton @click="showDialog">
                Создать пост
            </MyButton>
            <MySelect :model-value="selectedSort" :options="sortOptions" @update:model-value="setSelectedSort" />
        </div>

        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost" />
        </MyDialog>

        <PostList v-if="!isPostsLoading" :posts="sortedAndSearchPosts" @remove="removePost" />
        <div v-else>Идёт загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
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