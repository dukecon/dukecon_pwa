#!/usr/bin/env groovy

pipeline {
  agent {
    node {
      label 'docker'
    }
  }

  triggers {
    pollSCM('* * * * *')
  }

  stages {
    stage('Build') {
       steps {
         withMaven {
           sh 'mvn clean test'
        }
      }
    }
    stage('Docker Build') {
      when {
        branch 'develop'
      }
      steps {
        withMaven {
          sh 'mvn  -Pdocker-build resources:copy-resources@copy-dockerfile resources:copy-resources@copy-dist docker:build docker:push'
        }
      }
    }
  }
  post {
    failure {
      // notify users when the Pipeline fails
      mail to: 'gerd@aschemann.net',
        subject: "Failed PWA Pipeline: ${currentBuild.fullDisplayName}",
        body: "Something is wrong with ${env.BUILD_URL}"
    }
  }
}
