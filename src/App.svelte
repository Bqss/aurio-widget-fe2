<script lang="ts">
  import Home from "./pages/home.svelte";
  import ConsultationDetail from "./pages/consultation-detail.svelte";
  import NotFound from "./pages/not-found.svelte";
  import { currentRoute, ROUTES, navigate } from "./store/route";
  // Subscribe to current route using runes mode

  const route = $derived(currentRoute);
  const consultations = [
    {
      id: "asdasd123123dsfasdasd123123dsfasdasd123123dsf",
      title: "patient_consultation_27-07-2025_01:59:40",
      created_at: "27 July 2025, 01:59 AM",
      status: "success",
      category: "patient_consultation",
    },
  ];

  const handleSelectConsultation = (consultation: any) => {
    navigate.toConsultationDetail(
      consultation?.id
    );
  };
</script>

{#if $route.name === ROUTES.HOME}
  <Home {consultations} {handleSelectConsultation} />
{:else if $route.name === ROUTES.CONSULTATION_DETAIL}
  <ConsultationDetail params={$route.params || {}} />
{:else}
  <NotFound />
{/if}

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
