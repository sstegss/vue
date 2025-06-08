import axios from "axios";
import type { ActionContext } from "vuex/types/index.js";
interface Post {
  id: number;
  title: string;
  body: string;
}
interface PostState {
  posts: Post[];
  isPostsLoading: boolean;
  selectedSort: string;
  searchQuery: string;
  page: number;
  limit: number;
  totalPages: number;
  sortOptions: { value: string; name: string }[];
}
export const postModule = {
  state: () => ({
    posts: [] as Post[],
    isPostsLoading: false,
    selectedSort: "",
    searchQuery: "",
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По содержимому" },
    ],
  }),
  getters: {
    sortedPosts(state: PostState): Post[] {
      return [...state.posts].sort((post1, post2) =>
        (post1[state.selectedSort as keyof Post] as string)?.localeCompare(
          post2[state.selectedSort as keyof Post] as string
        )
      );
    },
    sortedAndSearchPosts(
      state: PostState,
      getters: { sortedPosts: Post[] }
    ): Post[] {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state: PostState, posts: Post[]) {
      state.posts = posts;
    },
    setLoading(state: PostState, bool: boolean) {
      state.isPostsLoading = bool;
    },
    setPage(state: PostState, page: number) {
      state.page = page;
    },
    setSelectedSort(state: PostState, selectedSort: string) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state: PostState, totalPages: number) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state: PostState, searchQuery: string) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }: ActionContext<PostState, any>): Promise<void> {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }: ActionContext<PostState, any>): Promise<void> {
      try {
        commit("setPage", state.page + 1);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
