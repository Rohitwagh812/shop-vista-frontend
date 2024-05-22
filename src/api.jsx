import axios from 'axios';
import React from 'react';

const api = axios.create({
  baseURL: "https://shop-vista-backend.onrender.com"
});

export default api;