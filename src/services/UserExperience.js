export async function getExperience() {
  try {
    const response = await fetch('http://localhost:4000/api/experiences');
    if (!response.ok) {
      throw new Error('Error al obtener experiencias');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}