<template>
    <div>
        <commentbox :id="$route.params.id"></commentbox>
    </div>
</template>

<script>
import commentbox from "../subcomponents/comment.vue";

export default {
    data() {
        return {

        }
    },
    components: {
         commentbox
    }
}
</script>
