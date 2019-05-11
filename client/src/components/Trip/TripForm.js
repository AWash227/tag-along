import React, { Component } from "react";
import {
  Form,
  Steps,
  Input,
  Button,
  InputNumber,
  TimePicker,
  DatePicker,
  Icon,
  Checkbox,
  List,
  Popover,
  Typography,
  Layout,
  Collapse,
  message
} from "antd";

const Step = Steps.Step;
const { Title, Paragraph } = Typography;
const Panel = Collapse.Panel;

const AddressForm = () => {
  return (
    <Collapse>
    
      <Panel header="(Optional) Add Address">
        <Form.Item>
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Address 2" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Address 3" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="City" />
        </Form.Item>
        .
        <Form.Item>
          <Input placeholder="Subdivision (CA, VA , etc.)" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Postal code" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Country code (US, CA, etc.)" />
        </Form.Item>
      </Panel>
    </Collapse>
  );
};

const DateForm = () => {
  return (
    <div>
      <Form.Item label="Start date:">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Start time:">
        <TimePicker />
      </Form.Item>
    </div>
  );
};

const PropertyForm = () => {
  return (
    <div>
      <Form.Item label="How many seats do you have available? (Enter '0' if you don't have a vehicle)">
        <InputNumber />
      </Form.Item>
      <Form.Item label="What is the recommended donation for trip attendees?">
        <InputNumber />
      </Form.Item>
      <Form.Item label="What location should everyone meet at? (This is private to the Trip attendees)">
        <Input placeholder="Meeting location..." />
      </Form.Item>
    </div>
  );
};

const LocationForm = () => {
  return (
    <div>
      <Form.Item label="Enter your First Location">
        <Input placeholder="First location..." />
      </Form.Item>
      <Form.Item label="Enter the address for this location.">
        <AddressForm />
      </Form.Item>
      <Form.Item label="Enter your Second Location">
        <Input placeholder="Second location..." />
      </Form.Item>
      <Form.Item label="Enter the address for this location.">
        <AddressForm />
      </Form.Item>
    </div>
  );
};

const steps = [
  {
    content: <LocationForm />
  },
  {
    content: <DateForm />
  },
  {
    content: <PropertyForm />
  }
];

export default class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div id="surround-form">
        <Title>Create a New Trip</Title>
        <Paragraph>
          <b>Make it awesome</b>, invite your friends!
        </Paragraph>
        <br />
        <Layout style={{ backgroundColor: "#fff" }}>
          <Layout.Sider
            className="steps"
            theme="light"
            width="20px"
            style={{ marginRight: 5 }}
          >
            <Steps
              style={{ float: "left" }}
              direction="vertical"
              size="small"
              progressDot
              current={current}
            >
              {steps.map(item => (
                <Step key={item} />
              ))}
            </Steps>
          </Layout.Sider>
          <div className="steps-content">
            <Form>
              {steps[current].content}

              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button onClick={() => message.success("Trip added.")}>
                    Finish
                  </Button>
                )}
              </div>
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </Form>
          </div>
        </Layout>
      </div>
    );
  }
}
