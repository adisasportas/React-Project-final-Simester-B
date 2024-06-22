const BASE_URL = 'https://randomuser.me/api/';
const FALLBACK_URL = 'https://monkeys.co.il/api2/wo.php';

export const fetchEmployees = async (seed = 'google', results = 10) => {
  try {
    const response = await fetch(`${BASE_URL}?results=${results}&seed=${seed}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching employees:', error);
    const fallbackResponse = await fetch(FALLBACK_URL);
    if (!fallbackResponse.ok) {
      throw new Error('Fallback network response was not ok');
    }
    const fallbackData = await fallbackResponse.json();
    return fallbackData.results;
  }
};
