import React, { Component } from 'react'

import './mine.css'

import MCard from '../mCard'
import NoData from '../../../share/noData'
import Topbar from '../topbar'

import api from 'dashboard/api/index'
import notification from 'components/Notification'

class Mine extends Component {
  state = {
    plugins: []
  }

  render () {
    const { plugins } = this.state
    return (
      <div className='dash-mine plugin-list'>
        <Topbar />
        {plugins.length ? plugins.map(plugin => <MCard key={plugin.id} {...plugin} />) : <NoData />}
      </div>
    )
  }

  componentDidMount () {
    api.getMyPlugin().then((res) => {
      if (res.code === 0) {
        this.setState({ plugins: res.data })
      } else {
        notification.error({
          description: res.msg || res.message
        })
      }
    })
  }
}

export default Mine
