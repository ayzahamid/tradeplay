<template>
  <div class="modal">
    <div class="modal-content">
      <input v-model="counterOfferAmount" type="number" placeholder="Enter counter offer amount" class="counter-input">
      <button @click="submitCounterOffer" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      counterOfferAmount: ''
    };
  },
  methods: {
    submitCounterOffer() {
      // Emit an event with the counter offer amount
      this.$emit('counterOfferSubmitted', this.counterOfferAmount);
      // Close the modal
      this.$emit('closeModal');
    }
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.counter-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding is included in the width */
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
