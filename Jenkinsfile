pipeline {
    agent any // exécute tout sur le système Jenkins hôte

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Virginouille/exercicejenkins.git'
            }
        }

        stage('Build Angular App') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root' // pour autoriser npm à écrire
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

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t spring-jenkins:latest .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                sh '''
                    docker stop spring-jenkins || true
                    docker rm spring-jenkins || true
                    docker run -d --name spring-jenkins -p 8081:8080 spring-jenkins:latest
                '''
            }
        }
    }
}
