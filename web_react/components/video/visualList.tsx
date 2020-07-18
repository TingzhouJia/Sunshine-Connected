import { List, message, Spin, Card, Avatar } from "antd"
import axios from 'axios'



import {WindowScroller,AutoSizer,InfiniteLoader,List as VList,Grid} from 'react-virtualized'
import React from "react";


export const VideoList=()=>{

}



const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export class VirtualizedExample extends React.Component<{list:any[]}> {
  state = {
    data: this.props.list,
    loading: false,
  };

  loadedRowsMap = {};



  handleInfiniteOnLoad = ({ startIndex, stopIndex })=> {
    
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 100) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: false,
      });
      return
    }
    return axios.get(fakeDataUrl).then((res)=>{
        data=data.concat(res.data.results)
        this.setState({data,loading:false})
    }) 
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    
    const { data } = this.state;
    const item = data[index];
    return (
        <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.name?item.name.last:'aaa'}</a>}
          description={item.email}
        />
        <div>Content</div>
      </List.Item>
    );
  };
  renderCell=({  columnIndex, // Horizontal (column) index of cell
 
    key, // Unique key within array of cells
    rowIndex, // Vertical (row) index of cell
    style})=>{
        const item=this.state.data[rowIndex*4+columnIndex]
    return (
        <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{'aaa'}</a>}
          description={'aaa'}
        />
        <div>Content</div>
      </List.Item>
    )
  }

  render() {
    const { data } = this.state;
    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
        <VList
        role="video list"
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        
        rowCount={data.length}
       
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight >
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
        
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
          })
        }
      </InfiniteLoader>
    );
    return (
      <>
      {data.length}
      <List  >
        {data.length > 0 && <WindowScroller >{infiniteLoader}</WindowScroller>}
        {this.state.loading && <Spin style={{ position: "absolute",zIndex:999,
  bottom: "-200px",
  left: "50%"}} />}
      </List>

      </>
    );
  }
}


