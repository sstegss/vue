<template>

    <div>
        <h1>Страница с постами</h1>
        <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" />
        <div class="app__btns">

            <my-button @click="showDialog" style="">
                Создать пост
            </my-button>
            <my-select :model-value="selectedSort" :options="sortOptions" @update:model-value="setSelectedSort" />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list v-if="!isPostsLoading" :posts="sortedAndSearchPosts" @remove="removePost" />
        <div v-else>Идёт загрузка</div>
        <div v-intersection="loadMorePosts" ref="observer" class="observer"></div>
    </div>
</template>


<script lang="ts">
import { mapActions, mapGetters, mapMutations, mapState, type MapStateReturn } from "vuex";
import PostForm from "../components/PostForm.vue";
import PostList from "../components/PostList.vue";
import type { ComputedRef, } from "vue";
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
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,

        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post: Post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post: Post) {
            this.posts = this.posts.filter((p: Post) => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },


    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState("post", {
            posts: (state: PostState) => state.posts,
            isPostsLoading: (state: PostState) => state.isPostsLoading,
            page: (state: PostState) => state.page,
            limit: (state: PostState) => state.limit,
            totalPages: (state: PostState) => state.totalPages,
            selectedSort: (state: PostState) => state.selectedSort,
            sortOptions: (state: PostState) => state.sortOptions,
            searchQuery: (state: PostState) => state.searchQuery,
        }) as MapStateReturn & {
            posts: ComputedRef<Post[]>
            isPostsLoading: ComputedRef<boolean>,
            page: ComputedRef<number>,
            limit: ComputedRef<number>,
            totalPages: ComputedRef<number>,
            selectedSort: ComputedRef<string>,
            sortOptions: ComputedRef<SortOptions[]>,
            searchQuery: ComputedRef<string>,
        },
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchPosts: 'post/sortedAndSearchPosts'
        }),
    },
}

</script>


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