import AuthReducers from './components/Auth/AuthReducers'
import ProjectsReducers from './components/Projects/ProjectsReducers'
import HolidaysReducers from './components/Holidays/HolidaysReducers'
import LeavesReducers from './components/Leaves/LeavesReducers'
import TasksReducers from './components/Tasks/TasksReducers'
import ProfileReducers from './components/Profile/ProfileReducers'
import DashboardReducers from './components/Dashboard/DashboardReducers'
import PolicyReducers from './components/Policies/PolicyReducers'
import InterviewReducers from './components/Interviews/InterviewReducers'
import {persistCombineReducers} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const config = {
  key: 'root',
  whitelist: ['TasksReducers'],
  storage: AsyncStorage,
}

const rootReducer = persistCombineReducers(config, {
  AuthReducers,
  ProjectsReducers,
  HolidaysReducers,
  LeavesReducers,
  TasksReducers,
  InterviewReducers,
  ProfileReducers,
  DashboardReducers,
  PolicyReducers,
})

export default rootReducer
