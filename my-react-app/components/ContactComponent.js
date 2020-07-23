import React, {Component} from "react";
import { Text } from "react-native"
import {Card , Button , Icon} from "react-native-elements";
import * as Animatable from "react-native-animatable"
import * as MailComposer from "expo-mail-composer"



class RenderContact extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients:["sihawi8294@qlenw.com"],
            subject:"Enquiry",
            body:"To whom it may concern"
        })
    }

    render() {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
                    <Card
                title="Contact Information"
                    >
                        <Text>
                            121, Clear Water Bay Road
                            Clear Water Bay, Kowloon
                            HONG KONG
                            Tel: +852 1234 5678
                            Fax: +852 8765 4321
                            Email:confusion@food.net
                        </Text>
                        <Button
                        title="Send email"
                        icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
                        onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View>
            )
        }
}


export default RenderContact;
