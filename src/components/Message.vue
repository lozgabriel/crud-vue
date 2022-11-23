<template>
    <div class="alert alert-success" role="alert">
        {{ msg }}
    </div>
</template>

<script>
export default {
    name: "Message-App",
    props: {
        msg: String 
    }
}
</script>

<style lang="less" scoped>

</style>