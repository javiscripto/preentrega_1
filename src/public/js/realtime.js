const socket = io(); // Conéctate al servidor Socket.io

socket.on('connect', () => {
  console.log('Conectado al servidor Socket.io');
});

socket.on('data', (data) => {
  console.log('Datos recibidos del servidor:', data);
//usar los datos enviados desde app
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor Socket.io');
});
