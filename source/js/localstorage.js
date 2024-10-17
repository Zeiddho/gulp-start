export class Storage {
  getStorage (storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  };

  addToStorage (storageName, data) {
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
    return storageData;
  };

  removeFromStorage (storageName, id) {
    const storageData = JSON.parse(localStorage.getItem(storageName));

    if (!storageData) {
      return;
    }
    const index = storageData.findIndex(el => el.id === id);
    if (index !== -1) {
      storageData[index].amount--;
      if (storageData[index].amount === 0) {
        storageData.splice(index, 1);
      }
    }

    if (!storageData.length) {
      localStorage.removeItem(storageName);
    } else {
      localStorage.setItem(storageName, JSON.stringify(storageData));
    }
    return storageData;
  }
}

