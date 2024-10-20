import React, { useEffect } from 'react';
import { useInfoContext } from '../Context/UseInfoContext';
import axios from 'axios';

const getUsers = () => {
  const getUser = axios.get('http://api.osonishtop.uz/api/v1/ann-discounts/read?10=1&page=1&annTypesId=12')
  console.log(getUser);
}

getUsers()

const GetApi = () => {
  const { setMovies } = useInfoContext();


  useEffect(() => {

  }, []);

  return null;
};

export default GetApi;
