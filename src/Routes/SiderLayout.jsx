import { Breadcrumb, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Ads, Ann, Areas, Discounts, JobCategories, JobTypes, Regions, Types } from './';
// import Quiz from './Quiz';  // Importing new pages
// import Star from './Star';  // Importing new pages

const SiderLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const texts = [
        {
            key: 1,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/types'>Types</Link>,  // Route for Star
        },
        {
            key: 2,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/regions'>Regions</Link>,  // Route for Star
        },

        {
            key: 3,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/areas'>Areas</Link>,  // Route for Star
        },

        {
            key: 4,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/jobTypes'>JobTypes</Link>,  // Route for Star
        },

        {
            key: 5,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/jobCategories'>Job Categories</Link>,  // Route for Star
        },

        {
            key: 6,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/ads'>Ads</Link>,  // Route for Star
        },

        {
            key: 7,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  
            label: <Link to='/types'>Types</Link>,  // Route for Star
        },

        {
            key: 8,
            icon: <i className="fa-solid fa-star ant-menu-item-icon"></i>,  // Changed icon to represent Star
            label: <Link to='/discounts'>Discounts</Link>,  // Route for Star
        },

    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
                <h1 style={{ fontSize: "30px", padding: "40px 0" }} className='text-center'>Admin Panel</h1>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    {texts.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: "white" }} >

                </Header>
                <Content
                    className="site-layout"
                    style={{ margin: '30px 20px', padding: 24, minHeight: 280, borderRadius: "20px " }}
                >
                    {/* Content will change based on the route */}
                    <Routes>
                        <Route path='/types' element={<Types />} />   {/* Display Quiz component */}
                        <Route path='/regions' element={<Regions />} />
                        <Route path='/areas' element={<Areas />} />
                        <Route path='/jobTypes' element={<JobTypes />} />
                        <Route path='/jobCategories' element={<JobCategories />} />
                        <Route path='/ann' element={<Ann />} />
                        <Route path='/ads' element={<Ads />} />
                        <Route path='/discounts' element={<Discounts />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SiderLayout;
