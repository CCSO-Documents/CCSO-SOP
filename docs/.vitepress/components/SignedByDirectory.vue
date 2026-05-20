<template>
  <section class="signed-directory">
    <div class="directory-hero">
      <h1>Signed By</h1>
      <p>
        This document was signed and approved by the members listed below.
      </p>
    </div>

    <dl class="approval-meta">
      <div>
        <dt>Last Revised</dt>
        <dd>{{ lastRevised || 'Not listed' }}</dd>
      </div>
    </dl>

    <div v-if="signers.length" class="signer-grid">
      <article v-for="person in signers" :key="`${getUsername(person)}-${getRank(person)}`" class="signer-card">
        <div class="avatar-shell">
          <img
            v-if="getIconUrl(person)"
            class="signer-avatar"
            :src="getIconUrl(person)"
            :alt="`${getUsername(person)} icon`"
          />
          <span v-else class="signer-avatar signer-fallback" aria-hidden="true">
            {{ getInitials(person) }}
          </span>
        </div>

        <div class="signer-info">
          <h2>{{ getUsername(person) }}</h2>
          <p>{{ getRank(person) || 'Rank Not Listed' }}</p>
        </div>

        <img
          v-if="logoUrl"
          class="card-logo"
          :src="logoUrl"
          alt=""
          aria-hidden="true"
        />
      </article>
    </div>

    <p v-else class="empty-state">No signers are configured yet.</p>

    <a class="return-link" href="/">Return to SOP</a>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

const { theme } = useData();

const sopConfig = computed(() => theme.value.sop || {});
const lastRevised = computed(() => sopConfig.value.lastRevised);
const signers = computed(() => sopConfig.value.signedBy || []);
const logoUrl = computed(() => {
  const logo = theme.value.logo;
  return theme.value.topbar?.logo || (typeof logo === 'string' ? logo : logo?.src) || '';
});

const getIconUrl = (person) => person.iconUrl || person.avatarUrl || person.avatar || '';
const getUsername = (person) => person.username || person.name || 'Unknown User';
const getRank = (person) => person.rank || person.title || '';
const getInitials = (person) => {
  return getUsername(person)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U';
};
</script>

<style scoped>
.signed-directory {
  display: grid;
  gap: 1.5rem;
}

.directory-hero {
  position: relative;
  overflow: hidden;
  padding: 1.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--vp-c-brand-lighter) 14%, transparent), transparent 34%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg));
}

.directory-hero::after {
  content: "";
  position: absolute;
  inset: auto 1.5rem 0;
  height: 3px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-lighter), transparent);
}

.directory-hero h1 {
  margin: 0;
  color: var(--vp-c-text);
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1;
}

.directory-hero p:last-child {
  max-width: 52rem;
  margin: 0.9rem 0 0;
  color: var(--vp-c-text-light);
}

.approval-meta {
  display: grid;
  grid-template-columns: minmax(0, 260px);
  gap: 0.9rem;
  margin: 0;
}

.approval-meta div {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.approval-meta dt {
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-light);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.approval-meta dd {
  margin: 0;
  color: var(--vp-c-text);
  font-weight: 700;
}

.signer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin: -0.4rem;
  padding: 0.4rem;
}

.signer-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  isolation: isolate;
  min-height: 172px;
  padding: 1.2rem 1.2rem 1.95rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand) 30%, var(--vp-c-divider));
  border-radius: 12px;
  background:
    radial-gradient(circle at 12% 10%, color-mix(in srgb, var(--vp-c-brand-lighter) 16%, transparent), transparent 34%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.14);
  transform: translateY(0) scale(1);
  transition: border-color 0.24s ease, box-shadow 0.24s ease, background-color 0.24s ease, transform 0.24s ease;
}

.signer-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-lighter) 65%, var(--vp-c-divider));
  box-shadow: 0 20px 42px rgba(31, 95, 143, 0.22);
  transform: translateY(-4px) scale(1.01);
}

.avatar-shell {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background:
    linear-gradient(var(--vp-c-bg), var(--vp-c-bg)) padding-box,
    linear-gradient(135deg, var(--vp-c-brand-lighter), var(--vp-c-brand-dark)) border-box;
  border: 3px solid transparent;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--vp-c-brand) 12%, transparent);
}

.signer-avatar {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  object-fit: cover;
  background: #ffffff;
}

.signer-fallback {
  display: grid;
  place-items: center;
  background: var(--vp-c-brand);
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 900;
}

.signer-info {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.signer-info h2 {
  margin: 0;
  color: var(--vp-c-text);
  font-size: 1.35rem;
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.signer-info p {
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-light);
  font-weight: 700;
  overflow-wrap: anywhere;
}

.card-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  width: min(46%, 180px);
  max-width: calc(100% - 2.5rem);
  max-height: calc(100% - 2rem);
  height: auto;
  object-fit: contain;
  opacity: 0.11;
  transform: translate(-50%, -50%) scale(1);
  filter: drop-shadow(0 12px 20px rgba(31, 95, 143, 0.16));
  mask-image: radial-gradient(circle, #000 38%, rgba(0, 0, 0, 0.7) 58%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle, #000 38%, rgba(0, 0, 0, 0.7) 58%, transparent 80%);
  pointer-events: none;
  transition: opacity 0.24s ease, transform 0.24s ease, filter 0.24s ease;
}

.signer-card:hover .card-logo {
  opacity: 0.17;
  transform: translate(-50%, -50%) scale(1.06);
  filter: drop-shadow(0 16px 26px rgba(31, 95, 143, 0.24));
}

.empty-state {
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-light);
}

.return-link {
  width: fit-content;
  padding: 0.7rem 0.95rem;
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: #ffffff !important;
  font-weight: 800;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.return-link:hover {
  background: var(--vp-c-brand-light);
  transform: translateY(-1px);
}

@media (max-width: 700px) {
  .approval-meta,
  .signer-grid {
    grid-template-columns: 1fr;
  }

  .directory-hero {
    padding: 1.4rem;
  }

  .signer-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .avatar-shell {
    margin: 0 auto;
  }

  .card-logo {
    width: min(58%, 180px);
  }
}
</style>
