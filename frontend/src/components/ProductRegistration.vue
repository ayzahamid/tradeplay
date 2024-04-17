<template>
  <div class="product-registration">
    <h1>Product Registration</h1>
    <form @submit.prevent="submitForm" class="registration-form">
      <div class="form-group">
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" v-model="productName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="price" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="images">Product Images:</label>
        <input type="file" id="images" accept="image/*" multiple @change="handleImageUpload" class="form-control-file" required>
      </div>
      <div class="button-group">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button @click="cancel" class="btn btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  data() {
    return {
      productName: '',
      price: '',
      description: '',
      images: [],
      userId: localStorage.getItem('userId')
    };
  },


  methods: {
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('productName', this.productName);
        formData.append('price', this.price);
        formData.append('description', this.description);
        formData.append('sellerId', 1);

        const response = await axios.post('http://localhost:3000/api/auth/products', formData, {
          headers: { 'Content-Type': 'application/json' }
        })
        console.log('Product registered:', response.data);
        // Navigate back to the Product List page
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Error registering product:', error);
      }
    },
    handleImageUpload(event) {
      this.images = Array.from(event.target.files);
    },
    cancel() {
      this.$router.push({ name: 'Dashboard' });
    }
  }
};
</script>

<style scoped>
.product-registration {
  max-width: 500px;
  margin: auto;
}

.registration-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-control-file {
  width: 100%;
  padding: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
