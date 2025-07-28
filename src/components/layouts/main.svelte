<script>
  import Header from "./header.svelte";
  import RecordingWidget from "../layouts/recording-widget.svelte";
</script>

<div class="widget-container">
  <Header />
  <div class="widget-content">
    <slot></slot>
  </div>
  <RecordingWidget/>
</div>