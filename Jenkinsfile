pipeline {
    agent any
    tools {
        nodejs 'Node20' // Tên phiên bản NodeJS đã cấu hình
    }
    stages {
        stage('Run Docker Compose') {
            steps {
                script {
                    // Ensure Docker Compose is installed and accessible
                    sh 'docker-compose --version'
                    
                    // Run docker-compose up in detached mode
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
    post {
        always {
            // Optional: Clean up or stop containers after the build
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}