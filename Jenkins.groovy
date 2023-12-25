//def repo = 'https://github.com/LovelyCatEx/shinkai-backend'
def repo = 'https://gitee.com/lovelycatv/shinkai-front'
def module_name = "shinkai-frontend"
def APP_BRANCH = "master"

node {
    stage('Delete Workspace') {
        echo "清理工作目录"
        deleteDir()
    }

    stage('Pull Repository') {
        echo "正在从仓库拉取代码, 分支: ${APP_BRANCH}"
        checkout([$class: 'GitSCM',
                  branches: [[name: "*/${APP_BRANCH}"]],
                  extensions: [],
                  userRemoteConfigs: [[url: "${repo}"]]])
        echo "拉取代码完成"
    }


    stage('Vue Build') {
        echo "准备构建${module_name}"
        nodejs('node21.5.0') {
            sh 'ls'
            sh 'whoami'
            sh 'groups'
            sh 'npm version'
            sh 'npm install'
            sh 'npm run build --unsafe-perm=true --allow-root'
        }
    }

}