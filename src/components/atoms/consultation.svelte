<script>
  import successIcon from "../../assets/icons/success.svg";
  import failedIcon from "../../assets/icons/failed.svg";
  import processingIcon from "../../assets/icons/processing.svg";
  const { consultation, handleSelectConsultation } = $props();

  const getImage = (status) => {
    switch (status) {
      case "success":
        return successIcon;
      case "failed":
        return failedIcon;
      case "processing":
        return processingIcon;
      default:
        break;
    }
  };
</script>

<div class="consultation">
  <div class="consultation__content">
    <h4 class="consultation__title" onclick={() => handleSelectConsultation(consultation)}>
      {consultation.title}
    </h4>
    <span class="consultation__date">{consultation.created_at}</span>
  </div>
  <span>
    <img
      src={getImage(consultation.status)}
      alt={consultation.status}
      class="consultation__status"
    />
  </span>
</div>
