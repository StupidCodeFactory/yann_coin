var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    RECEIVE_RAW_ACCOUNT:      null,
    RAW_ACCOUNTS_RECEIVED:    null,
    RAW_BALANCES_RECEIVED:    null,
    GET_BALANCE:              null,
    CREATE_TRANSFER:          null,
    BALANCE_UPDATED:          null,
    MINT_COIN:                null,
    CREATE_PRODUCT:           null,
    PRODUCT_CREATED:          null,
    UPDATE_PRODUCT:           null,
    PRODUCT_UPDATED:          null,
    CURRENT_ACCOUNT_SELECTED: null,
    ADMIN_RECEIVED:           null,
  })
};
