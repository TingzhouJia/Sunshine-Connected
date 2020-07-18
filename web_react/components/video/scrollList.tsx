import { List, message, Avatar, Spin } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import Axios from 'axios';
import { useState } from 'react';
import { VideoSection } from './videoSection';
import { TFunction } from 'next-i18next';




const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export const ScrollList:React.FC<{list:any[],t:TFunction}>=({list,t})=>{

    const [loading, setloading] = useState(false)
    const [data, setdata] = useState(list)
    const [hasMore, sethasMore] = useState(true)
    const fetchData = callback => {
        Axios.get(fakeDataUrl).then(res=>callback(res))
      };
    
     const handleInfiniteOnLoad = () => {
        setloading(true)
        if (data.length > 40) {
          message.warning('Infinite List loaded all');
          sethasMore(false)
          setloading(false)
          return;
        }
        fetchData(res => {
          let datas = data.concat(res.data.results);
          setdata(datas)
          setloading(false)
        });
      };
   return (
    <InfiniteScroll
    initialLoad={false}
    pageStart={0}
    loadMore={handleInfiniteOnLoad}
    hasMore={!loading && hasMore}
    useWindow={false}
  >
    <List
    grid={{xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 3,}}
      dataSource={data}
      renderItem={(item:any) => (
        <List.Item key={item.id}>
          <VideoSection/>
        </List.Item>
      )}
    >
      {loading && hasMore && (
        <div style={{position:"absolute",bottom:"40px",width:"100%",textAlign:"center"}}>
          <Spin  />
        </div>
      )}
    </List>
  </InfiniteScroll>
   )
}