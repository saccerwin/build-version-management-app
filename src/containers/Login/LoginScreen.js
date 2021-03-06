import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Easing,
  Animated,
  SafeAreaView,
  Button,
  AsyncStorage,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo'
import { EvilIcons } from '@expo/vector-icons'

import { NavigationHeader } from '../../components/Navigation'
import { LayoutUtils } from '../../utils'
import { Images } from '../../utils'
import { TextInputCustom as TextInput } from '../../components/Input'
import { PrimaryButton, TextButton, EntryButton } from '../../components/Button'
import { loginRequest, registerRequest } from '../Auth/actions';
import styles from './styles'

const marginTop = LayoutUtils.getExtraTop()

class LoginScreenClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ``,
      email: ``,
      password: ``,
      secureTextEntry: true,
      currentTab: 'sign_in', // or sign_up
    }
  }

  signIn = () => {
    const { signIn, loading } = this.props

    if (!loading) {
      const { email, password } = this.state
      signIn(email, password)  
    }
  }

  signUp = () => {
    console.log('REQUEST_CLICK')
    const { loading, signUp } = this.props

    if (!loading) {
      const { username, email, password } = this.state
      signUp(username, email, password)
    }
  }

  changeTab = (tab) => this.setState({ currentTab: tab })

  spinnerIcon = () => (
    <EvilIcons
      name="spinner-3"
      size={26}
      color="white"
    />
  )

  renderSignIn = () => {
    const { secureTextEntry, email, password } = this.state
    const { loading } = this.props
    const imageIcon = this.spinnerIcon()

    return (
      <View style={styles.mainInput}>
        <TextInput
          label='Email'
          value={email}
          onChange={(email) => this.setState({email})}
          />
        <TextInput
          label='Password'
          secureTextEntry={secureTextEntry}
          value={password}
          onChange={(password) => this.setState({password})}
        />
        <View style={styles.bottom}>
          <PrimaryButton
            raised={true}
            primary={true}
            upperCase={true}
            onPress={this.signIn}
            text='Sign In'
            icon={loading ? imageIcon : ''}
          />
          <TextButton upperCase={false} text='Forgot Password?'/>
        </View>
      </View>
    )
  }

  renderSignUp = () => {
    const { username, email, password, secureTextEntry } = this.state
    const { loading } = this.props
    const imageIcon = this.spinnerIcon()

    return (
      <View style={styles.mainInput}>
        <TextInput
          label='Name'
          value={username}
          onChange={(username) => this.setState({ username })}
        />
        <TextInput
          label='Email'
          value={email}
          onChange={(email) => this.setState({ email })}
        />
        <TextInput
          label='Password'
          value={password}
          onChange={(password) => this.setState({ password })}
          secureTextEntry={secureTextEntry}
        />
        <View style={styles.bottom}>
          <PrimaryButton
            raised={true}
            primary={true}
            upperCase={true}
            onPress={this.signUp}
            text='Sign Up'
            icon={loading ? imageIcon : ''}
          />
          <TextButton upperCase={false} text='Term and privacy'/>
        </View>
      </View>
    )
  }

  render() {
    const { currentTab } = this.state
    const { goBack } = this.props
    const isSignInTab = currentTab === 'sign_in' // false => sign_up

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(7,46,89,0.8)', 'transparent']}
          start={[0, 0]}
          end={[1, 1]}
          location={[0.25, 0.6, 1]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
        <StatusBar barStyle='light-content' />
        <NavigationHeader
          style={{ marginTop: marginTop + 20 }}
          headerItem={{
            title: `Join With Us`,
            icon: null,
            button: Images.closeButton
          }}
          action={goBack}
        />
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.logo}>
            <Image
              resizeMode={'contain'}
              style={styles.logoIcon}
              source={Images.logo}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.inputContent}>
              <View style={styles.top}>
                <EntryButton text='Sign Up' onPress={() => this.changeTab('sign_up')} isActive={!isSignInTab} />
                <EntryButton text='Sign In' onPress={() => this.changeTab('sign_in')} isActive={isSignInTab} />
              </View>
              {isSignInTab ? this.renderSignIn() : this.renderSignUp()}
            </View>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const loading = state.auth.get('loading')
  return {
    loading,
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch({ type: 'GO_BACK' }),
  signIn: (email, password) => dispatch(loginRequest({ email, password })),
  signUp: (username, email, password) => dispatch(registerRequest({ username, email, password })),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const LoginScreen = compose(
  withConnect,
)(LoginScreenClass)

export { LoginScreen };
