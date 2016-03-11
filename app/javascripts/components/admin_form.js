var React              = require('react');
var AdminActionCreator = require('../actions/admin_action_creator');
var AdminStore         = require('../stores/admin');

function getInitialStateFromStore(accountId) {

  return { admin: AdminStore.get(accountId) };
}

var AdminForm = React.createClass({
  getInitialState: function () {
    return getInitialStateFromStore(this.props.account);
  },
  onAdminChange: function (event) {
    this.setState({admin: event.target.checked});
    AdminActionCreator.set(this.props.account, event.target.checked);
  },
  componentWillMount: function () {
    AdminStore.addChangeEvent(this._onChange);
  },
  _onChange: function() {
    return this.setState(getInitialStateFromStore(this.props.account));
  },
  render: function() {
    console.log(this.state);
    return (
        <form className="pure-form">
          <label forHtml="admin">
        <input type="checkbox" name="admin" onChange={this.onAdminChange} checked={this.state.admin} />
            Admin
          </label>
        </form>
    )

  }

});

module.exports = AdminForm;
