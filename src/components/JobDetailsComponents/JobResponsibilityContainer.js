import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import JobResponsibility from "./JobResponsibility";
import {FlatList, ScrollView} from "react-native";
import JobResponsibilityBulletPoint from "./JobResponsiblityBulletPoint";

const allResandRequire =
    {
        responsibilites:[
            {id:'101',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {id:'102',text:'Lorem ipsum dolor  adipiscing elit.'},
            {id:'103',text:'Lorem ipsum dolor sit amet, consectetur  elit.'},
            {id:'104',text:'Lorem sit amet, consectetur adipiscing elit.'},
            {id:'105',text:'Lorem ipsum amet, consectetur adipiscing elit.'},
        ],
        requirements:[
            {id:'101',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {id:'102',text:'Lorem ipsum dolor  adipiscing elit.'},
            {id:'103',text:'Lorem ipsum dolor sit amet, consectetur  elit.'},
            {id:'104',text:'Lorem sit amet, consectetur adipiscing elit.'},
            {id:'105',text:'Lorem ipsum amet, consectetur adipiscing elit.'},
        ],
        additionalResponsibilites:[
            {id:'101',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {id:'102',text:'Lorem ipsum dolor  adipiscing elit.'},
            {id:'103',text:'Lorem ipsum dolor sit amet, consectetur  elit.'},
            {id:'104',text:'Lorem sit amet, consectetur adipiscing elit.'},
            {id:'105',text:'Lorem ipsum amet, consectetur adipiscing elit.'},
        ]
    }

const JobResponsibilityContainer = () => {
    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={allResandRequire}
                keyExtractor={item => item}
                renderItem={({item}) => {
                    console.log(item)
                    return <View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={item.responsibilites} title={"Job Responsibilites"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={item.requirements} title={"Experience Requirements"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={item.additionalResponsibilites} title={"Job Responsibilites"}/>
                        </View>
                    </View>

                }}/>
            {/*<ScrollView>


            </ScrollView>*/}
        </View>
    );
};

export default JobResponsibilityContainer;
