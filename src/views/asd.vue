<template>
    <div>
        {{cats}}
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from "vue"
    import router from "@/router"

    export default defineComponent({
        name: "Weather",
        setup() {
            const { currentRoute } = router;
            const cats = ref([]);

            const fetchCats = async () => {
                cats.value = await fetch(
                    "http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=353cd9dd095796906a8c77aaab179f49&lang=ru"
                ).then((response) => response.json());
            };

            onMounted(fetchCats);

            return {
                cats
            };
        }
    })
</script>

<style scoped>

</style>