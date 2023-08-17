import React, { useState } from 'react'
import NavBar from './NavBar';
import ViewList from './ViewList';
import { useParams } from 'react-router-dom';







const ContentBox = () => {
  let { id } = useParams();
  if (!id) {
    id = 0;
  }
  const [categories, setCategories] = useState([
    { id: 1, title: '자바'},
    { id: 2, title: 'HTML' },
    { id: 3, title: 'JavaScript' },
    { id: 4, title: 'JSP' },
    { id: 5, title: 'React' },
    { id: 6, title: 'Spring' },
    { id: 7, title: 'Database' }
  ]);

  const value = { categories, setCategories };


  return (
    <div className='contentBox'>
      <NavBar categories={categories} />
      <ViewList value={value} id={id} />
    </div>
  )
}

export default ContentBox