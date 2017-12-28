#!/usr/bin/env groovy

pipeline {
  agent {
    node {
      label 'docker'
    }
  }
  
  stages {
    stage('Build') {
      steps {
        // using the Pipeline Maven plugin we can set maven configuration settings, publish test results, and annotate the Jenkins console
        withMaven {
          sh 'mvn clean verify'
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
