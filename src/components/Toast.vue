<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({ message: String, type: String })
const colorNotif = ref('d-flex align-items-center bg-' + props.type);

onMounted(() => {
  const toast = new bootstrap.Toast(document.getElementById('bootstrapToast'), { autohide: true, delay: 3000 });
  const toastElement = document.getElementById('toastContent');
  toastElement.innerText = props.message;
  toastElement.className = `toast-body text-white bg-${props.type}`;
  toast.show();
});

</script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="bootstrapToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div :class="colorNotif">
        <button type="button" class="btn-close mx-2" data-bs-dismiss="toast" aria-label="Close"></button>
        <div class="toast-body" id="toastContent">Mensaje</div>
      </div>
    </div>
  </div>
</template>