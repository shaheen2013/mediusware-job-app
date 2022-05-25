import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Colors} from "react-native-ui-lib";

const VirtualizedList = ({children,refreshing,onRefresh}) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    colors={[Colors.blue]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
            }
            data={[]}
            keyExtractor={() => "key"}
            renderItem={null}
            ListHeaderComponent={
                <>{children}</>
            }
        />
    )
}
export default  VirtualizedList;