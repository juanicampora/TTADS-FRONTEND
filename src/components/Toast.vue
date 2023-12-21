<script setup>
const props = defineProps({message:String,type:String})
const toast = new bootstrap.Toast(document.getElementById('bootstrapToast'), { autohide: true, delay: 3000 });
const toastElement = document.getElementById('toastContent');
toastElement.innerText = props.message;
toastElement.className = `toast-body text-white bg-${props.type}`;
toast.show();

</script>

<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="bootstrapToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Notificación</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id="toastContent">mensaje</div>
      </div>
  </div>
</template>