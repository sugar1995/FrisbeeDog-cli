import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKSpinner
} from 'react-native-material-kit';
import ActionSheet from 'react-native-actionsheet';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../container/NavigationBar.js';
import DeviceInfo from 'react-native-device-info';
import Drawer from 'react-native-drawer';
import * as Animatable from 'react-native-animatable';
import ControlPanel from './ControlPanel.js';
import styles from '../../stylesheet.js';

const FlatButton = MKButton.flatButton()
  .withShadowAniEnabled(false)
  .withStyle({
    flex: 1,
    height: 50,
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  })
  .build();

const RaisedButtonReceive = MKButton.coloredButton()
  .withBackgroundColor('#74c948')
  .withStyle({
    margin: 10,
    flex: 1,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

const RaisedButtonSend = MKButton.coloredButton()
  .withBackgroundColor('#3c97e9')
  .withStyle({
    margin: 10,
    flex: 1,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

const PlainButton = MKButton.plainFab()
  .withStyle({
    alignSelf: 'center',
  })
  .build();

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisplaySuggestion: true,
    }
  }

  componentDidMount() {
    console.log(DeviceInfo.getUniqueID());
  }

  handlePressQrScanner() {
    console.log('clicked');
  }

  handleActionSheet(i) {
    console.log(">>>> you select: " + i);
  }

  render() {
    return(
      <Drawer ref={(ref) => this._drawer = ref}
        content={<ControlPanel />}
        type='overlay'
        tapToClose={true}
        openDrawerOffset={0.5}
        side={'right'}
        tweenHandler={Drawer.tweenPresets.material}
        onClose={
          () => {
            console.log('close');
          }
        }>

        <View style={{flex: 1}}>
          <NavigationBar lItemImage='logo'
            rItemImage='md-menu'
            rItemTappedCallback={
              () => {
                this._drawer.open()
              }
            } />
          <ScrollView>
            {
              this.state.isDisplaySuggestion ?
              <Animatable.View style={styles1.infoWnd}
                ref='suggestion'
                /*animation="fadeOutUp"*/>
                <View style={styles1.suggestionBox1}>
                  <Image source={require('../../assets/images/green_shield.png')}
                    style={{width: 27, height: 27}}/>
                  <Text style={styles1.suggestionText}>Need an unlock gesture?</Text>
                </View>
                <View style={styles1.suggestionBox2}>
                  <FlatButton
                    onPress={() => {
                      this.refs.suggestion.fadeOut(1000).then((endState) => {
                        if (endState.finished) {
                          this.setState({
                            isDisplaySuggestion: false,
                          })
                        }
                      });
                    }}>
                    <Text pointerEvents="none"
                      style={{color: '#3188c9', fontSize: 16, fontWeight: 'bold'}}>
                        No, thanks
                    </Text>
                  </FlatButton>
                  <FlatButton
                    onPress={() => {
                      this.refs.suggestion.fadeOut(1000).then((endState) => {
                        if (endState.finished) {
                          this.setState({
                            isDisplaySuggestion: false,
                          })
                        }
                      });
                    }}>
                    <Text pointerEvents="none"
                      style={{color: '#3188c9', fontSize: 16, fontWeight: 'bold'}}>
                        Go ahead
                    </Text>
                  </FlatButton>
                </View>
              </Animatable.View> : null
            }
            <View style={styles1.transferwnd}>
              <View style={styles1.row1}>
                <Text style={styles1.title}>Transfer</Text>
                <Text style={styles1.description}>input or scan target address:</Text>
              </View>
              <View style={styles1.row1}>
                <TextInput style={styles1.inputbox1}
                  placeholder={'Address'}
                  onChangeText={() => {

                  }}
                />
                <TouchableOpacity style={{position: 'absolute', right: 20, top: 17, backgroundColor: '#fff'}}
                  onPress={this.handlePressQrScanner}>
                  <Icon name={'md-qr-scanner'} size={25} color='#ddd' />
                </TouchableOpacity>
              </View>
              <View style={styles1.row2}>
                <TextInput style={styles1.inputbox2}
                  placeholder={'Amount'}
                  onChangeText={() => {

                  }}
                />
                <TextInput style={styles1.inputbox2}
                  editable={false}
                  value={"0.001"}
                  onChangeText={() => {

                  }}
                />
              </View>
              <View style={styles1.row2}>
                <RaisedButtonReceive
                  onPress={() => {
                    console.log('hi');
                  }}>
                  <Text pointerEvents="none"
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                      Receive
                  </Text>
                </RaisedButtonReceive>
                <RaisedButtonSend
                  onPress={() => {
                    console.log('hi');
                  }}>
                  <Text pointerEvents="none"
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                      Send
                  </Text>
                </RaisedButtonSend>
              </View>
            </View>
            <View style={styles.outline}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#999'}}>Addresses</Text>
              <TouchableOpacity>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#e0482f'}}>see all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressbox}>

            </View>
            <PlainButton
              onPress={() => {
                this.ActionSheet.show();
              }}>
              <Image pointerEvents="none" source={require('../../assets/images/plus.png')} />
            </PlainButton>
          </ScrollView>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Add another address'}
            options={['Cancel', 'import from my account', 'create address']}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
            onPress={this.handleActionSheet}
          />
        </View>
      </Drawer>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  infoWnd: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginBottom: 16,
    width: width,
    height: 100,
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#f5f5f5',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  suggestionBox1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  suggestionText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999'
  },
  suggestionBox2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  transferwnd: {
    backgroundColor: '#f49422',
    marginTop: 0,
    marginBottom: 10,
    width: width,
    height: 240,
    flex: 1,
    flexDirection: 'column',
  },
  row1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b5b6a'
  },
  description: {
    fontSize: 14,
    color: '#3188c9'
  },
  inputbox1: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 20,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
  inputbox2: {
    backgroundColor: '#fff',
    flex: 1,
    width: width / 2.0 - 20,
    height: 40,
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 40,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
});
