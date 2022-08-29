pipeline {
  agent {
      node { 
          label  'master'
          
      }
  }
  environment {
     PATH = "/usr/local/bin:${env.PATH}"
     nodeimagename = "kerajamani/multi-node-repo:"
     registryCredential = 'keerthi_docker'
      dockerImage = ''
  }
  stages {
    stage('Build'){
      steps{
        //withCredentials([usernamePassword( credentialsId: 'keerthi_github',usernameVariable: 'MYUSER', passwordVariable: 'MYPWD' )]) {
        //sh " git tag -a build-$BUILD_NUMBER -m 'jenkins-tag' "
        //sh 'git remote -v'
        //sh "git remote add origin https://github.com/keerthirajamani/nodejs-jenkins-multi-branch.git && git push -u origin master && git remote -v && git push origin --tags"
        echo "I am groooot."
        }
      }    
    stage ('Deploy'){
      steps{
        script {
          dockerImage = docker.build("${nodeimagename}build-${BUILD_NUMBER}")
          docker.withRegistry('', registryCredential) {
            dockerImage.push()
          }
        }
      }
    }
    stage('cleanup'){
      steps{
         sh 'sudo docker rmi -f $(docker images -aq) y'
      }
    }
    stage('DEV-QA stage'){
      steps{
        build job: 'Check-trigger', parameters: [string(name: 'VALUE_BUILD', value:"$BUILD_NUMBER")], propagate: false
      }
    }
  }
}