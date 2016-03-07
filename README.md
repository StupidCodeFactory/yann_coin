# yann_coin

```shell
geth --etherbase 1 --datadir "data" --port 30303 --genesis "config/genesis/b9_genesis.json" --nodiscover --rpc --rpcport 8101 --rpcaddr localhost --rpccorsdomain "*" --minerthreads "2" --rpcapi "eth,web3" --maxpeers "4" --mine --verbosity "4" --unlock "0,1,2" --password "config/password" --bootnodes "enode://9bb68392a4016c45e709d7cde909f8184b97209abc7a44e3b79d4399b6f86ff71848736d6a275a5c78bb9e25e7c148866bd55ab927c03ff7f3e0235b20507ca0@52.31.233.20:30303" --networkid 101010102 console
```
