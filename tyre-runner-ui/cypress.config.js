import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:4321',
    setupNodeEvents(on, config) {
            on('before:run', () => {
              exec('npm run start-backend', (err, stdout, stderr) => {
                if (err) {
                  console.error(err)
                  return
                }
                console.log(stdout)
              })
            })  
          },
          // experimentalInteractiveRunEvents: true, 
        }
      })
