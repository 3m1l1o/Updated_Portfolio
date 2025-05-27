const userData = {
  nombre: "Emilio Gallo",
  email: "emiliogallo80@gmail.com",
  telefono: "1128748549",
  imagen: "data:image/jpeg;base64,...", // tu base64 de la imagen
};

function getUser() {
  return JSON.stringify(userData);
}

module.exports = {
  getUser,
};