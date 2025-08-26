pipeline {
    agent any
    stages {
        stage('Check Environment') {
            steps {
                sh 'docker-compose --version'
                sh 'docker ps'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker-compose -f docker-compose.yml build'
            }
        }
        stage('Run Docker Compose') {
            steps {
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
        stage('Run NodeJS Script') {
            steps {
                script {
                    // Kiểm tra container đang chạy
                    sh 'docker ps'
                    // Chạy script trong container
                    sh 'docker-compose exec -T server.api node dist/main.js'
                }
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}