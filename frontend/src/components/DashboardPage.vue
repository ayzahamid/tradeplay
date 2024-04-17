<template>
  <div>
    <div class="header-bar">
      <button @click="sell">Sell</button>
      <button @click="signOut">Logout</button>
    </div>
    <h1>Welcome to the Dashboard!</h1>
    <!-- Product list -->
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id" @click="goToProductDetails(product.id)">
        <img :src="product.image" alt="Product Image" class="product-image">
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <p class="product-price">Price: ${{ product.price }}</p>
          <p class="product-seller">Seller: {{ product.seller }}</p>
          <p v-if="product.status !== 'Available'" class="status-indicator">{{ product.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'; // Import the router

export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    goToProductDetails(productId) {
      router.push({ name: 'ProductDetails', params: { id: productId } });
    },
    signOut() {
      console.log('Signing out...');
      router.push({ name: 'Login' });
    },
    sell() {
      this.$router.push({ name: 'ProductRegistration' });
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}

.header-bar button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.header-bar button:hover {
  background-color: #0056b3;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-details {
  padding: 20px;
}

.product-details h2 {
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
}

.product-seller {
  margin-bottom: 10px;
}

.status-indicator {
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
