import moment from 'moment'
import * as Yup from 'yup'

export const AddWorkLogSchema = Yup.object().shape({
  project_id: Yup.number().required('Project field is required').nullable(),
  task_id: Yup.number().required('Task field is required').nullable(),
  tracked_date: Yup.string().required('Date field is required'),
  note: Yup.string().required('Please provide the note'),
  hours: Yup.number().required('Hours field is required'),
  minutes: Yup.number().required('Minutes field is required'),
})

export const AddExtraLogSchema = Yup.object().shape({
  project_id: Yup.number().test({
    name: 'valid-project',
    message: 'Project field is required',
    test: function (value) {
      return value
    },
  }),
  task_id: Yup.number().test({
    name: 'valid-project',
    message: 'Task field is required',
    test: function (value) {
      return value
    },
  }),
  tracked_date: Yup.string().required('Date field is required'),
  note: Yup.string().required('Please provide the note'),
  start_time: Yup.string().required('Start time field is required'),
  end_time: Yup.string()
    .test('is-greater', 'End time should be greater', function (value) {
      const {start_time} = this.parent
      if (start_time && value) {
        return !moment(value, 'HH:mm').isSameOrBefore(
          moment(start_time, 'HH:mm')
        )
      }
      return true
    })
    .required('End time field is required'),
  request_to: Yup.number().test({
    name: 'valid-project',
    message: 'Requested to field is required',
    test: function (value) {
      return value
    },
  }),
})
