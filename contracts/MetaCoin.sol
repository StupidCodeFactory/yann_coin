contract MetaCoin {
        mapping (address => uint) balances;

        event OnCoinReceived(address receiver, uint newBalance);
        event OnCoinSent(address sender, uint newBalance);

        function MetaCoin() {
                balances[tx.origin] = 10000;
        }

        function mint(address receiver, uint amount) {
                balances[receiver] += amount;
                OnCoinReceived(receiver, balances[receiver]);
        }

        function sendCoin(address receiver, uint amount) returns(bool sufficient) {
        if (balances[msg.sender] < amount) {
        return false;
        }

        balances[msg.sender] -= amount;
        OnCoinSent(msg.sender, balances[msg.sender]);
        balances[receiver] += amount;
        OnCoinReceived(receiver, balances[receiver]);
        return true;
        }

        function getBalance(address addr) returns(uint) {
        return balances[addr];
        }
}
