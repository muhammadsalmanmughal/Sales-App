import React from 'react'
import { Layout, Menu} from 'antd';
import routes from '../../config/Route/routes'
import { Link } from 'react-router-dom';
const SideBar = () => {
    const {Sider } = Layout;


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" >
                    {
                        routes.map((link, index) => {
                            return <Menu.Item key={index} >
                                <Link to={`/home${link.path}`}>{link.name}</Link>
                            </Menu.Item>
                        })
                    }
                </Menu>
            </Sider>
        </Layout>

    )
}
export default SideBar