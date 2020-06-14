#!/usr/bin/env groovy
@Library('jenkins-library@master') _

pipeline {
  agent {
    node {
      label 'docker'
    }
  }

  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '5', daysToKeepStr: '5'))
  }

  triggers {
    pollSCM('* * * * *')
  }

  stages {
    stage('Build') {
       steps {
         withMaven {
           sh './docker-mvn.sh clean verify -Pheadless'
        }
      }
    }
    stage('Docker Build') {
      when {
        branch 'develop'
      }
      steps {
        withMaven {
          sh 'mvn -Pdocker-build resources:copy-resources@copy-dockerfile resources:copy-resources@copy-dist docker:build docker:push'
          build job: 'docker_restart_develop_latest'
        }
      }
    }
  }
  post {
    always {
      sendNotification currentBuild.result
    }
    failure {
      // notify users when the Pipeline fails
      mail to: 'gerd@aschemann.net',
        subject: "Failed PWA Pipeline: ${currentBuild.fullDisplayName}",
        body: "Something is wrong with ${env.BUILD_URL}"
    }
  }
}
