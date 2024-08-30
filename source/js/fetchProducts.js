export const fetchProducts = async (url) => {
  const response = await fetch(url);

  let data = await response.json();
  return data;
}



