import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native'
import LeaveCard from './LeaveCard'
import RequestedLeaveCard from './RequestedLeaveCard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Config} from '../../common'
import {connect} from 'react-redux'
import {fetchLeaves} from './LeavesActions'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)
class LeavesScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  })

  state = {
    scrollY: new Animated.Value(0),
    activeTab: 'myleaves',
  }

  componentDidMount() {
    this.fetchLeaves()
  }

  fetchLeaves = async () => {
    const {navigation} = this.props
    await this.props.fetchLeaves(navigation)
  }

  renderLeavesView = ({item, index}) => {
    const {navigation} = this.props

    return <LeaveCard key={item.id} leave={item} navigation={navigation} />
  }

  renderRequestedLeaves = ({item, index}) => {
    const {navigation} = this.props

    return (
      <RequestedLeaveCard key={item.id} leave={item} navigation={navigation} />
    )
  }

  render() {
    const {navigation, state} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.tabsWrapper}>
          <TouchableOpacity
            onPress={() => this.setState({activeTab: 'myleaves'})}
            style={
              this.state.activeTab === 'myleaves'
                ? styles.activeTab
                : styles.tab
            }>
            <Text
              style={
                this.state.activeTab === 'myleaves'
                  ? styles.activeTabTitle
                  : styles.tabTitle
              }>
              My
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({activeTab: 'requestedleaves'})}
            style={
              this.state.activeTab === 'requestedleaves'
                ? styles.activeTab
                : styles.tab
            }>
            <Text
              style={
                this.state.activeTab === 'requestedleaves'
                  ? styles.activeTabTitle
                  : styles.tabTitle
              }>
              Assigned
            </Text>
          </TouchableOpacity>
        </View>
        {state.leaves && this.state.activeTab === 'myleaves' && (
          <AnimatedListView
            data={state.leaves.my_leaves}
            keyExtractor={(item, index) => `leave-${item.id} || ${index}`}
            renderItem={this.renderLeavesView}
            refreshing={state.isLoading}
            refreshControl={
              <RefreshControl
                refreshing={state.isLoading}
                onRefresh={() => this.fetchLeaves()}
              />
            }
            ListEmptyComponent={
              <View style={styles.noLeaves}>
                <Text>No Leaves Requested.</Text>
              </View>
            }
          />
        )}
        {state.leaves && this.state.activeTab === 'requestedleaves' && (
          <AnimatedListView
            data={state.leaves.requested_leaves}
            keyExtractor={(item, index) => `leave-${item.id} || ${index}`}
            renderItem={this.renderRequestedLeaves}
            refreshing={state.isLoading}
            refreshControl={
              <RefreshControl
                refreshing={state.isLoading}
                onRefresh={() => this.fetchLeaves()}
              />
            }
            ListEmptyComponent={
              <View style={styles.noLeaves}>
                <Text>No Leaves Assigned.</Text>
              </View>
            }
          />
        )}

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('RequestLeave')}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Config.backgroundColor},
  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Config.primayColor,
    padding: 20,
    borderRadius: 50,
    elevation: 5,
  },
  noLeaves: {
    margin: 20,
  },
  tabsWrapper: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-around',
    elevation: 0.5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 15,
  },
  tab: {
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 5,
  },
  activeTab: {
    padding: 15,
    backgroundColor: Config.primayColor,
    flex: 1,
    borderRadius: 5,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
    textTransform: 'uppercase',
  },
  activeTabTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
})

const mapStateToProps = state => {
  return {
    state: state.LeavesReducers,
  }
}

export default connect(mapStateToProps, {fetchLeaves})(LeavesScreen)
