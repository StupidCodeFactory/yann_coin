contract Admin {
        address[] admins;

        function Admin() {
        }

        event OnAdminChanged(address account, bool admin);
        event WatchForAdminReceived(address account, bool admin);

        function get(address account_id) returns (bool is_admin) {
                uint admin_length = admins.length;
                bool found_admin  = false;
                for(uint i; i < admin_length; i++) {
                        if (account_id == admins[i]) {
                                found_admin = true;
                                break;
                        }
                }
                WatchForAdminReceived(account_id, found_admin);
                return found_admin;

        }

        function set(address account_id, bool admin) returns (bool is_admin) {
                uint admin_length = admins.length;

                for(uint i; i < admin_length; i++) {
                        if (account_id == admins[i]) {
                                if (admin) {
                                        OnAdminChanged(account_id, true);

                                        return true;
                                } else {

                                        delete admins[i];
                                        OnAdminChanged(account_id, false);
                                        return false;
                                }

                        }
                }

                if (admin) {
                        admins.push(account_id);
                        OnAdminChanged(account_id, true);
                        return true;
                } else {
                        OnAdminChanged(account_id, false);
                        return false;
                }

        }

        modifier AdminOnly {
                uint admin_length = admins.length;
                for(uint i = 0; i < admin_length; i++) {
                        if (msg.sender == admins[i]) {
                                _
                        }
                }
                throw;
        }
}
