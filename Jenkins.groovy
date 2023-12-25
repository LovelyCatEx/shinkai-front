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

    stage('Package & Publish') {
        echo "准备压缩 /dist 文件夹"
        sh 'tar -cvf result.tar dist/*'

        echo "准备推送至应用服务器"
        sshPublisher(publishers: [
                sshPublisherDesc(
                        configName: 'aliyun_2',
                        transfers: [
                                sshTransfer(
                                        cleanRemote: false,
                                        excludes: '',
                                        execCommand: 'cd jenkins_result/shinkai/front/ && sh startup.sh',
                                        execTimeout: 120000,
                                        flatten: false,
                                        makeEmptyDirs: false,
                                        noDefaultExcludes: false,
                                        patternSeparator: '[, ]+',
                                        remoteDirectory: 'jenkins_result/shinkai/front',
                                        remoteDirectorySDF: false,
                                        removePrefix: '',
                                        sourceFiles: 'result.tar')
                        ],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                )])
    }

}