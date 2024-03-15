#!/usr/bin/env ruby

node_build = <<~YML
    image: node:lts 
    test:
        stage: test
        script:
            - cd tyre-runner-webapp
            - npm c
            - npm install xvfb
            - npx cypress run
    build:
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
