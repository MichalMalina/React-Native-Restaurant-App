import React, {Component} from "react";
import {Animated, Easing, Text, View ,} from "react-native";
import {Card} from "react-native-elements";
import {connect} from "react-redux"
import {baseUrl} from "../shared/baseUrl";
import Loading from "./LoadingComponent";




const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
};


function RenderCard(props) {

    const item = props.item;

    if (props.isLoading) {
        return(
            <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    else {

        if (item != null) {
            return (<Card
                ffeaturedTitle={item.name}
                featuredSubtitle={item.designation}
                image={{uri: baseUrl + item.image}}
            >
                <Text
                    style={{margin: 10}}
                >{item.description}</Text>

            </Card>)


        } else {
            return (<View></View>)
        }
    }
}



class Home extends Component{
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate()
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue:8,
                duration:8000,
                easing:Easing.linear,
                useNativeDriver: true
            }
        ).start(() =>this.animate())
    }


    render() {
        const x1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const x2 = this.animatedValue.interpolate({
            inputRange:[0, 2, 4, 6, 8],
            outputRange:[1200, 600, 0, -600, -1200]
        });

        const x3 = this.animatedValue.interpolate({
            inputRange:[0, 3, 5, 7, 8],
            outputRange:[1200, 600, 0, -600, -1200]
        });


        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Animated.View style={{ width: '100%', transform: [{translateX: x1}]}}>
                    <RenderCard item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                                isLoading={this.props.dishes.isLoading}
                                erreMess={this.props.dishes.errMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%',  transform: [{translateX: x2}]}}>
                    <RenderCard item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                                isLoading={this.props.promotions.isLoading}
                                erreMess={this.props.promotions.errMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%',  transform: [{translateX: x3}]}}>
                    <RenderCard item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                                isLoading={this.props.leaders.isLoading}
                                erreMess={this.props.leaders.errMess}
                    />
                </Animated.View>
            </View>

        );
    }

}


export default connect(mapStateToProps)(Home);
