//POST/messagesフォーム
var PostMessageBox = React.createClass({
  displayName: "PostMessageBox",

  getInitialState() {
    var state = JSON.parse(localStorage.getItem("PostMessageBox_state"));
    if (!state) {
      state = {};
    }
    return {
      clientkey: state.hasOwnProperty('clientkey') ? state.clientkey : "",
      deviceid: state.hasOwnProperty('deviceid') ? state.deviceid : "",
      message: state.hasOwnProperty('message') ? state.message : ""
    };
  },
  handleSetRemoconAppState: function (state) {
    this.setState(state);
  },
  handlePostMessages: function () {
    localStorage.setItem("PostMessageBox_state", JSON.stringify(this.state));
    $.ajax({
      type: "POST",
      url: "https://api.getirkit.com/1/messages",
      data: {
        clientkey: this.state.clientkey,
        deviceid: this.state.deviceid,
        message: this.state.message
      },
      success: function (data) {
        alert("完了！");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("エラー");
      }
    });
  },
  render: function () {
    console.log(this.state);
    return React.createElement(
      "div",
      { className: "well bs-component" },
      React.createElement(
        "form",
        { className: "form-horizontal" },
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "legend",
            null,
            "POST /messages"
          ),
          React.createElement(
            "p",
            { className: "read" },
            "赤外線信号を送ります。"
          ),
          React.createElement(AuthInputArea, {
            clientkey: this.state.clientkey,
            deviceid: this.state.deviceid,
            setRemoconAppState: this.handleSetRemoconAppState
          }),
          React.createElement(MessageInputArea, {
            message: this.state.message,
            setRemoconAppState: this.handleSetRemoconAppState
          }),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-primary",
              onClick: this.handlePostMessages },
            "Post"
          )
        )
      )
    );
  }
});

//認証情報入力パーツ
var AuthInputArea = React.createClass({
  displayName: "AuthInputArea",

  propTypes: {
    clientkey: React.PropTypes.string,
    deviceid: React.PropTypes.string,
    setRemoconAppState: React.PropTypes.func.isRequired
  },
  handleChange: function (event) {
    var clientkeyValue = React.findDOMNode(this.refs.clientkey).value;
    this.props.setRemoconAppState({ clientkey: clientkeyValue });

    var deviceidValue = React.findDOMNode(this.refs.deviceid).value;
    this.props.setRemoconAppState({ deviceid: deviceidValue });
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { className: "col-lg-2 control-label" },
          "clientkey:"
        ),
        React.createElement(
          "div",
          { className: "col-lg-10" },
          React.createElement("input", { className: "form-control", type: "text", ref: "clientkey",
            value: this.props.clientkey, onChange: this.handleChange })
        )
      ),
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { className: "col-lg-2 control-label" },
          "deviceid:"
        ),
        React.createElement(
          "div",
          { className: "col-lg-10" },
          React.createElement("input", { className: "col-lg-10 form-control", type: "text", ref: "deviceid",
            value: this.props.deviceid, onChange: this.handleChange })
        )
      )
    );
  }
});

//赤外線信号入力パーツ
var MessageInputArea = React.createClass({
  displayName: "MessageInputArea",

  propTypes: {
    message: React.PropTypes.string,
    setRemoconAppState: React.PropTypes.func.isRequired
  },
  handleChange: function (event) {
    var messageValue = React.findDOMNode(this.refs.message).value;
    this.props.setRemoconAppState({ message: messageValue });
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { className: "col-lg-2 control-label" },
        "message:"
      ),
      React.createElement(
        "div",
        { className: "col-lg-10" },
        React.createElement("textarea", { className: "form-control", rows: "3",
          ref: "message",
          value: this.props.message, onChange: this.handleChange })
      )
    );
  }
});

React.render(React.createElement(PostMessageBox, null), document.getElementById('app'));