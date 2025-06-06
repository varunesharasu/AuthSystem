pipeline {
    agent any

    environment {
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
        DOCKERHUB_USER = 'varunesht'
        BUILD_TAG = "${env.BUILD_NUMBER}"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/auth-backend:${BUILD_TAG}"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/auth-frontend:${BUILD_TAG}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/varunesharasu/AuthSystem.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('server') {
                    script {
                        docker.build(env.BACKEND_IMAGE)
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('client') {
                    script {
                        docker.build(env.FRONTEND_IMAGE)
                    }
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withDockerRegistry([credentialsId: 'docker', url: '']) {
                    script {
                        docker.image(env.BACKEND_IMAGE).push()
                        docker.image(env.FRONTEND_IMAGE).push()
                    }
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    sh """
                        sed 's/\\\${BUILD_NUMBER}/${env.BUILD_NUMBER}/g' Deployment/backend-deployment.yaml > backend-deployment.yaml
                        sed 's/\\\${BUILD_NUMBER}/${env.BUILD_NUMBER}/g' Deployment/frontend-deployment.yaml > frontend-deployment.yaml
                        kubectl apply --kubeconfig=${env.KUBECONFIG} -f backend-deployment.yaml
                        kubectl apply --kubeconfig=${env.KUBECONFIG} -f frontend-deployment.yaml
                        kubectl rollout restart deployment/recipe-backend --kubeconfig=${env.KUBECONFIG}
                        kubectl rollout restart deployment/recipe-frontend --kubeconfig=${env.KUBECONFIG}
                    """
                }
            }
        }

        stage('Deploy Monitoring') {
            steps {
                script {
                    sh """
                        kubectl apply --kubeconfig=${env.KUBECONFIG} -f Deployment/prometheus-deployment.yaml
                        kubectl apply --kubeconfig=${env.KUBECONFIG} -f Deployment/grafana-deployment.yaml
                    """
                }
            }
        }
    }
}