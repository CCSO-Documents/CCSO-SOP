<template>
  <div class="pc-menu" :class="{ open: isOpen }">
    <button class="menu-button" type="button" aria-label="Open menu" @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <div class="menu-content" v-if="isOpen">
      <div class="menu-panel">
        <div class="menu-section">
          <h3>Theme</h3>
          <div class="theme-toggle">
            <button
              class="theme-button"
              :class="{ active: !isDark }"
              type="button"
              @click="toggleTheme(false)"
            >
              Light
            </button>
            <button
              class="theme-button"
              :class="{ active: isDark }"
              type="button"
              @click="toggleTheme(true)"
            >
              Dark
            </button>
          </div>
          <a class="signed-by-button" href="/signed-by" @click="toggleMenu">
            Signed By
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isOpen = ref(false);
const isDark = ref(false);
const appearanceKey = 'vitepress-theme-appearance';

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const toggleTheme = (dark) => {
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem(appearanceKey, dark ? 'dark' : 'light');
};

onMounted(() => {
  const storedTheme = localStorage.getItem(appearanceKey);
  if (!storedTheme) {
    localStorage.setItem(appearanceKey, 'dark');
    document.documentElement.classList.add('dark');
  }

  isDark.value = document.documentElement.classList.contains('dark');
});
</script>

<style scoped>
.pc-menu {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 9999;
}

.menu-button {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.menu-button:hover {
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.menu-content {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 260px;
  overflow: hidden;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--vp-c-brand) 8%, transparent), transparent 38%),
    var(--vp-c-bg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: menuIn 0.18s ease both;
}

.menu-panel {
  width: 100%;
}

.menu-section {
  margin-bottom: 1rem;
}

.menu-section:last-child {
  margin-bottom: 0;
}

h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text);
  font-size: 0.9rem;
  font-weight: 600;
}

.theme-toggle {
  display: flex;
  gap: 0.5rem;
}

.theme-button {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.theme-button.active {
  background: var(--vp-c-text);
  color: var(--vp-c-bg);
}

.signed-by-button {
  display: block;
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.75rem 0.9rem;
  border: 0;
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.signed-by-button:hover {
  background: var(--vp-c-brand-light);
  color: #ffffff;
  transform: translateY(-1px);
}

@keyframes menuIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .pc-menu {
    top: 0.75rem;
    left: 0.75rem;
  }

  .menu-button {
    padding: 0.4rem;
  }

  .menu-content {
    width: 280px;
    max-width: calc(100vw - 2rem);
  }
}
</style>
