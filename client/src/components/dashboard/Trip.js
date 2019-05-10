import React, { Component } from "react";
import { Card, Icon, Avatar, Typography, Carousel } from "antd";

const { Title } = Typography;
const { Paragraph } = Typography;

/*
  title,
  startDate,
  endDate,
  description,
  avatar,


*/
class Trip extends Component {
  render() {
    return (
      <Card
        style={{ marginBottom: -3, minWidth: 320, maxHeight: 640}}
        cover={ <Carousel accessibility lazyLoad adaptiveHeight draggable>
                  <img style={{objectFit: 'contain'}} src="https://i.redd.it/o44ksh3c2mtz.jpg"/>
                  <img style={{objectFit: 'cover'}} src="https://i.pinimg.com/736x/bc/61/cf/bc61cfbf3fedb53cf2a179810d20818e--virginia-tech-hokies-tech-tech.jpg" />
                </Carousel>
              }
            actions={[[<Icon key={1} type="car" />, " 4"], [<Icon key={2} type="dollar" />, " 4.00"]]}
        title={
          <Card.Meta
            title={
              <Paragraph
                style={{ marginTop: 5, marginBottom: 0, fontSize: 12 }}
              >
                Trip with: <b>{this.props.owner || "Andrew Washburn"}</b> and <b>{3} others</b>
              </Paragraph>
            }
            avatar={
              <Avatar
                style={{marginRight: -6}}
                size={30}
                src={this.props.avatar || "data:image/png;base64, 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"}
              />
            }
          />
        }
        extra={<Icon type="ellipsis" />}
        hoverable
      >
        <Card.Meta
          title={[
            <Title key={1} level={3} style={{marginBottom: 0}}>
              {this.props.title || "Virginia Tech"}
            </Title>,
            <Paragraph key={2} style={{ fontSize: 14 }}>
              {this.props.startDate + " - " + this.props.endDate}
            </Paragraph>
          ]}
          description={
            <Paragraph>
              {this.props.description || 
              "Looking for anyone interested in going to Virginia Tech from August 23 - August 24"
              }
            </Paragraph>
          }
        />
      </Card>
    );
  }
}

export default Trip;
