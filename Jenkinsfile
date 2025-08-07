pipeline {
    agent {
        // Utilise l'image Node.js
        docker { 
            image 'node:18-alpine'
            args '--entrypoint=/bin/sh'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                // Jenkins récupère automatiquement le code
                git branch: 'main', url: 'https://github.com/Virginouille/exercicejenkins.git' 
            }
        }
        stage('Build') {
            steps {
                // Installe les dépendances et compile le projet Angular
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
                // Crée l'image Docker de l'application
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