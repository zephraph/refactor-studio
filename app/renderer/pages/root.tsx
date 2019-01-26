import * as React from 'react'
import { Layout, Steps } from 'antd'
import { RepositorySelector } from '../components/RepositorySelector'

const { Content, Sider } = Layout
const { Step } = Steps

export default () => (
  <Layout>
    <Sider width={230} style={{ background: '#fff', padding: '20px' }}>
      <Steps direction='vertical' size='small' current={0}>
        <Step title='Select Repositories' />
        <Step title='In Progress' />
        <Step title='Waiting' />
      </Steps>
    </Sider>
    <Content style={{ padding: '20px' }}>
      <h1>Hello world</h1>
      <RepositorySelector />
    </Content>
  </Layout>
)
