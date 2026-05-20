<template>
  <div class="floating-nav" :class="{ hide: isSidebarOpen }">
    <img v-if="logoSrc" class="logo" :src="logoSrc" :alt="logoAlt" />
    <span v-else class="badge" aria-hidden="true">CCSO</span>
    <span class="title title-full">{{ topbarTitle }}</span>
    <span class="title title-short">{{ topbarShortTitle }}</span>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useData } from 'vitepress';

const isSidebarOpen = ref(false);
const { theme } = useData();
let observer;

const normalizeLogo = (logo) => {
  if (!logo) return '';
  if (typeof logo === 'string') return logo;
  return logo.src || logo.light || logo.dark || '';
};

const logoConfig = computed(() => theme.value.topbar?.logo || theme.value.logo);
const logoSrc = computed(() => normalizeLogo(logoConfig.value));
const logoAlt = computed(() => theme.value.topbar?.logoAlt || logoConfig.value?.alt || 'Logo');
const topbarTitle = computed(() => theme.value.topbar?.title || theme.value.siteTitle || 'CCSO SOP');
const topbarShortTitle = computed(() => theme.value.topbar?.shortTitle || theme.value.siteTitle || 'CCSO');

const checkSidebar = () => {
  const sidebar = document.querySelector('.VPSidebar');
  isSidebarOpen.value = sidebar?.classList.contains('open') || false;
};

onMounted(() => {
  checkSidebar();
  observer = new MutationObserver(checkSidebar);
  const target = document.querySelector('.VPSidebar');
  if (target) {
    observer.observe(target, { attributes: true });
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.floating-nav {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: calc(100% - 2rem);
  width: fit-content;
  padding: 0.75rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  background-clip: padding-box;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.floating-nav.hide {
  opacity: 0;
  visibility: hidden;
}

:global(.dark) .floating-nav {
  background: rgba(26, 26, 26, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.badge {
  display: grid;
  place-items: center;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  flex: 0 0 auto;
}

.logo {
  display: block;
  height: 52px;
  width: 52px;
  padding: 4px;
  border-radius: 50%;
  object-fit: contain;
  background: #ffffff;
  box-sizing: border-box;
  flex: 0 0 auto;
}

.title {
  min-width: 0;
  overflow: hidden;
  color: var(--vp-c-text);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-short {
  display: none;
}

@media (max-width: 768px) {
  .floating-nav {
    top: 0.75rem;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
  }

  .badge {
    height: 36px;
    width: 36px;
    font-size: 0.68rem;
  }

  .logo {
    height: 38px;
    width: 38px;
    padding: 3px;
  }

  .title {
    font-size: 1rem;
  }

  .title-full {
    display: none;
  }

  .title-short {
    display: inline;
  }
}
</style>
