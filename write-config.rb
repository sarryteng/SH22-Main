#!/usr/bin/env ruby

node_build = <<~YML
    front-end-web-app-test:
        image: cypress/base
        stage: test
        script:
            - cd tyre-runner-webapp
            - npm ci
            - export BACKEND_URL='https://backend-gla-team22.azurewebsites.net/tyre-data'
            - npm start &
            - npx cypress run 

    front-end-web-app-build:
        image: node:lts
        stage: build
        script:
            - cd tyre-runner-webapp
            - npm ci
            - npm run build
        artifacts:
            paths:
            - tyre-runner-webapp/public
YML

File.open('.node-gitlab-ci.yml', 'w'){ |f| f.write(node_build)}
