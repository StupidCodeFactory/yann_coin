contract Admin {
        address[] admins;

        function Admin() {
        }

        modifier AdminOnly {
                uint admin_length = admins.length;
                for(uint i; i < admin_length; i++) {
                        if (msg.sender == admins[i]) {
                                _
                        }
                }
                throw;
        }
}
