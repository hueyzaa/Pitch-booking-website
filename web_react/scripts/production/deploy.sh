#CONFIG
deploy_user=
deploy_svr=""
deploy_ssh_port=
service_name=""
service_port=''


#KHONG TAC DONG
echo ">> Begin deploy"

echo ">> Instal Lib >>"

yarn

echo ">> Build >> "

yarn build:production

echo ">> Upload to Server  >> "

echo ">> Task: Copy to Server"

rsync -e 'ssh -p '$deploy_ssh_port'' -avh --delete dist/ $deploy_user@$deploy_svr:/u02/code/$service_name/dist/

echo  ">> Task: Start PM2 >>"

ssh -p $deploy_ssh_port $deploy_user@$deploy_svr "pm2 restart "$service_name" " < /dev/null

echo  ">> Deploy Done >>"
