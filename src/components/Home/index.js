import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    restaurantsData: [],
    apiStatus: apiStatusConstants.initial,
    cart: [],
    activeMenuId: 0,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    console.log(url, 'url')
    const response = await fetch(url)
    console.log(response, 'response')
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        restaurantsData: fetchedData[0],
        activeMenuId: fetchedData[0].table_menu_list[0].menu_category_id,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = isDarkTheme => {
    const errorImageURL = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <div>
        <img alt="failure view" src={errorImageURL} />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble completing your request. Please try again.
        </p>
        <button type="button" onClick={this.getRestaurantDetails}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderRestaurantsListView = () => {
    const {restaurantsData, cart, activeMenuId} = this.state
    return <>FETCHED THE DATA SUCCESSFULLY</>
  }

  renderRestaurantData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderRestaurantData()}</div>
  }
}

export default Home
