export const environment = {
    production: false,
    apiUrl: window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : 'https://blog-app-nh06.onrender.com/api'
    // apiUrl: window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : 'https://blog-app-8n52.vercel.app/api'
};
