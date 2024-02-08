#!/usr/bin/env ruby

node_build = <<~YML
    image: node:lts 

    build:
    stages: build
    script:
        - cd tyre-runner-webapp
        - npm install
        - npm run build
    artifacts:
        paths:
        - tyre-runner-webapp/public
YML

File.open('.node-gitlab-ci.yml', 'w'){ |f| f.write(node_build)}
