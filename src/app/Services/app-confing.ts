export const ApiConfing = {
  get apiUrl() {
      if (window.location.href.includes('localhost')) {
        return 'https://clicksct.claropr.com/v3/api'; 
      }
      return 'api';
    }
  };
