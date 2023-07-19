<template>
  <div class="default-layout">
    <TheHeader />
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'DefaultLayout',
  components: { TheHeader }
}
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;

  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 1279px;
    padding: 40px;
    background-color: $white;
  }
}

@media screen and (max-width: 763px) {
  .default-layout {

    .page {
      padding: 40px 16px;
    }
  }
}
</style>