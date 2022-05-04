<style lang="scss" scoped>
.mobile-navigation{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
    transition: all 0.3s ease-in-out;
    transform: translateY(100%);
    overflow-y: scroll;
}
.mobile-navigation.active{
    transform: translateY(0);
}
</style>
<template>
    <div class="mobile-navigation">
    </div>
</template>
<script>
export default {
    name: 'mobile-navigation',
}
</script>