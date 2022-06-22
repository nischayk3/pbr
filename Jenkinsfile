//CI-CD script---
pipeline {
    environment {
        DOCKER_IMAGE = 'registry.cloud.mareana.com/mdh-cpv/dev'
    }
    agent { label 'cpv_node_ui' } 
    options {
        ansiColor('xterm')
    }
    stages {    
    stage("Code Coverage") {
         
           steps {
               catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
               
                 sh '''#!/bin/bash -x
                       sudo docker ps | xargs docker stop 
                       sudo docker ps -a | xargs docker rm
                       docker-compose build  --no-cache ui-cypress-run
                       docker-compose up ui-cypress-run
                       docker-compose down 
                       ls coverage
                '''  
                     publish html
                   publishHTML target: [
                   allowMissing: false,
                   alwaysLinkToLastBuild: false,
                   keepAll: true,
                   reportDir: './coverage/lcov-report/',
                   reportFiles: 'index.html',
                   reportName: 'Coverage Report'
                   ]

               }
             }
          }  
      stage('Sonarqube Analysis') {
        environment {
           scannerHome = tool 'SonarQubeScanner'
      }    
       steps {
            withSonarQubeEnv('sonar') {
           sh "${scannerHome}/bin/sonar-scanner"
           sh "sudo rm -rf coverage/ .nyc_output/ dist/"
         }
      }
    }
    
     
      stage("Quality Gate Status Check") {
             
            steps {
                 catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                  sh '''#!/bin/bash -x
                        STATUS="$(curl -s -u admin:Mzreana@190$  https://sonarqube.cloud.mareana.com/api/qualitygates/project_status?projectKey=project:mdh_cpv_ui)"
                        if [[ $STATUS = *"\\"status\\":\\"ERROR\\""* ]]; then
  	                    echo "Quality Gates Failed for Project mdh_cpv_ui hence aborting the pipeline"
                        exit 1
                        else
                        echo "Quality Gates Passed"
                        fi'''       
                }
              }
           }
          stage("Build Docker Image") {
            steps {
                sh 'sudo docker build -t  $DOCKER_IMAGE/mdh-cpv-ui:$BUILD_NUMBER --no-cache .'
                }
              }
          stage("Push Docker Image to Docker Registry") {
            steps {
                withDockerRegistry(credentialsId: 'docker-registry-mareana', url: 'https://registry.cloud.mareana.com') {
                sh 'docker push $DOCKER_IMAGE/mdh-cpv-ui:$BUILD_NUMBER'
                sh 'docker rmi $DOCKER_IMAGE/mdh-cpv-ui:$BUILD_NUMBER'
                }
            }
          }
          stage("Deploy to Dev") {
              steps {
                  withAWS(credentials: 'AWS-eks-cred', region: 'us-east-1') {
                 sh 'aws --version'
                 sh 'aws eks update-kubeconfig --name eks-cluster --region us-east-1'
                 sh '''#!/bin/bash -x
                       echo "Changing Docker image in deployment yml file"
                       sed -i -e "s@IMAGE@\'"$DOCKER_IMAGE/mdh-cpv-ui:$BUILD_NUMBER"\'@g"  bms-k8s-dev-deployment.yml
                       echo "Deploying the latest docker image to dev"
                       kubectl apply -f bms-k8s-dev-deployment.yml --record
                       kubectl -n mdh-cpv-dev get pods
                       kubectl -n mdh-cpv-dev rollout history deployments.v1.apps/cpv-nextgen-ui
                    '''
                 }
                 }
            }
    }
}
