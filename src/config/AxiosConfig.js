import axios from "axios";

const AxiosConfig = axios.create({
    baseURL: "http://localhost:5234"
})

// Logika koja se izvršava kada se HTTP zahtev presretne
AxiosConfig.interceptors.request.use(
  (config) => {
    // Dodavanje JWT tokena u Authorization zaglavlje
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Logika koja se izvršava kada se HTTP odgovor presretne
AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logika za automatsku odjavu korisnika ili osveženje tokena
      console.log('Not authorized, please log in.');
    }
    return Promise.reject(error);
  }
);

export default AxiosConfig;