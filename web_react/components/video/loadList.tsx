import { List, message, Spin, Card, Avatar } from "antd"
import axios from 'axios'



import { WindowScroller, AutoSizer, InfiniteLoader, List as VList, Grid } from 'react-virtualized'
import React from "react";
import { VideoSection } from "./videoSection";
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export class LoadList extends React.Component<{ list: any[] }> {
    state = {
        data: this.props.list,
        loading: false,
        limit:'unlimited',
        loadedRowsMap :{}
    };

    

   



    handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {

        let { data ,loadedRowsMap} = this.state;
        this.setState({
            loading: true,
        });
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            loadedRowsMap[i] = 1;
        }
        this.setState({loadedRowsMap})
        if (data.length >=100) {
            message.warning('Virtualized List loaded all');
            this.setState({
                loading: false,
                limit:''
            });
         
            return
        }
        return axios.get(fakeDataUrl).then((res) => {
            for (let i = startIndex; i <= stopIndex; i++) {
        
                // 1 means loading
                loadedRowsMap[i] = 2;
            }
            data = data.concat(res.data.results)
            this.setState({ data, loading: false })
        })
    };

    isRowLoaded = ({ index }) =>this.state.limit=='unlimited'? !!this.state.data[index]:true;



      
    renderCell = ({ columnIndex, // Horizontal (column) index of cell

        key, // Unique key within array of cells
        rowIndex, // Vertical (row) index of cell
        style }) => {
        const item = this.state.data[rowIndex * 4 + columnIndex]
        return (
            <div style={{...style,margin:"2vw"}}><VideoSection /></div>
        )
    }

    render() {
        let innerWidth,innerHeight;
        if (typeof window === "object"){
            innerWidth=window.innerWidth;
            innerHeight=window.innerHeight;
        }
        const { data } = this.state;
        const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => {
            const numberOfBoxesPerRow = Math.floor(width / (innerWidth*0.27))
            const rowCount = Math.ceil(data.length / numberOfBoxesPerRow)
            const _onSectionRendered= ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex })=> {
                const startIndex = rowStartIndex * numberOfBoxesPerRow + columnStartIndex
                const stopIndex = rowStopIndex * numberOfBoxesPerRow + columnStopIndex
            
                onRowsRendered({
                  startIndex,
                  stopIndex
                })
              }
            return (

                <Grid
                    role="video list"
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                     overscanRowCount={2}
                    columnWidth={innerWidth*0.25}
                    columnCount={numberOfBoxesPerRow}
                    rowCount={rowCount}
                    cellRenderer={this.renderCell}
                    rowHeight={innerHeight*0.4}
                    onSectionRendered={_onSectionRendered}
                   
                    onRowsRendered={onRowsRendered}
                    scrollTop={scrollTop}
                    width={width}
                />
            )
        }
        const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
            <AutoSizer disableHeight  >
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
                rowCount={height}

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

                <List style={{width:"85vw"}}>
                    {data.length > 0 && <WindowScroller >{infiniteLoader}</WindowScroller>}
                </List>
                {this.state.loading && <Spin style={{
                    position: "absolute", zIndex: 999,
                    bottom: "-200px",
                    left: "50%"
                }} />}


            </>
        );
    }
}

