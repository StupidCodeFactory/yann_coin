var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    RECEIVE_RAW_ACCOUNT:   null,
    RAW_ACCOUNTS_RECEIVED: null,
    RAW_BALANCES_RECEIVED: null,
    GET_BALANCE:           null,
    CREATE_TRANSFER:       null,
    BALANCE_UPDATED:       null,
    MINT_COIN:             null,
    CREATE_PRODUCT:        null,
    PRODUCT_CREATED:       null
  })
};
