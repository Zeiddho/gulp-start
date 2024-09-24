export const getStorage = (storageName) => {
  return JSON.parse(localStorage.getItem(storageName));
};

export const addToStorage = (storageName, data) => {
  let storageData = JSON.parse(localStorage.getItem(storageName));
  if (storageData) {
    const index = storageData.findIndex(item => item.id === data.id);
    if (index !== -1) {
      storageData[index].amount++;
    } else {
      storageData.push({ ...data, amount: 1 });
    }
  } else {
    storageData = [{ ...data, amount: 1 }];
  }
  localStorage.setItem(storageName, JSON.stringify(storageData));
}

export const removeFromStorage = (storageName, id) => {
  const storageData = JSON.parse(localStorage.getItem(storageName));

  if(!storageData) {
      return;
  }
  const index = storageData.findIndex(el => el.id === id);
  if (index !== -1) {
    storageData[index].amount > 0 ? storageData[index].amount-- : 0;
  }

  if(!storageData.length) {
      localStorage.removeItem(storageName);
      return;
  }
  localStorage.setItem(storageName, JSON.stringify(storageData));
};
