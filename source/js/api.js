export const getServerData = async (url) => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
