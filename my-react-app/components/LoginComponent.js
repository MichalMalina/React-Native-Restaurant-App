import React, {Component} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {Icon , Input , CheckBox} from "react-native-elements";
import * as SecureStore from "expo-secure-store";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            remember: false
        }
    }

    componentDidMount() {
       SecureStore.getItemAsync("userinfo").then((userdata) => {
           let userinfo = JSON.parse(userdata);
           if(userinfo) {
               this.setState({username: userinfo.username});
               this.setState({password: userinfo.password});
               this.setState({remember: true})
           }
       })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync("userinfo" , JSON.stringify({username:this.state.username , password:this.state.password}))
                .catch((error) => console.log("Could not save user info" , error));}
            else {SecureStore.deleteItemAsync("userinfo")
            .catch((error) => console.log("Could not delete user info", error));
            }
        }


    render() {
        return (
            <View style={styles.container}>
                   <Input
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={(text) => this.setState({username:text})}
                        leftIcon={{type:"font-awesome" , name:"user-o"}}
                        inputContainerStyle={styles.formInput}
                   />
                   <Input
                        placeholder="password"
                        value={this.state.password}
                        onChangeText = {(text) => this.setState({password:text})}
                        leftIcon={{type:"font-awesome" , name:"key"}}
                        inputContainerStyle={styles.formInput}
                   />
                   <CheckBox
                       checked={this.state.remember}
                       center
                       onPress={() => this.setState({remember: !this.state.remember})}
                       containerStyle={styles.formCheckbox}
                   />
                  <View style={styles.formButton}>
                        <Button
                            title="Login"
                            onPress={() => this.handleLogin()}
                            color="#512DA8"
                        />
                  </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin:40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;
