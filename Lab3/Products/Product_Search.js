import {useState} from 'react';

const Product_Search = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  let filePath = 'https://dummyjson.com/products';

  const searchProduct = () => {
    if (value != '') filePath = 'https://dummyjson.com/products';
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        ReadableStreamDefaultReader(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
};
