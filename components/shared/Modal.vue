
<template>
    <div>
        <div @click="isActive = true">
            <slot name="actionButton">
                <button class="button is-primary">Open</button>
            </slot>
        </div>
    <!-- TOGGLE CLASS HERE -->
        <div class="modal" :class="{'is-active': isActive}">
            <div class="modal-background"></div>
            <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" @click="isActive = false" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <button @click="emitModalSubmit" class="button is-success">Save changes</button>
                <!-- CLOSE MODAL HERE -->
                <button class="button" @click="isActive = false">Cancel</button>
            </footer>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        emitModalSubmit() {
            console.log('Emit Save');
            this.$emit('modalSubmitted', { closeModal: this.closeModal, data: 'Just some Data' });
        },
        closeModal() {
            this.isActive = false;
        }
    },

}
</script>
