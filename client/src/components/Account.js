import React, {Component} from 'react';
import {Icon, Typography, Avatar, message, Upload, Row, Col} from 'antd';


const {Title} = Typography;
  function getBase64 (img,callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
  }

  function beforeUpload (file) {
    const isJPG = file.type === 'image/jpeg';
    if(!isJPG){
      message.error('You can only upload a JPG/jpeg file.');
    }

    const isLt2M = file.size / 1024 /1024 < 2;
    if(!isLt2M) {
      message.error('Image must be smaller than 2MB');
    }
    return isJPG && isLt2M;
  }
class Account extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      user: {
        name: "Andrew Washburn",
        profilePicLink: "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/p160x160/13344686_1782719515290750_5895247083997579600_n.jpg?_nc_cat=107&_nc_ht=scontent-iad3-1.xx&oh=595759942d5da7ee9f88edfbd5941849&oe=5D51BE81"
      }
    }
  }

  handleChange = info => {
    if(info.file.status === 'uploading'){
      this.setState({loading: true})
      return;
    }
    if(info.file.status === 'done'){
      getBase64(info.file.originFileObj, imageUrl => 
        this.setState({imageUrl, loading: false}) 
        )
    }
  }

  render(){
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl;
    return(
      <div>
        <Title>Your Account</Title>
        <Row align="middle">
          <Col span={3} offset={3}>
            <Avatar style={{width: 100, height: 100, display: 'inline-block'}} src={this.state.user.profilePicLink} />
          </Col>
          <Col span={9}>
            <div className="account-names">
              <Title level={3} >{this.state.user.name}</Title>
              <Title level={4} style={{}} type="secondary">@Awash227</Title>
            </div>
          </Col>

        </Row>

      </div>
    )
  }
} 

export default Account;