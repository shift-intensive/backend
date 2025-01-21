pipeline {
    agent any
    options {
        when {
            expression { env.BRANCH_NAME == 'main' }
        }
    }
    environment {
        GITHUB_TOKEN=credentials('github-container')
        DATABASE_URL=credentials('database-url')

        IMAGE_NAME='shift-intensive/backend'
        IMAGE_VERSION='latest'

        IP='51.250.122.249'
        PORT='3003'
        JWT_SECRET='qwertyuiopasdfghjklzxcvbnm123456'
        SERVER_URL='https://shift-intensive.ru/'
    }
    stages {
        stage('cleanup') {
            steps {
                sh 'docker system prune -a --volumes --force'
            }
        }
        stage('build image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_VERSION .'
            }
        }
        stage('login to GHCR') {
            steps {
                sh 'echo $GITHUB_TOKEN_PSW | docker login ghcr.io -u $GITHUB_TOKEN_USR --password-stdin'
            }
        }
        stage('tag image') {
            steps {
                sh 'docker tag $IMAGE_NAME:$IMAGE_VERSION ghcr.io/$IMAGE_NAME:$IMAGE_VERSION'
            }
        }
        stage('push image') {
            steps {
                sh 'docker push ghcr.io/$IMAGE_NAME:$IMAGE_VERSION'
            }
        }
        stage('deploy') {
            steps {
                withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'yandex-apps-container', keyFileVariable: 'SSH_PRIVATE_KEY', usernameVariable: 'SSH_USERNAME')]) {
                    sh 'install -m 600 -D /dev/null ~/.ssh/id_rsa'
                    sh 'rm ~/.ssh/id_rsa'
                    sh 'cp -i $SSH_PRIVATE_KEY ~/.ssh/id_rsa'
                    sh 'ssh -o "StrictHostKeyChecking=no" $SSH_USERNAME@$IP \
                        "sudo docker login ghcr.io -u $GITHUB_TOKEN_USR --password $GITHUB_TOKEN_PSW &&\
                        sudo docker rm -f shift-intensive-backend &&\
                        sudo docker pull ghcr.io/shift-intensive/backend:latest &&\
                        sudo docker run --restart=always --name shift-intensive-backend -d -p $PORT:$PORT -e PORT=$PORT -e SERVER_URL=$SERVER_URL -e DATABASE_URL=$DATABASE_URL -e JWT_SECRET=$JWT_SECRET --network shift-intensive ghcr.io/shift-intensive/backend:latest"'
                }
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}