#CONFIG
deploy_user=
deploy_svr=""
deploy_ssh_port=
service_name=""
service_port=''

#KHONG TAC DONG
echo "LOCAL >> Begin deploy"

echo "LOCAL >>  Instal Lib"

yarn 

echo "LOCAL >>  Build"

yarn build

echo "LOCAL >> Upload to server"

echo "REMOTE >> Task: Create Folder"

ssh -p $deploy_ssh_port $deploy_user@$deploy_svr "mkdir -p /u02/code/"$service_name""  < /dev/null

echo "REMOTE >> Task: Copy build to server"

rsync -e 'ssh -p '$deploy_ssh_port'' -avh --delete dist/ $deploy_user@$deploy_svr:/u02/code/$service_name/dist/

echo "REMOTE >> Task: Copy Enviroment to server"

rsync -e 'ssh -p '$deploy_ssh_port'' -avh --delete .env.staging $deploy_user@$deploy_svr:/u02/code/$service_name/.env

echo "REMOTE >> Task: Copy libary config to server"

rsync -e 'ssh -p '$deploy_ssh_port'' -avh --delete package.json package-lock.json yarn.lock $deploy_user@$deploy_svr:/u02/code/$service_name/

echo "REMOTE >> Task: Install libary"

ssh -p $deploy_ssh_port $deploy_user@$deploy_svr "cd /u02/code/"$service_name" && yarn"  < /dev/null

echo  "REMOTE >> Task: Start PM2 >>"

ssh -p $deploy_ssh_port $deploy_user@$deploy_svr "cd /u02/code/"$service_name" && PORT="$service_port" pm2 start dist/main.js --name "$service_name"" < /dev/null

echo  "REMOTE >> Task: Save PM2 >>"

ssh -p $deploy_ssh_port $deploy_user@$deploy_svr "pm2 save" < /dev/null

echo  ">> Deploy Done >>"
