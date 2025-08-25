pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    skipDefaultCheckout(true)
  }

  parameters {
    string(name: 'DOCKER_REGISTRY', defaultValue: '', description: 'Registry (ví dụ: registry.hub.docker.com hoặc ghcr.io). Bỏ trống để không push.')
    string(name: 'DOCKER_REPO', defaultValue: 'nest-elastic', description: 'Tên repo image (ví dụ: user/nest-elastic)')
    string(name: 'DOCKER_CREDENTIALS_ID', defaultValue: '', description: 'ID credentials trong Jenkins để login registry (nếu push).')
    booleanParam(name: 'DEPLOY', defaultValue: false, description: 'Bật để chạy deploy bằng docker compose trên agent.')
    string(name: 'COMPOSE_FILE', defaultValue: 'docker-compose.yml', description: 'Đường dẫn file docker compose để deploy.')
    string(name: 'APP_PORT', defaultValue: '3000', description: 'Cổng ứng dụng (tham khảo compose).')
  }

  environment {
    APP_NAME = 'nest-elastic'
    GIT_SHORT_COMMIT = "${env.GIT_COMMIT?.take(7)}"
    DOCKER_IMAGE = "${params.DOCKER_REGISTRY ? params.DOCKER_REGISTRY + '/' : ''}${params.DOCKER_REPO}"
    NODE_OPTIONS = '--max-old-space-size=2048'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          currentBuild.displayName = "#${env.BUILD_NUMBER} ${env.BRANCH_NAME} ${env.GIT_SHORT_COMMIT}"
        }
      }
    }

    stage('Install') {
      steps {
        sh 'node -v || true'
        sh 'corepack enable || true'
        sh 'yarn -v || npm i -g yarn'
        sh 'yarn install --frozen-lockfile'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }

    stage('Test (best-effort)') {
      steps {
        sh 'yarn --silent run test || echo "Tests skipped or failed (non-blocking)"'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker version || echo "Docker CLI không khả dụng trên agent"'
        sh 'docker build -t ${DOCKER_IMAGE}:${GIT_SHORT_COMMIT} -t ${DOCKER_IMAGE}:latest .'
      }
    }

    stage('Docker Push') {
      when {
        expression { return params.DOCKER_REGISTRY?.trim() && params.DOCKER_CREDENTIALS_ID?.trim() }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: params.DOCKER_CREDENTIALS_ID, usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
          sh '''
            echo "$REG_PASS" | docker login ${params.DOCKER_REGISTRY} -u "$REG_USER" --password-stdin
            docker push ${DOCKER_IMAGE}:${GIT_SHORT_COMMIT}
            docker push ${DOCKER_IMAGE}:latest
            docker logout ${params.DOCKER_REGISTRY}
          '''
        }
      }
    }

    stage('Deploy (docker compose)') {
      when {
        expression { return params.DEPLOY }
        anyOf {
          branch 'master'
          branch 'main'
        }
      }
      steps {
        sh '''
          which docker-compose >/dev/null 2>&1 && CMD=docker-compose || CMD="docker compose"
          $CMD -f ${COMPOSE_FILE} pull || true
          $CMD -f ${COMPOSE_FILE} up -d --build
        '''
      }
    }
  }

  post {
    success {
      echo 'Pipeline thành công.'
    }
    failure {
      echo 'Pipeline thất bại.'
    }
    always {
      script {
        echo "Branch: ${env.BRANCH_NAME}, Commit: ${env.GIT_SHORT_COMMIT}"
      }
    }
  }
}
