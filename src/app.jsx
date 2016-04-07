(function(){
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
  handleSetParentState: function(state) {
    this.setState(state);
  },
  render: function() {
    return (
      <div className="well bs-component">
      <form className="form-horizontal">
        <fieldset>
          <legend>POST /messages</legend>
          <p className="read">赤外線信号を送ります。</p>
          <InputArea
          clientkey={this.state.clientkey}
          deviceid={this.state.deviceid}
          message={this.state.message}
          setParentState={this.handleSetParentState}
          />
          <PostButton
          clientkey={this.state.clientkey}
          deviceid={this.state.deviceid}
          message={this.state.message}
          />
        </fieldset>
      </form>
      </div>
    );
  }
});

//入力パーツ
var InputArea = React.createClass({
  propTypes:{
    clientkey: React.PropTypes.string.isRequired,
    deviceid: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    setParentState: React.PropTypes.func.isRequired
  },
  handleChange: function(e) {
    this.props.setParentState({
      clientkey: React.findDOMNode(this.refs.clientkey).value,
      deviceid: React.findDOMNode(this.refs.deviceid).value,
      message: React.findDOMNode(this.refs.message).value
    });
  },
  render: function(){
    return (
      <div>
        <div className="form-group col-lg-12">
         <label className="control-label">clientkey:</label>
         <input className="form-control" type="text" ref="clientkey"
         value={this.props.clientkey} onChange={this.handleChange} />
        </div>
        <div className="form-group col-lg-12">
         <label className="control-label">deviceid:</label>
         <input className="form-control" type="text" ref="deviceid"
         value={this.props.deviceid} onChange={this.handleChange} />
        </div>
        <div className="form-group col-lg-12">
          <label className="control-label">message:</label>
          <textarea className="form-control" rows="3"
          ref="message"
          value={this.props.message} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
});

//Postボタン
var PostButton = React.createClass({
  propTypes:{
    clientkey: React.PropTypes.string.isRequired,
    deviceid: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired
  },
  handlePost: function(){
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
      success: function(data){
       alert( "完了！");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
       alert( "エラー");
      }
    });
  },
  render : function(){
    return (
      <button type="button" className="btn btn-primary"
      onClick={this.handlePost}>Post</button>
    );
  }
});

React.render(<PostMessageBox />, document.getElementById('app'));

})();
