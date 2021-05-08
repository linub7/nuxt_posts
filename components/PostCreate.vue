<template>
    <Modal @modalSubmitted="createPost">
        <template #actionButton>
            <a class="button is-danger is-block is-bold">
                <span class="compose">Create</span>
            </a>
        </template>
        <form class="post-form">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input v-model="formData.title" 
                            class="input" 
                            type="text" 
                            placeholder="Awesome Title">
                </div>
            </div>
            <div class="field">
                <label class="label">Subtitle</label>
                <div class="control">
                    <input v-model="formData.subtitle"
                            class="input" 
                            type="text" 
                            placeholder="Awesome subtitle">
                </div>
            </div>
            <div class="field">
                <label class="label">Content</label>
                <div class="control">
                    <textarea v-model="formData.content" 
                                class="textarea" 
                                placeholder="Awesome Content"></textarea>
                </div>
            </div>
            <div class="markdown">
                <label class="label">Content Preview</label>
                <div v-html="compiledMarkdown"></div>
            </div>
        </form>
    </Modal>
</template>

<script>
import Modal from '~/components/shared/Modal.vue';
export default {
    components: {
        Modal
    },
    data() {
        return {
            formData: {
                title: '',
                subtitle: '',
                content: ''
            }
        }
    },
    computed: {
        compiledMarkdown() {
            if (process.client) {
                return marked(this.formData.content, {
                    sanitize: true
                });
            }
            return '';
        }
    },
    methods: {
        createPost({ closeModal, data }) {
            // DISPATCH ACTION WITH OUR FORMDATA
            console.log(data);
            this.$store.dispatch('post/createPost', {...this.formData});
            closeModal();
            this.resetForm();
        },
        resetForm() {
            this.formData.title = '';
            this.formData.subtitle = '';
            this.formData.content = '';
        },
    },
}
</script>


<style scoped>

</style>