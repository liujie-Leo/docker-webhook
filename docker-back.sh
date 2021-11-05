#!/bin/bash
WORK_PATH='/home/projects/docker-back'
cd $WORK_PATH

echo "先清除老代码"
git reset --hard origin/master
git clean -f

echo "拉取最新代码"
git pull origin master

echo "开始执行构建"
docker build -t docker-back:1.0 .

echo "停止并删除旧容器"
docker stop docker-back-container
docker rm docker-back-container

echo "启动新容器"
docker container run -p 3000:3000 --name docker-back-container -d docker-back:1.0