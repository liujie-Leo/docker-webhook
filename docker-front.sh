#!/bin/bash
WORK_PATH='/home/projects/docker-front'
cd $WORK_PATH

echo "先清除老代码"
git reset --hard origin/main
git clean -f

echo "拉取最新代码"
git pull origin main

echo "打包"
npm run build

echo "开始执行构建镜像"
docker build -t docker-front:1.0 .

echo "停止并删除旧容器"
docker stop docker-front-container
docker rm docker-front-container

echo "启动新容器"
docker container run -p 80:80 --name docker-front-container -d docker-front:1.0