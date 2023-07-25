  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('TokenKey')
    config.headers.Authorization = 'Bearer ' + token;

    return config;
  });