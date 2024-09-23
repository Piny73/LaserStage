import mysql from 'mysql2/promise'; // Usa 'promise' per utilizzare le promesse

const dbConnection = mysql.createPool({
    host: 'localhost', // Rimuovi la porta da qui
    user: 'agenda',
    password: 'agenda',
    database: 'gestioneappuntamenti',
    port: 3306 // Specifica la porta qui
});

// Non è necessario connettersi manualmente con .connect() quando usi un pool
export default dbConnection;

