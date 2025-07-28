<script>
  import BlankStateConsultation from "../components/atoms/blank-state-consultation.svelte";
  import Consultation from "../components/atoms/consultation.svelte";
  import MainLayout from "../components/layouts/main.svelte";

  const { consultations, handleSelectConsultation } = $props();
  // Home page content
</script>

<MainLayout>
  {#if consultations.length == 0}
    <BlankStateConsultation />
  {:else}
    <div class="">
      {#each consultations as consultation}
        <Consultation {consultation} {handleSelectConsultation}/>
      {/each}
    </div>
  {/if}
</MainLayout>
