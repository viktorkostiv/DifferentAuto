<script>
import PageLayout from './components/layout/PageLayout.vue';
import DashboardLayout from './components/layout/DashboardLayout.vue';

import BaseAlert from './components/UI/BaseAlert.vue';
export default {
  components: {
    PageLayout,
    DashboardLayout,
    BaseAlert,
  },
  methods: {
    getTemplate() {
      const currentURL = window.location.pathname;
      const pathSegments = currentURL.split('/');

      if (pathSegments[1] === 'admin') {
        return true;
      } else return false;
    }
  },
  watch: {
    $route(to, from) {
      this.getTemplate();
    },
  },
  created() {
    this.getTemplate()
  }
}
</script>

<template>
  <PageLayout v-if="!getTemplate()">
    <router-view></router-view>
  </PageLayout>
  <DashboardLayout v-else>
    <router-view></router-view>
  </DashboardLayout>
  <BaseAlert></BaseAlert>
</template>