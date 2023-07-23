//localStorage
const createUserSetting = (key: string) => {
  const getUser = localStorage.getItem(key);
  const store = getUser ? JSON.parse(getUser) : {};
  console.log(store);
  const save = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };
  const storage = {
    get(key: string) {
      return store[key];
    },
    set(key: string, value: string) {
      store[key] = value;
      save();
    },
    delete(key: string) {
      localStorage.removeItem(key);
      save();
    },
  };
  return storage;
};

//sessionStorage
const storeAccount = (key: string) => {
  const getStore = sessionStorage.getItem(key);
  const store = getStore ? JSON.parse(getStore) : {};

  const save = () => {
    sessionStorage.setItem(key, JSON.stringify(store));
  };
  const storage = {
    get(key: string) {
      return store[key];
    },
    set(key: string, value: string) {
      store[key] = value;
      save();
    },
    delete(key: string) {
      console.log("Test");
      sessionStorage.removeItem(key);
      save();
    },
    remove() {
      sessionStorage.clear();
    },
  };
  return storage;
};

export const profileSetting = createUserSetting("profile_setting");
export const account = storeAccount("userData");
