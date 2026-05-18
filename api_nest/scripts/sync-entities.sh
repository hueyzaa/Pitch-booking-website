rm -fr src/database/entities_bk
mv src/database/entities src/database/entities_bk
typeorm-model-generator-mf9 -h <host> -d <database> -p <port> -u <username> -x <passsword> -o src/database -e mysql 
node cli.js update-name-entity *
