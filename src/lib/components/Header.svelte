<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import Icon from './Icon.svelte';

  let menuOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/metrics', label: 'Счётчики' },
    { href: '/payments', label: 'Платежи' },
    { href: '/rates', label: 'Тарифы' },
  ];

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class="header">
  <div class="header-inner">
    <a href={resolve('/')} class="header-logo" onclick={closeMenu}>COMMUNALITY</a>
    <button class="header-toggle" onclick={toggleMenu} aria-label="Меню">
      {#if menuOpen}
        <Icon name="x" size={20} />
      {:else}
        <Icon name="menu" size={20} />
      {/if}
    </button>
    <nav class="header-nav" class:open={menuOpen}>
      {#each navLinks as link (link.href)}
        <a
          href={resolve(link.href as Parameters<typeof resolve>[0])}
          class="header-link"
          class:active={page.url.pathname === link.href}
          onclick={closeMenu}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    font-family: var(--font-mono);
  }

  .header-inner {
    max-width: var(--receipt-max-width);
    margin: 0 auto;
    padding: var(--spacing-sm) var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .header-logo {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text);
    text-decoration: none;
  }

  .header-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid var(--color-border);
    padding: 4px;
    color: var(--color-text);
    line-height: 1;
  }

  .header-nav {
    display: none;
    width: 100%;
    flex-direction: column;
    gap: 0;
    margin-top: var(--spacing-sm);
    border-top: 1px dashed var(--color-border-dashed);
    padding-top: var(--spacing-sm);
  }

  .header-nav.open {
    display: flex;
  }

  .header-link {
    display: block;
    padding: var(--spacing-xs) 0;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-light);
    text-decoration: none;
    border-bottom: 1px dashed transparent;
  }

  .header-link:hover {
    color: var(--color-text);
    text-decoration: none;
  }

  .header-link.active {
    color: var(--color-text);
    font-weight: 700;
  }

  @media (min-width: 480px) {
    .header-toggle {
      display: none;
    }

    .header-nav {
      display: flex;
      width: auto;
      flex-direction: row;
      gap: var(--spacing-md);
      margin-top: 0;
      border-top: none;
      padding-top: 0;
    }

    .header-link {
      padding: 0;
      border-bottom: none;
    }
  }
</style>
