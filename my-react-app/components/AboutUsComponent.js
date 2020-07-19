import React, {Component} from "react";
import {ScrollView,View , FlatList} from "react-native";
import {Card, ListItem , Text} from "react-native-elements";
import {connect} from "react-redux"
import {baseUrl} from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = state => {
    return {
       leaders: state.leaders,

    };
};


function RenderHistory(props) {
    return (
        <Card title="Our History">
            <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.

                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>

    )
}

class AboutUs extends Component {

    render() {



       const RenderLeaders = ({item , index}) => {
         return (
             <ListItem
         title = {item.name}
         key = {index}
         subtitle={item.description}
         hideChevron = {true}
         leftAvatar={{source: {uri: baseUrl + item.image}}}
         ></ListItem>
         )
       };

        if (this.props.leaders.isLoading)
        {
            return (
                <ScrollView>
                    <RenderHistory/>
                    <Card title={"Corporate Leadership"}>
                        <Loading/>
                    </Card>
                </ScrollView>
            )
        }
        else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <RenderHistory/>
                    <Card title={"Corporate Leadership"}>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            )
        }
        else {
        return (
            <ScrollView>
                <RenderHistory/>
                <Card title={"Corporate Leadership"}>
                    <FlatList data={this.props.leaders.leaders} renderItem={RenderLeaders} keyExtractor={item => item.id.toString()}></FlatList>
                </Card>
            </ScrollView>

        );
        }
    }
}

export default connect(mapStateToProps)(AboutUs);
