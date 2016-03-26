//POST/messagesフォーム
var PostMessageBox = React.createClass({
  getInitialState() {
    var state = JSON.parse(localStorage.getItem("PostMessageBox_state"));
    if(!state){
      state = {};
    }
    return {
      clientkey: state.hasOwnProperty('clientkey') ? state.clientkey : "",
      deviceid: state.hasOwnProperty('deviceid') ? state.deviceid : "",
      message: state.hasOwnProperty('message') ? state.message : ""
    };
  },
  handleSetRemoconAppState: function(state) {
    this.setState(state);
  },
  handlePostMessages: function(){
    localStorage.setItem("PostMessageBox_state", JSON.stringify(this.state));
    $.ajax({
      type: "POST",
      url: "https://api.getirkit.com/1/messages",
      data: {
        clientkey: this.state.clientkey,
        deviceid: this.state.deviceid,
        message: this.state.message
      },
      success: function(data){
       alert( "完了！");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
       alert( "エラー");
      }
    });
  },
  render: function() {
    return (
      <div className="well bs-component">
      <form className="form-horizontal">
        <fieldset>
          <legend>POST /messages</legend>
          <p className="read">赤外線信号を送ります。</p>
          <AuthInputArea
          clientkey={this.state.clientkey}
          deviceid={this.state.deviceid}
          setRemoconAppState={this.handleSetRemoconAppState}
          />
          <MessageInputArea
          message={this.state.message}
          setRemoconAppState={this.handleSetRemoconAppState}
          />
          <button type="button" className="btn btn-primary"
          onClick={this.handlePostMessages}>Post</button>
        </fieldset>
      </form>
      </div>
    );
  }
});

//認証情報入力パーツ
var AuthInputArea = React.createClass({
  propTypes:{
    clientkey: React.PropTypes.string,
    deviceid: React.PropTypes.string,
    setRemoconAppState: React.PropTypes.func.isRequired
  },
  handleChange: function(event) {
    var clientkeyValue = React.findDOMNode(this.refs.clientkey).value;
    this.props.setRemoconAppState({clientkey: clientkeyValue});

    var deviceidValue = React.findDOMNode(this.refs.deviceid).value;
    this.props.setRemoconAppState({deviceid: deviceidValue});
  },
  render: function(){
    return (
      <div>
       <div className="form-group">
         <label className="col-lg-2 control-label">clientkey:</label>
         <div className="col-lg-10">
           <input className="form-control" type="text" ref="clientkey"
           value={this.props.clientkey} onChange={this.handleChange} />
         </div>
       </div>
       <div className="form-group">
         <label className="col-lg-2 control-label">deviceid:</label>
         <div className="col-lg-10">
           <input className="col-lg-10 form-control" type="text" ref="deviceid"
           value={this.props.deviceid} onChange={this.handleChange} />
         </div>
       </div>
      </div>
    );
  }
});

//赤外線信号入力パーツ
var MessageInputArea = React.createClass({
  propTypes:{
    message: React.PropTypes.string,
    setRemoconAppState: React.PropTypes.func.isRequired
  },
  handleChange: function(event) {
    var messageValue = React.findDOMNode(this.refs.message).value;
    this.props.setRemoconAppState({message: messageValue});
  },
  render: function(){
    return (
      <div className="form-group">
        <label className="col-lg-2 control-label">message:</label>
        <div className="col-lg-10">
          <textarea className="form-control" rows="3"
          ref="message"
          value={this.props.message} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
})

React.render(<PostMessageBox />, document.getElementById('app'));
