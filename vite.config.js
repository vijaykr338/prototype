import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: '127.0.0.1',
  // },
  plugins: [react()],
  define:{
    'process.env.VITE_AUTH0_DOMAIN' : JSON.stringify(process.env.VITE_AUTH0_DOMAIN),
    'process.env.VITE_AUTH0_CLIENT_ID' : JSON.stringify(process.env.VITE__AUTH0_CLIENT_ID),
    'process.env.VITE_AUTH0_REDIRECT_URI' : JSON.stringify(process.env.VITE_KEY_AUTH0_REDIRECT_URI)
  }
})
