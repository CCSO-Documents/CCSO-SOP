<template>
  <div v-if="!isSignedByRoute && headings.length" class="category-sidebar">
    <aside class="category-panel" aria-label="Page categories">
      <div class="category-header">
        <h2>Categories</h2>
        <span class="category-count">{{ headings.length }}</span>
      </div>

      <div class="category-scroll-frame">
        <div class="category-progress">
          <span :style="{ height: `${scrollProgress}%` }"></span>
        </div>

        <nav class="category-links">
          <button
          v-for="(heading, index) in headings"
          :key="heading.id"
          type="button"
          class="category-link"
          :class="[`level-${heading.level}`, { active: activeId === heading.id }]"
          :data-heading-id="heading.id"
          :style="{ '--item-index': index }"
          @click="scrollToHeading(heading.id)"
        >
            {{ heading.text }}
          </button>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();
const headings = ref([]);
const activeId = ref('');
const scrollProgress = ref(0);
let observer;

const isSignedByRoute = computed(() => /\/signed-by(?:\.html)?\/?$/.test(route.path));

const cleanHeadingText = (node) => {
  return (node.textContent || '')
    .replace(/\u200B/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const scrollActiveLinkIntoView = (id) => {
  const link = document.querySelector(`.category-link[data-heading-id="${CSS.escape(id)}"]`);
  link?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};

const updateActiveHeading = () => {
  const offset = window.scrollY + 150;
  let current = headings.value[0]?.id || '';

  for (const heading of headings.value) {
    const element = document.getElementById(heading.id);
    if (element && element.offsetTop <= offset) {
      current = heading.id;
    }
  }

  if (activeId.value !== current) {
    activeId.value = current;
    scrollActiveLinkIntoView(current);
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = scrollable > 0
    ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))
    : 0;
};

const collectHeadings = async () => {
  await nextTick();

  const nodes = Array.from(document.querySelectorAll('.vp-doc h2[id], .vp-doc h3[id]'));
  headings.value = nodes
    .map((node) => ({
      id: node.id,
      level: node.tagName.toLowerCase(),
      text: cleanHeadingText(node)
    }))
    .filter((heading) => heading.id && heading.text);

  updateActiveHeading();
};

const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
};

onMounted(() => {
  collectHeadings();

  const target = document.querySelector('.vp-doc');
  if (target) {
    observer = new MutationObserver(collectHeadings);
    observer.observe(target, { childList: true, subtree: true });
  }

  window.addEventListener('scroll', updateActiveHeading, { passive: true });
  window.addEventListener('resize', updateActiveHeading);
});

onUnmounted(() => {
  observer?.disconnect();
  window.removeEventListener('scroll', updateActiveHeading);
  window.removeEventListener('resize', updateActiveHeading);
});
</script>

<style scoped>
.category-sidebar {
  position: fixed;
  top: 6.5rem;
  right: 1rem;
  z-index: 9998;
  animation: sidebarIn 0.35s ease both;
}

.category-panel {
  width: 286px;
  max-height: calc(100vh - 8rem);
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.category-header h2 {
  margin: 0;
  color: var(--vp-c-text);
  font-size: 1rem;
}

.category-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text);
  font-size: 0.78rem;
  font-weight: 700;
}

.category-scroll-frame {
  position: relative;
}

.category-scroll-frame::before,
.category-scroll-frame::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  height: 1.6rem;
  pointer-events: none;
}

.category-scroll-frame::before {
  top: 0;
  background: linear-gradient(var(--vp-c-bg), transparent);
}

.category-scroll-frame::after {
  bottom: 0;
  background: linear-gradient(transparent, var(--vp-c-bg));
}

.category-progress {
  position: absolute;
  top: 0.9rem;
  bottom: 0.9rem;
  left: 0.75rem;
  z-index: 3;
  width: 3px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-c-bg-mute);
}

.category-progress span {
  display: block;
  width: 100%;
  min-height: 0.35rem;
  border-radius: inherit;
  background: linear-gradient(180deg, var(--vp-c-brand-lighter), var(--vp-c-brand));
  transition: height 0.16s ease;
}

.category-links {
  display: grid;
  gap: 0.25rem;
  max-height: calc(100vh - 13rem);
  overflow-y: auto;
  padding: 0.85rem 0.75rem 0.85rem 1.1rem;
  scroll-behavior: smooth;
}

.category-link {
  position: relative;
  width: 100%;
  padding: 0.58rem 0.7rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text);
  cursor: pointer;
  font: inherit;
  font-size: 0.88rem;
  line-height: 1.25;
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  animation: categoryItemIn 0.28s ease both;
  animation-delay: calc(var(--item-index) * 18ms);
}

.category-link::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -0.45rem;
  width: 0.45rem;
  height: 2px;
  border-radius: 999px;
  background: var(--vp-c-brand);
  opacity: 0;
  transform: translateY(-50%) scaleX(0);
  transform-origin: right;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.category-link:hover,
.category-link.active {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  transform: translateX(-2px);
}

.category-link.active::before {
  opacity: 1;
  transform: translateY(-50%) scaleX(1);
}

.category-link.level-h3 {
  padding-left: 1.35rem;
  color: var(--vp-c-text-light);
  font-size: 0.82rem;
}

.category-link.level-h3::before {
  left: 0.25rem;
  width: 0.3rem;
}

@keyframes sidebarIn {
  from {
    opacity: 0;
    transform: translateX(18px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes categoryItemIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1180px) {
  .category-sidebar {
    display: none;
  }
}
</style>
