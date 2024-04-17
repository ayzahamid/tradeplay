<template>
  <div class="product-details">
    <h2>{{ product ? product.name : 'Loading...' }}</h2>
    <p>Status: <span v-if="product">{{ product.status }}</span></p>
    <p>Initial Price: <span v-if="product">${{ product.price }}</span></p>
    <p>Description: <span v-if="product">{{ product.description }}</span></p>

    <button v-if="product && product.status === 'Available'" @click="purchaseProduct" class="purchase-button">Purchase</button>

    <button v-if="product && product.status === 'Available'" @click="openCounterOfferModal" class="purchase-button">Counter Offer</button>

    <!-- Counter Offer Modal -->
    <CounterOfferModal v-if="showCounterOfferModal" @counterOfferSubmitted="submitCounterOffer" @closeModal="closeCounterOfferModal" />

    <!-- Display offers -->
    <div v-if="product && product.offers && product.offers.length > 0" class="offers">
      <h3>Offers:</h3>
      <ul>
        <li v-for="(offer, index) in product.offers" :key="index">Offer {{ index + 1 }}: ${{ offer }}</li>
      </ul>
    </div>

    <!-- Additional product details can be added here -->
    <div v-if="!product" class="loading-message">Loading product details...</div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import CounterOfferModal from './CounterOfferModal.vue';

export default defineComponent({
  components: {
    CounterOfferModal
  },
  data() {
    return {
      product: null,
      showCounterOfferModal: false
    };
  },

  mounted() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.get(`http://localhost:3000/api/auth/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    async purchaseProduct() {
      try {
        const productId = this.$route.params.id;
        await axios.put(`http://localhost:3000/api/auth/products/${productId}/purchase`);
        // Navigate back to Product List UI or do other necessary actions
        // For example:
        // this.$router.push('/product-list');
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Error purchasing product:', error);
      }
    },
    openCounterOfferModal() {
      this.showCounterOfferModal = true;
    },
    closeCounterOfferModal() {
      this.showCounterOfferModal = false;
    },
    async submitCounterOffer(offerValue: number) {
      try {
        const productId = this.$route.params.id;
        await axios.put(`http://localhost:3000/api/auth/products/${productId}/counter-offer`, { offer: offerValue });
        // Fetch updated product details after making the counter offer
        this.fetchProductDetails();
        this.closeCounterOfferModal();
      } catch (error) {
        console.error('Error making counter offer:', error);
      }
    }
  }
});
</script>

<style scoped>
.product-details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.product-details h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-details p {
  font-size: 16px;
  margin-bottom: 8px;
}

.loading-message {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #888;
}

.purchase-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.purchase-button:hover {
  background-color: #45a049; /* Darker Green */
}


</style>
