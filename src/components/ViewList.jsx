import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewList = ({ value, id }) => {
  const [list, setList] = useState([]);

  // 전체 카테고리 데이터를 받아서 value.categories 에 저장해둠
  useEffect(() => {
    (async () => {
      let newCategories = [...value.categories];
      try {
        const url = "https://dapi.kakao.com/v3/search/book?target=title&size=50";
        const apiKey = 'e57c9c9417d45aebeaa8cfde960782d2';
        const header = {
          headers: {
            Authorization: `KakaoAK ${apiKey}`
          }
        };
        for (let i = 0; i < newCategories.length; i++) {
          const query = '&query=' + newCategories[i].title;
          const response = await axios.get(url + query, header);
          newCategories = newCategories.map(p => p.id === i + 1 ? { ...p, datas: response.data.documents } : p);
        }
      } catch (error) {
        console.log(error);
      }
      value.setCategories(newCategories);
    })();
  }, [])


  useEffect(() => {
    // id가 바뀔때마다 실행하지만 id가 1~8이 아니라면 아무것도 하지않음
    if (!(id > 0 && id < 8)) return;
    // 만약 value.categories 에 저장된값이 있다면 해당값을 사용 // 없다면 새로 데이터를 로드함
    if (value.categories[id - 1].datas) {
      setList(value.categories[id - 1].datas)
    }
    else {
      (async () => {
        console.log('데이터로드');
        try {
          const url = "https://dapi.kakao.com/v3/search/book?target=title&size=50";
          const apiKey = 'e57c9c9417d45aebeaa8cfde960782d2';
          const header = {
            headers: {
              Authorization: `KakaoAK ${apiKey}`
            }
          };
          const query = '&query=' + value.categories[id - 1].title;
          const response = await axios.get(url + query, header);
          console.log(response)
          setList(response.data.documents);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id])

  return (
    <ul>
      {list.map(p => <li key={p.isbn}>
        <div className='listBox'>
          <a href={p.url}>
            <img src={p.thumbnail} alt="상세링크"></img>
          </a>
          <div className='info'>
            <div><a href={p.url}>책이름 : {p.title}</a></div>
            <div><span>출판사 : {p.publisher}</span>가격 : {p.sale_price}원 ({p.price}원)</div>
            <div>책소개 : {p.contents}</div>
          </div>
        </div>
      </li>)}
    </ul>
  )
}

export default ViewList