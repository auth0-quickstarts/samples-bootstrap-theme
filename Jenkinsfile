pipeline {
  agent {
    label 'crew-brucke'
  }
   
  tools {
    nodejs '10.15.1'
  }
 
  options {
    timeout(time: 10, unit: 'MINUTES')
  }
 
  stages {
    stage('SharedLibs') {
      steps {
        library identifier: 'auth0-jenkins-pipelines-library@master', retriever: modernSCM(
          [$class: 'GitSCMSource',
          remote: 'git@github.com:auth0/auth0-jenkins-pipelines-library.git',
          credentialsId: 'auth0extensions-ssh-key'])
      }
    }
    stage('Build') {
      steps {
        sshagent(['auth0extensions-ssh-key']) {
          sh 'npm ci'
          sh 'npm run build'
        }
      }
    }
    stage('Publish to CDN') {
      steps {
        sshagent(['auth0extensions-ssh-key']) {
          sh 'npm run publish:cdn'
        }
      }
    }
  }
   
  post {
    cleanup {
      deleteDir()
    }
  }
}