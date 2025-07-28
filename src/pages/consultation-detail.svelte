<script lang="ts">
  import MainLayout from "./../components/layouts/main.svelte";
  const { params } = $props();
  const selectedConsultation = {
    id: "asdasd123123dsfasdasd123123dsfasdasd123123dsf",
    title: "patient_consultation_27-07-2025_01:59:40",
    created_at: "27 July 2025, 01:59 AM",
    status: "success",
    category: "patient_consultation",
  };
  
  let activeTab = $state("note");
  
  function setActiveTab(tab: string) {
    activeTab = tab;
  }
</script>

<MainLayout>
  <div class="detail-consultation__header">
    <h4 class="consultation__title">{selectedConsultation.title}</h4>
    <span class="consultation__date">{selectedConsultation.created_at}</span>
  </div>
  <div class="detail-consultation__content">
    <div class="detail-consultation__row">
      <h5>ID Sesi:</h5>
      <span class="detail-consultation__content__value">{selectedConsultation.id}</span>
    </div>
    <div class="detail-consultation__row">
      <h5>Category:</h5>
      <span class="detail-consultation__content__category">{selectedConsultation.category}</span>
    </div>
    <div class="detail-consultation__row">
      <h5>Status:</h5>
      <span class="detail-consultation__content__status">{selectedConsultation.status}</span>
    </div>
  </div>
  
  <div class="consultation-tabs">
    <div class="consultation-tabs__header">
      <button 
        class="consultation-tabs__tab {activeTab === 'note' ? 'active' : ''}"
        onclick={() => setActiveTab('note')}
      >
        Note
      </button>
      <button 
        class="consultation-tabs__tab {activeTab === 'transcript' ? 'active' : ''}"
        onclick={() => setActiveTab('transcript')}
      >
        Transcript
      </button>
    </div>
    
    <div class="consultation-tabs__content">
      {#if activeTab === 'note'}
        <div class="consultation-tabs__panel">
          <!-- Note content will go here -->
        </div>
      {:else if activeTab === 'transcript'}
        <div class="consultation-tabs__panel">
          <!-- Transcript content will go here -->
        </div>
      {/if}
    </div>
  </div>
</MainLayout>
