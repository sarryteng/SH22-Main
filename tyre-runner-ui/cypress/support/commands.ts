import { exec } from 'child_process';

before(async() => {
    const executeScript = async() => {
      return new Promise((resolve, reject) => {
        exec('python your_script.py', (err, stdout, stderr) => {
          if (err) {
            console.error(`Error executing script: ${err}`);
            reject(err);
            return;
          }
          resolve(`Script output: ${stdout}`);
        });
      });
    };

    try {
      // Wait for the script execution to complete
      await executeScript();
      console.log('Pre-test script executed successfully');
    } catch (err) {
      console.error('Failed to execute pre-test script:', err);
      // Stop the Cypress test run if the script execution fails
      process.exit(1);
    }

    // Generate the fake data
    exec('npm fake-data', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error generating fake data: ${err}`);
            process.exit(1);
        }
        console.log(`Fake data generated: ${stdout}`);
    });

});
