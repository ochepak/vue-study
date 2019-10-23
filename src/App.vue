<template>
    <div id="app" ref="app">
        <Loader v-if="this.$store.state.showLoader"></Loader>
        <router-view></router-view>
    </div>
</template>

<script>
    import Loader from "@/shared/Loader";
    export default {
        name: 'app',
        components: {Loader}
    }
</script>

<style lang="scss">
</style>
