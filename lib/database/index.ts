// Importa el módulo 'mongoose', que es una biblioteca de modelado de objetos MongoDB para Node.js.
import mongoose from 'mongoose';

// Obtiene la cadena de conexión a MongoDB desde la variable de entorno MONGODB_URI.
const MONGODB_URI = process.env.MONGODB_URI;

// Crea un objeto 'cached' que se almacenará en el ámbito global y contendrá la conexión de MongoDB y la promesa de conexión.
let cached = (global as any).mongoose || { conn: null, promise: null };

// Exporta una función llamada 'connectToDatabase' que se utiliza para conectar a la base de datos MongoDB.
export const connectToDatabase = async () => {
    
    // Si la conexión ya está establecida, devuelve la conexión existente.
    if (cached.conn) return cached.conn;

    // Si la cadena de conexión a MongoDB no está presente, lanza un error.
    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // Si no hay una promesa de conexión existente, crea una nueva conexión a MongoDB.
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently', // Nombre de la base de datos que se utilizará.
        bufferCommands: false // Deshabilita el almacenamiento en búfer de comandos para evitar problemas de memoria.
    });

    // Espera a que la promesa de conexión se resuelva y almacena la conexión en el objeto 'cached'.
    cached.conn = await cached.promise;

    // Devuelve la conexión establecida.
    return cached.conn;
}
