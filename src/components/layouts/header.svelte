<script>
  import menuIcon from "../../assets/icons/menu.svg";
  import closeIcon from "../../assets/icons/close.svg";
  import logo from "../../assets/logo/serenic-logo.svg";
  import MenuDrawer from "../drawers/menu.svelte";

  let isOpenMenuDrawer = $state(false);

  const handleOpenMenuDrawer = () => {
    isOpenMenuDrawer = true;
  };
  const handleCloseMenuDrawer = () => {
    isOpenMenuDrawer= false;
  }
</script>

<header class="widget-header">
  <button onclick={handleOpenMenuDrawer} class="button clean-button">
    <img src={menuIcon}  alt="Menu" />
  </button>
  <img src={logo} alt="Logo" />
  <button class="button clean-button">
    <img src={closeIcon} alt="Menu" />
  </button>
</header>

{#if isOpenMenuDrawer}
  <MenuDrawer onClose={handleCloseMenuDrawer}/>
{/if}

<style>
</style>
