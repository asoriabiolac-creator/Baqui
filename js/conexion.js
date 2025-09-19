const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//const config = {
   // user: 'root',
   // password: '123456789',
   // server: 'localhost',
   // database: 'baqui',
   // options: {
     //   trustServerCertificate: true,
     //   encrypt: true,
        // }
//};

//CONEXION DE AYRTON
const config = {
    user: 'sara', // Deja vacío para autenticación de Windows
    password: 'valentino1604', // Deja vacío para autenticación de Windows
    server: 'LAPTOP-BKCFE2TU', // Solo el nombre del servidor
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

// GUARDA EL RECLAMO
app.post('/api/reclamos', async (req, res) => {
    const data = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('nombres', sql.VarChar, data.nombres)
            .input('apellidos', sql.VarChar, data.apellidos)
            .input('tipo_documento', sql.VarChar, data.tipo_documento)
            .input('numero_documento', sql.Int, data.numero_documento)
            .input('email', sql.VarChar, data.email)
            .input('telefono', sql.Int, data.telefono)
            .input('departamento', sql.VarChar, data.departamento)
            .input('provincia', sql.VarChar, data.provincia)
            .input('distrito', sql.VarChar, data.distrito)
            .input('direccion', sql.VarChar, data.direccion)
            .input('tipo', sql.VarChar, data.tipo)
            .input('detalle', sql.Text, data.detalle)
            .query(`INSERT INTO reclamos
                (nombres, apellidos, tipo_documento, numero_documento, email, telefono, departamento, provincia, distrito, direccion, tipo, detalle)
                VALUES (@nombres, @apellidos, @tipo_documento, @numero_documento, @email, @telefono, @departamento, @provincia, @distrito, @direccion, @tipo, @detalle)`);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ADMINISTRADOR
app.get('/api/reclamos', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT TOP 20 * FROM reclamos ORDER BY fecha DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GUARDA LOS DATOS DE CONTACTO
app.post('/api/contactanos', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .input('asunto', sql.VarChar, asunto)
            .input('mensaje', sql.Text, mensaje)
            .query(`INSERT INTO contactanos (nombre, email, asunto, mensaje) 
                    VALUES (@nombre, @email, @asunto, @mensaje)`);
        res.json({ success: true, message: 'Datos guardados correctamente' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));

async function testConnection() {
    try {
        let pool = await sql.connect(config);
        console.log('Conexión exitosa a la base de datos');
        pool.close();
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    }
}