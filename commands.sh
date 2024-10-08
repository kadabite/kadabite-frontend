# execute this command if you want to run a mongo shell
docker exec -it d9ef2dea42a0 mongosh mongo --username deliver_user --password deliver_pwd --authenticationDatabase admin


docker exec -it --user root 50cd1d3b2988 mongodump --username deliver_user --password deliver_pwd --aut
henticationDatabase admin --db deliver_db --out /data/dump


mongorestore --uri="mongodb+srv://chinonsodomnic:gNN7FtKjiRyBXg44@linuxkitchencluster.pzdh7.mongodb.net/?retryWrites=true&w=majority&appName=linuxKitchenCluster" --db deliver_db ./dump/deliver_db