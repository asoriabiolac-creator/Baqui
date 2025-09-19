const sql = require('mssql');

const config = {
    user: '', // Deja vacío para autenticación de Windows
    password: '', // Deja vacío para autenticación de Windows
    server: 'DESKTOP-0MRVS84', // Solo el nombre del servidor
    port: 1433, // O el puerto dinámico que encontraste
    database: 'baqui',
    options: {
        trustServerCertificate: true,
        encrypt: true,
    }
};

async function testConnection() {
    try {
        let pool = await sql.connect(config);
        console.log('Conexión exitosa a la base de datos');
        pool.close();
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    }
}

testConnection();