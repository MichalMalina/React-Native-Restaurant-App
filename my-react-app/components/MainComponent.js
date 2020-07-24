import React, {Component} from "react";
import Menu from './MenuComponent';
import Dishdetail from "./DishdetailComponent";
import Reserve from "./ReserveComponent"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import {Card, Icon} from "react-native-elements";
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import Home from "./HomeComponent";
import RenderContact from "./ContactComponent";
import Favorites from "./FavoriteComponent";
import AboutUs from "./AboutUsComponent";
import  Login from "./LoginComponent";
import {connect} from "react-redux";
import {fetchComments , fetchDishes , fetchLeaders , fetchPromos } from "../redux/ActionCreators";
import registerRootComponent from "expo/build/launch/registerRootComponent";

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos:() => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchComments: ()=> dispatch(fetchComments())
});

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"
    }
};


const IconOptions = (props) => {
    return(
        <Icon name="menu"
              size={24}
              color="white"
              onPress={() => props.navigation.toggleDrawer()}/>
    );
};

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={({navigation}) => ({
                    headerLeft: () => <IconOptions navigation={navigation}/>
                })}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                option={{headerTitle: "Dish Detail"}}
            />
        </MenuNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
            initialRouteName = "Menu"
            screenOptions = {HeaderOptions}
         >
            <ContactNavigator.Screen
                name ="Contact"
                component = {RenderContact}
                options = {({navigation}) => ({headerLeft: () => <IconOptions navigation={navigation}/>})}
            />
        </ContactNavigator.Navigator>
    );
}

const FavoriteNavigator = createStackNavigator();
function FavoriteNavigatorScreen() {
    return(
        <FavoriteNavigator.Navigator
            initialRouteName = "Menu"
            screenOptions = {HeaderOptions}
        >
            <FavoriteNavigator.Screen
                name ="Favorites"
                component = {Favorites}
                options = {({navigation}) => ({headerLeft: () => <IconOptions navigation={navigation}/>})}
            />
        </FavoriteNavigator.Navigator>
    );
}

const ReserveNavigator = createStackNavigator();
function ReserveNavigatorScreen() {
    return(
        <ReserveNavigator.Navigator
            initialRouteName = "Menu"
            screenOptions = {HeaderOptions}
        >
            <ReserveNavigator.Screen
                name ="Reserve"
                component = {Reserve}
                options = {({navigation}) => ({headerLeft: () => <IconOptions navigation={navigation}/>})}
            />
        </ReserveNavigator.Navigator>
    );
}

const LoginNavigator = createStackNavigator();
function LoginNavigatorScreen() {
    return(
        <LoginNavigator.Navigator
            initialRouteName = "Menu"
            screenOptions = {HeaderOptions}
        >
            <LoginNavigator.Screen
                name ="Login"
                component = {Login}
                options = {({navigation}) => ({headerLeft: () => <IconOptions navigation={navigation}/>})}
            />
        </LoginNavigator.Navigator>
    );
}

const AboutUsNavigator = createStackNavigator();
function AboutUsNavigatorScreen() {
    return(
        <AboutUsNavigator.Navigator
            initialRouteName = "Menu"
            screenOptions = {HeaderOptions}
        >
            <AboutUsNavigator.Screen
                name ="About Us"
                component = {AboutUs}
                options = {({navigation}) => ({headerLeft:() => <IconOptions navigation={navigation}/>})}
            />
      </AboutUsNavigator.Navigator>
         );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options = {({navigation}) => ({headerLeft: () => <IconOptions navigation={navigation}/>})}
            />
        </HomeNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image
                    source={require('./images/logo.png')}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);


const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor:'#D1C4E9'
            }}
            drawerContent = {props => <CustomDrawerContentComponent {...props}/>}
        >
            <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} options = {{drawerIcon: ({tintColor}) => (
                <Icon name="home"
                      type="font-awesome"
                      size={24}
                      color={tintColor}
                />
                ) }} />
            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} options={{drawerIcon: ({tintColor})=> (
                <Icon name="list"
                      type="font-awesome"
                      size={24}
                      color={tintColor} />
                ) }}
            />
            <MainNavigator.Screen name="Contact" component={ContactNavigatorScreen} options={{drawerIcon: ({tintColor}) => (
                <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                color={tintColor}
                />
                )}}/>
            <MainNavigator.Screen name = "About us" component={AboutUsNavigatorScreen} options={{drawerIcon: ({tintColor}) =>
                <Icon name="info-circle"
                      type="font-awesome"
                      size={24}
                      color={tintColor}
                />
            }}/>
            <ReserveNavigator.Screen name = "Reserve" component={ReserveNavigatorScreen} options={{drawerIcon: ({tintColor}) =>
                    <Icon name="cutlery"
                          type="font-awesome"
                          size={24}
                          color={tintColor}
                    />
            }}/>
            <FavoriteNavigator.Screen name = "Favorites" component={FavoriteNavigatorScreen} options={{drawerIcon: ({tintColor}) =>
                    <Icon name="heart"
                          type="font-awesome"
                          size={24}
                          color={tintColor}
                    />
            }}/>
            <LoginNavigator.Screen name = "Login" component={LoginNavigatorScreen} options={{drawerIcon: ({tintColor}) =>
                    <Icon name="sign-in"
                          type="font-awesome"
                          size={24}
                          color={tintColor}
                    />
            }}/>
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchPromos();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchDishes();
    }


    render() {

        return(
            <NavigationContainer>
                <MainNavigatorDrawer/>
            </NavigationContainer>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});
registerRootComponent(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);
