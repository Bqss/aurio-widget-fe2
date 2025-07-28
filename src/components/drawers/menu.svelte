<script>
  import { fade, fly } from "svelte/transition";
  import closeIcon from "../../assets/icons/close.svg";
  import logo from "../../assets/logo/serenic-logo.svg";
  import homeIcon from "../../assets/icons/home.svg";
  import trashIcon from "../../assets/icons/trash.svg";
  const { onClose } = $props();
  import {ROUTES, navigate}  from "../../store/route"
  import { clickOutside } from "../../libs/actions/clickoutside";
</script>

<div
  class="menu-container"
  use:clickOutside={onClose}
  transition:fade={{ duration: 300 }}
>
  <div class="menu-header">
    <img src={logo} alt="Logo" />
    <button class="button clean-button" onclick={onClose}>
      <img src={closeIcon} alt="Menu" />
    </button>
  </div>
  <div class="menu-navigations">
    <button class="menu-navigation" onclick={() => navigate.toHome()}>
      <img src={homeIcon} alt="home">
      <span>Home</span>
    </button>
    <button class="menu-navigation">
      <img src={trashIcon} alt="home">
      <span>Clear Session</span>
    </button>
  </div>
</div>
