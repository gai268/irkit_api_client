(function () {
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
    handleSetParentState: function (state) {
      this.setState(state);
    },
    render: function () {
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
            React.createElement(InputArea, {
              clientkey: this.state.clientkey,
              deviceid: this.state.deviceid,
              message: this.state.message,
              setParentState: this.handleSetParentState
            }),
            React.createElement(PostButton, {
              clientkey: this.state.clientkey,
              deviceid: this.state.deviceid,
              message: this.state.message
            })
          )
        )
      );
    }
  });

  //入力パーツ
  var InputArea = React.createClass({
    displayName: "InputArea",

    propTypes: {
      clientkey: React.PropTypes.string.isRequired,
      deviceid: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired,
      setParentState: React.PropTypes.func.isRequired
    },
    handleChange: function (e) {
      this.props.setParentState({
        clientkey: React.findDOMNode(this.refs.clientkey).value,
        deviceid: React.findDOMNode(this.refs.deviceid).value,
        message: React.findDOMNode(this.refs.message).value
      });
    },
    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "form-group col-lg-12" },
          React.createElement(
            "label",
            { className: "control-label" },
            "clientkey:"
          ),
          React.createElement("input", { className: "form-control", type: "text", ref: "clientkey",
            value: this.props.clientkey, onChange: this.handleChange })
        ),
        React.createElement(
          "div",
          { className: "form-group col-lg-12" },
          React.createElement(
            "label",
            { className: "control-label" },
            "deviceid:"
          ),
          React.createElement("input", { className: "form-control", type: "text", ref: "deviceid",
            value: this.props.deviceid, onChange: this.handleChange })
        ),
        React.createElement(
          "div",
          { className: "form-group col-lg-12" },
          React.createElement(
            "label",
            { className: "control-label" },
            "message:"
          ),
          React.createElement("textarea", { className: "form-control", rows: "3",
            ref: "message",
            value: this.props.message, onChange: this.handleChange })
        )
      );
    }
  });

  //Postボタン
  var PostButton = React.createClass({
    displayName: "PostButton",

    propTypes: {
      clientkey: React.PropTypes.string.isRequired,
      deviceid: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired
    },
    handlePost: function () {
      var postData = {
        clientkey: this.props.clientkey,
        deviceid: this.props.deviceid,
        message: this.props.message
      };
      localStorage.setItem("PostMessageBox_state", JSON.stringify(postData));
      $.ajax({
        type: "POST",
        url: "https://api.getirkit.com/1/messages",
        data: postData,
        success: function (data) {
          alert("完了！");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("エラー");
        }
      });
    },
    render: function () {
      return React.createElement(
        "button",
        { type: "button", className: "btn btn-primary",
          onClick: this.handlePost },
        "Post"
      );
    }
  });

  React.render(React.createElement(PostMessageBox, null), document.getElementById('app'));
})();