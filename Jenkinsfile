pipeline {
    agent any // on utilise le système hôte pour toutes les étapes

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Virginouille/exercicejenkins.git' 
            }
        }

        stage('Build in Docker Node') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '--entrypoint=/bin/sh'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Gen artifact') {
            steps {
                sh "docker build -t spring-jenkins:latest ."
            }
        }

        stage('Deployment') {
            steps {
                sh """
                docker stop spring-jenkins || true
                docker rm spring-jenkins || true
                docker run -d --name spring-jenkins -p 8081:8080 spring-jenkins:latest
                """
            }
        }
    }
}
