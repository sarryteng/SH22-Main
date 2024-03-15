import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:8080/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31'
  }
})