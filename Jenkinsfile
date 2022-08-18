//CI-CD script---
pipeline {
    environment {
        SHARED_IMAGE = 'registry.cloud.mareana.com/mdh-cpv/dev/mdh-cpv-ui-shared'
        DOCKER_IMAGE = 'registry.cloud.mareana.com/mdh-cpv/dev/mdh-cpv-ui'
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
                       docker-compose down -v
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
                withDockerRegistry(credentialsId: 'docker-registry-mareana', url: 'https://registry.cloud.mareana.com') {
                sh '''#!/bin/bash -x
                       sudo docker build -t  $SHARED_IMAGE:$BUILD_NUMBER --no-cache -f Dockerfile-dev .
                       docker push $SHARED_MAGE:$BUILD_NUMBER
                       echo "Changing Docker image in prod dockerfile"
                       sed -i -e "s@IMAGE@\'"$SHARED_IMAGE:$BUILD_NUMBER"\'@g"  Dockerfile-prod
                       cat Dockerfile-prod
                       sudo docker build --build-arg app_dns=mi-devv3-5.mareana.com --build-arg jupyter_dns=jupyterhub-dev.mareana.com -t  $DOCKER_IMAGE:$BUILD_NUMBER --no-cache -f Dockerfile-prod .
               ''' 
               }
              }

              }
          stage("Push Docker Image to Docker Registry") {
            steps {
                withDockerRegistry(credentialsId: 'docker-registry-mareana', url: 'https://registry.cloud.mareana.com') {
                sh '''#!/bin/bash -x
                     docker push $DOCKER_IMAGE:$BUILD_NUMBER
                     docker rmi $DOCKER_IMAGE:$BUILD_NUMBER
                     docker rmi $SHARED_IMAGE:$BUILD_NUMBER
              '''  
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
                       sed -i -e "s@IMAGE@\'"$DOCKER_IMAGE:$BUILD_NUMBER"\'@g"  bms-k8s-dev-deployment.yml
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
