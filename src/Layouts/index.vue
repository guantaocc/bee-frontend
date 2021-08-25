<template>
  <div :class="classObj" class="app-wrapper">
    <!-- side-bar -->
    <div class="sidebar-wrapper"></div>
    <div class="main-wrapper">
      <div class="fix-header">
        <!-- nav -->
        <NavBar />
        <!-- tag -->
      </div>
      <!-- main -->
    </div>
  </div>
</template>

<script>
import NavBar from '@/Layouts/NavBar'
export default {
  name: 'Layout',
  components: {
    NavBar
  },
  data() {
    return {
      classObj: {
        hideSidebar: false,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  .sidebar-wrapper {
    position: fixed;
    width: 54px;
    float: left;
    height: 100%;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: #304156;
  }
  .main-wrapper {
    min-height: 100%;
    width: calc(100% - 54px);
    position: relative;
    margin-left: 54px;
    transition: margin-left 0.28s;
    float: left;
  }
}
</style>
