const webpack = require('webpack');
const dotenv = require('dotenv');

// Intenta cargar variables de entorno desde un archivo .env si existe
dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NG_APP_SUPABASE_URL: JSON.stringify(process.env.NG_APP_SUPABASE_URL),
        NG_APP_SUPABASE_KEY: JSON.stringify(process.env.NG_APP_SUPABASE_KEY)
      }
    })
  ]
};