import React, {Component} from "react";
import {ScrollView, Text, View, FlatList , Modal , Button, StyleSheet} from "react-native";
import {Card, Icon , Input , Rating ,AirbnbRating} from "react-native-elements";
import {baseUrl} from "../shared/baseUrl";
import {connect} from "react-redux";
import {postFavorite} from "../redux/ActionCreators"
import {postComment} from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable"

const mapStateToProps = state=> {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish  (props) {

    const dish = props.dish;

    if(dish != null)
    {   return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
        <Card
            featuredTitle={dish.name}
            image={{uri: baseUrl + dish.image}}>
            <Text style={{margin: 10}}>{dish.description}</Text>
            <View  style={
                {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Icon name={ props.favorite ? "heart" : "heart-o"  }
                      raised
                      reverse
                      type="font-awesome"
                      color="#f50"
                      onPress={() => props.favorite ? console.log("already favored") : props.onPress()}
                />
                <Icon name={"pencil"}
                      raised
                      reverse
                      type="font-awesome"
                      color="#512DA8"
                      onPress={() => props.toggle()}
                />
            </View>
        </Card>
        </Animatable.View>
    );}
    else {
      return (<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000} useNativeDriver={true}>
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleComment:false,
            author:String,
            comment:String,
            rating:5,
        };
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    addComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleComment()
    }

    toggleComment() {
        this.setState({toggleComment:!this.state.toggleComment})
    }

    resetState() {
        this.setState({author:"" , comment:""})
    }

    render() {

        const dishId = this.props.route.params.dishId;

        return (
            <ScrollView>
                <RenderDish
                    dish = {this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} toggle={() => this.toggleComment()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId )} />
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.toggleComment}
                    onDismiss={() => this.toggleComment()}
                    onRequestClose={() => this.toggleComment()}
                >
                    <View>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={60}
                            showRating
                            defaultRating = {5}
                            onFinishRating={(rating => this.setState({rating:rating}))}
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{type:"font-awesome" , name:"user-o"}}
                            onChangeText={(text => this.setState({author:text}))}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{type:"font-awesome" , name:"comment-o"}}
                            onChangeText={(text => this.setState({comment:text}))}
                        />
                        <Button
                            title="Submit"
                            onPress={()=> {this.addComment(dishId) }}
                        />
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 50
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);