import React, { useRef, useState } from 'react'
import GetApi from '../API/GetApi';
import { useInfoContext } from '../Context/UseInfoContext';
import "./Style.scss"
import { Carousel } from 'antd';
import SiderLayout from './SiderLayout';



const Home = () => {
  const {  } = useInfoContext();

  return (
    <div className="movies-list">
      <h1>Otabek</h1>
    </div>
  );
};

export default Home;
