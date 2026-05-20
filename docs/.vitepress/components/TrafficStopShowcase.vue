<template>
  <div class="traffic-showcase">
    <button type="button" class="showcase-button" @click="openModal">
      Showcase
    </button>

    <Teleport to="body">
      <div v-if="isOpen" class="showcase-modal" role="dialog" aria-modal="true" aria-label="Traffic stop positioning showcase">
        <button type="button" class="showcase-backdrop" aria-label="Close showcase" @click="closeModal"></button>

        <div class="showcase-frame">
          <div class="showcase-header">
            <div>
              <span>Traffic Stop Positioning</span>
              <h2>Angled Unit Placement</h2>
            </div>

            <button type="button" class="close-button" aria-label="Close showcase" @click="closeModal">
              &times;
            </button>
          </div>

          <div class="image-shell">
            <img
              src="https://i.imgur.com/0eHpcaf.png"
              alt="Diagram showing an angled police unit position during a traffic stop"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
  document.documentElement.classList.remove('showcase-locked');
};

const openModal = () => {
  isOpen.value = true;
  document.documentElement.classList.add('showcase-locked');
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeModal();
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown);
}

onBeforeUnmount(() => {
  closeModal();
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.traffic-showcase {
  margin: 1.1rem 0 0;
}

.showcase-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.55rem;
  padding: 0.7rem 1rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-lighter) 55%, var(--vp-c-divider));
  border-radius: 8px;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  line-height: 1;
  box-shadow: 0 10px 24px rgba(31, 95, 143, 0.2);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.showcase-button:hover {
  border-color: var(--vp-c-brand-lighter);
  box-shadow: 0 14px 32px rgba(31, 95, 143, 0.28);
  transform: translateY(-2px);
}

.showcase-modal {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.showcase-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background:
    radial-gradient(circle at 50% 20%, rgba(37, 119, 179, 0.26), transparent 38%),
    rgba(3, 10, 18, 0.76);
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.showcase-frame {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
  width: min(1040px, 96vw);
  max-height: min(86vh, 820px);
  padding: 1rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-lighter) 42%, var(--vp-c-divider));
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-bg) 96%, transparent);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
  animation: modalIn 0.22s ease both;
}

.showcase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.showcase-header span {
  color: var(--vp-c-brand-lighter);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.showcase-header h2 {
  margin: 0.2rem 0 0;
  color: var(--vp-c-text);
  font-size: clamp(1.25rem, 3vw, 2rem);
  line-height: 1.1;
}

.close-button {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text);
  cursor: pointer;
  font-size: 1.55rem;
  line-height: 1;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.close-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-lighter);
  transform: rotate(4deg);
}

.image-shell {
  display: grid;
  place-items: center;
  overflow: auto;
  max-height: calc(86vh - 7rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #111827;
}

.image-shell img {
  display: block;
  width: min(100%, 980px);
  height: auto;
  max-height: calc(86vh - 8rem);
  object-fit: contain;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .showcase-modal {
    padding: 0.75rem;
  }

  .showcase-frame {
    width: 100%;
    padding: 0.8rem;
  }

  .showcase-header {
    align-items: flex-start;
  }
}
</style>
