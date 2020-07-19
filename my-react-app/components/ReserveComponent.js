import React , {Component} from "react"
import {View , Text , ScrollView, Picker , StyleSheet, Button , Switch , Modal} from "react-native";
import DatePicker from "react-native-datepicker";
import {Card} from "react-native-elements";


class Reserve extends Component{

    constructor(props) {
        super(props);
        this.state = {
            smoking: false,
            date:"",
            guests:1,
            showModal:false
        }
    }

    resetForm() {
        this.setState({smoking:false , date:"" , guests:1});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        return (
            <ScrollView>

                <View style={styles.formContainer}>
                    <Text style={styles.fromLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.fromLabel}>Smoking/Non-smoking ?</Text>
                    <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor="#512DA8"
                    onValueChange={(value => this.setState({smoking: value}))}
                    ></Switch>
                </View>
                <View style={styles.formContainer}>
                    <Text>Please pick a date.</Text>
                    <DatePicker
                    style={{flex:2 , marginRight:20}}
                    date={this.state.date}
                    format=""
                    placeholder="Please select a date"
                    minDate="2020-07-17"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={ {
                        dateIcon: {
                            position:"absolute",
                            left:0,
                            top:4,
                            marginLeft:0
                        },
                        dateInput:{
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({date:date})}}
                    ></DatePicker>
                </View>
                <View style={styles.formContainer}>
                    <Button
                        onPress={() => this.toggleModal()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => this.toggleModal()}
                onRequestClose={() => this.toggleModal()}
                >
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Number of guests: {this.state.guests}</Text>
                    <Text style={styles.modalText}>Smoking: {this.state.smoking ? "Yes" : "No"}</Text>
                    <Text style={styles.modalText}>Date: {this.state.date}</Text>
                    <Button title="Close" onPress={() => {this.toggleModal();this.resetForm()} } color="#512DA8"></Button>
                </View>
                </Modal>
            </ScrollView>

        );
    }

}
const styles = StyleSheet.create (
    {

        formContainer : {
            flexDirection:"row",
            flex:1,
            alignItems:"center",
            justifyContent:"center",
            margin:20
        },

    fromLabel: {
        flex:2,
        fontSize:18
    },

    formItem: {
            flex:1,
    },
        modal:{justifyContent: 'center',
            margin: 20},
        modalTitle:{ fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: '#512DA8',
            textAlign: 'center',
            color: 'white',
            marginBottom: 20},
        modalText:{ fontSize: 18,
            margin: 10}
    }
);


export default Reserve;
