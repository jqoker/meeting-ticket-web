export const LOGIN_U_ID = '_u_id';
export const cache =  {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch(e) {
      console.error(e);
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
      console.error(e);
    }
  },
  del(key) {
    try {
      localStorage.removeItem(key);
    } catch(e) {
      console.error(e);
    }
  },
  clear() {
    try {
      localStorage.clear(key);
    } catch(e) {
      console.error(e);
    }
  }
};
