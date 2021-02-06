import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

function MainNavigation() {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };
    // const activePath = useLocation().pathname
    const links = [
        {
            // to: '/request-for-quataion',
            name: 'Request For Quataion'
        },
        {
            // to: '/dashboard',
            name: 'Dashboard'
        }
    ]
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible setCollapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    {
                        links.map((link, index) => {
                            return (
                                <Menu.Item key={index} name={link.name} />

                            )
                        })
                    }
                </Menu>
            </Sider>
        </Layout>
    )
}
export default MainNavigation