import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Row, Col, Alert, Spin, Card, Layout, Menu, Icon } from 'antd';

import QueryForm from './components/QueryForm';
import LineChart from './components/LineChart';

const { Content } = Layout;

const App = props => (
  <Layout style={{ minHeight: '100vh' }}>
    <Menu defaultSelectedKeys={['1']} mode="horizontal">
      <Menu.Item key="1">
        <Icon type="pie-chart" />
        <span>Dashboard</span>
      </Menu.Item>
    </Menu>
    <Content>
      <Row>
        <Col span={24}>
          <Card bordered={false}>
            <QueryForm {...props} />
          </Card>
        </Col>
      </Row>
      <Spin spinning={props.fetching}>
        {props.data &&
          <Row>
            <Col md={12}>
              <LineChart
                id="bountyStatesChart"
                title="Bounty States"
                data={[{
                  name: 'Draft',
                  data: props.data.bountyDraft
                }, {
                  name: 'Active',
                  data: props.data.bountyActive
                }, {
                  name: 'Completed',
                  data: props.data.bountyCompleted
                }, {
                  name: 'Expired',
                  data: props.data.bountyExpired
                }, {
                  name: 'Dead',
                  data: props.data.bountyDead
                }]}
              />
            </Col>
            <Col md={12}>
              <LineChart
                id="rateChart"
                title="Fulfill Rate"
                data={[{
                  name: 'Fulfillment Acceptance Rate',
                  data: props.data.fulfillmentAcceptanceRate
                }, {
                  name: 'Bounty Fulfilled Rate',
                  data: props.data.bountyFulfilledRate
                }, {
                  name: 'Avg Fulfiller Acceptance Rate',
                  data: props.data.avgFulfillerAcceptanceRate
                }]}
              />
            </Col>
            <Col md={12}>
              <LineChart
                id="fulfillments"
                title="Fulfillments"
                subtitle="These values are not cumulative (independent day to day)"
                data={[{
                  name: 'Fulfillments Submitted',
                  data: props.data.fulfillmentsSubmitted
                }, {
                  name: 'Fulfillments Accepted',
                  data: props.data.fulfillmentsAccepted
                }]}
              />
            </Col>
            <Col md={12}>
              <LineChart
                id="fulfillmentsCum"
                title="Fulfillments Cumulative"
                subtitle="These values are cumulative over time"
                data={[{
                  name: 'Fulfillments Submitted',
                  data: props.data.fulfillmentsSubmittedCum
                }, {
                  name: 'Fulfillments Accepted',
                  data: props.data.fulfillmentsAcceptedCum
                }]}
              />
            </Col>
            <Col md={12}>
              <LineChart
                id="bountiesIssued"
                title="Bounties Issued"
                subtitle="These values are not cumulative (independent day to day)"
                data={[{
                  name: 'Bounties Issued',
                  data: props.data.bountiesIssued
                }]}
              />
            </Col>
            <Col md={12}>
              <LineChart
                id="bountiesIssuedCum"
                title="Bounties Issued Cumulative"
                subtitle="These values are cumulative over time"
                data={[{
                  name: 'Bounties Issued',
                  data: props.data.bountiesIssuedCum
                }]}
              />
            </Col>
          </Row>
        }
        {props.error &&
          <Alert
            message="Something went wrong"
            description="Fetching data error"
            type="error"
          />}
      </Spin>
    </Content>
  </Layout>
);

const mapStateToProps = state => ({
  fetching: state.fetching,
  data: state.data,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  onQuery: (schema, range) => dispatch({ type: 'API_CALL_REQUEST', schema, range })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
