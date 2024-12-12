const useFetch = () => {
  const doGet = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    }
  };

  return { doGet };
};

export { useFetch };
