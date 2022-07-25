import {Layout, Menu, Breadcrumb, Card, BackTop, List, Statistic, Skeleton, Select, Button} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';

import 'antd/dist/antd.css';
const {Header, Content, Footer} = Layout;

const CustomLayout = ({children}) => {
  const router = useRouter();
  const {pathname} = router;
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout>
        <Header style={{padding: 0}}>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[pathname]}>
            <Menu.Item key='/'>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/downloader'>
              <Link href='/downloader'>
                <a>mp3 download</a>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key='3'>nav 3</Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{margin: '0 16px'}}>
          <>
            <BackTop />
            {children}
          </>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
