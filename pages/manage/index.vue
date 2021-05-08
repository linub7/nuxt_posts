<template>
  <div>
    <Navbar />
    <div class="manage-page">
      <div class="columns mail-app">
        <aside class="column is-2 aside hero">
          <PostCreate />
        </aside>
        <div class="column is-4 messages hero is-fullheight" id="message-feed">
          <div v-if="posts && posts.length > 0" class="inbox-messages" id="inbox-messages">
            <!-- Card Start -->
            <div v-for="post in posts" :key="post._id" :class="{'is-active': activePost && post._id === activePost._id}" class="card" @click="activatePost(post)">
              <div class="card-content">
                <div class="msg-header">
                  <span class="msg-from"><small>From Filip Jerga</small></span>
                  <span class="msg-timestamp"></span>
                  <span class="msg-attachment"
                    ><i class="fa fa-paperclip"></i
                  ></span>
                </div>
                <div class="msg-subject">
                  <span class="msg-subject"
                    ><strong id="fake-subject-1">
                      {{ post.title }}
                    </strong></span
                  >
                </div>
                <div class="msg-snippet">
                  <p id="fake-snippet-1">{{ post.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="inbox-messages no-posts-title">
            There are no posts :(
          </div>
        </div>
        <div
          class="column is-6 message hero is-fullheight"
          id="message-pane"
        >
          <div v-if="activePost" class="box message-preview">
            <button @click="deletePost" class="button is-danger delete-button">Delete</button>
            <PostManage :postData="activePost" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostManage from '~/components/PostManage.vue';
import PostCreate from '~/components/PostCreate.vue';
import { mapState } from 'vuex';
import Navnar from "~/components/Navbar.vue";

export default {
  components: {
    Navnar,
    PostCreate,
    PostManage,
  },
  data() {
    return {
      activePost: null
    }
  },
  computed: {
      ...mapState({
          posts: (state) => state.post.items
      })
  },
  fetch({ store }) {
    if(store.getters['post/hasEmptyItems']) {
      return store.dispatch('post/fetchPosts');
    }
  },
  created() {
    this.setInitialActivePost();
  },
  methods: {
    activatePost(post) {
      this.activePost = post;
    },
    setInitialActivePost() {
      if (this.posts && this.posts.length > 0) {
        this.activePost = this.posts[0];
      } else {
        this.activePost = null;
      }
    },
    deletePost() {
      if(this.activePost) {
        return this.$store.dispatch('post/deletePost', this.activePost._id)
          .then(() => {
            this.setInitialActivePost();
          });
      }
    }
  },
};
</script>

<style scoped lang="scss">
.manage-page {
  padding: 30px;
}

.card {
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }

  &.is-active {
    background-color: #eeeeee;
  }
}

.delete-button {
    display: block;
    width: 100px;
    margin-left: auto;
    margin-right: 0;
}

.no-posts-title {
  font-size: 30px;
}

</style>
