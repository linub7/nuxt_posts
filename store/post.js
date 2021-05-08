import  INITIAL_DATA  from './initial_data.json';
import Vue from 'vue';

export function fetchPostsApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.posts);
    }, 0);
  });
}

export const state = () => {
  return {
    items: [],
    archivedItems: [],
    item: {}
  };
};


// GETTERS ARE LIKE TO COMPUTED PROPERTIES BUT FOR VUEX 
export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0;
  }
};

export const actions = {
  getArchivedPosts({ commit }) {
    const archivedPosts = localStorage.getItem('archived_posts');
    if(archivedPosts) {
      commit('setArchivedPosts', JSON.parse(archivedPosts));
      return archivedPosts;
    } else {
      localStorage.setItem('archived_posts', JSON.stringify([]));
      return [];
    }
  },
  togglePost({ state, commit, dispatch }, postId) {
    if(state.archivedItems.includes(postId)) {
      // remove postId
      const index = state.archivedItems.findIndex((pId) => pId === postId);
      commit('removeArchivedPost', index);
      dispatch('persistArchivedPosts');
      return postId;
    } else {
      // add post id
      commit('addArchivedPost', postId);
      dispatch('persistArchivedPosts');
      return postId;
    }
  },
  persistArchivedPosts({state}) {
    localStorage.setItem('archived_posts', JSON.stringify(state.archivedItems));
  },
  fetchPosts({
    commit
  }) {
    return this.$axios.$get('/api/posts').then(posts => {
      commit("setPosts", posts);
      return posts;
    });
  },
  fetchPostById({ commit }, postId) {
    return this.$axios.$get('/api/posts').then(posts => {
      const selectedPost = posts.find((p) => p._id === postId);
      commit("setPost", selectedPost);
      return selectedPost;
    });
  },
  createPost({ commit }, postData) {
    postData._id = Math.random().toString(36).substr(2, 7);
    postData.createAt = (new Date()).getTime();

    return this.$axios.$post('/api/posts', postData).then((res) => {
      console.log(res);
      commit('addPost', postData);
      return postData;
    });
  },
  updatePost({ commit, state }, postData) {
    const index = state.items.findIndex((post) => {
      return post._id === postData._id;
    })

    if(index !== -1) {
      return this.$axios.$patch(`/api/posts/${postData._id}`, postData)
        .then((res) => {
          console.log(res);
          commit('replacePost', {post: postData, index});
          return postData;
        });
    }
  },
  deletePost({ commit, state}, postId) {
    const index = state.items.findIndex((post) => {
      return post._id === postId;
    })

    if(index != -1) {
      return this.$axios.$delete(`/api/posts/${postId}`)
        .then((res) => {
          commit('deletePost', index);
          return postId;
        })
    }
  },
};

// MUTATIONS ARE SIMPLE FUNCTIONS THAT HAVE ACCESS TO A STATE
// MUTATIONS ARE USED TO ASSIGN VALUES TO A STATE
export const mutations = {
  setPosts(state, posts) {
    state.items = posts;
  },
  setPost(state, post) {
    state.item = post;
  },
  addPost(state, post) {
    state.items.push(post);
  },
  replacePost(state, { post, index }) {
    Vue.set(state.items, index, post);
  },
  deletePost(state, postIndex) {
    state.items.splice(postIndex, 1);
  },
  setArchivedPosts(state, archivedPosts) {
    state.archivedItems = archivedPosts;
  },
  addArchivedPost(state, postId) {
    state.archivedItems.push(postId);
  },
  removeArchivedPost(state, index) {
    state.archivedItems.splice(index, 1);
  }
};
