import React from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import sampleFishes from '../sample-fishes';
import Fish from './fish';
import base from '../base';

class App extends React.Component {
  constructor(){
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // initial state or getInitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

//using lifescycle methods with Firebase to keep component consistent with database and to prevent date from changing on refresh.
  componentWillMount(){
    //this runs right before <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
      context: this,
      state: 'fishes'
    })

    //CHECK if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      //update our App components order state
      this.setState({
        order:JSON.parse(localStorageRef)
      })

    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);

  }

  //using localstorage instead of firebase to update database

  componentWillUpdate(nextProps, nextState){
    console.log('something changed');
    console.log({nextProps, nextState});
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

//Crud
  addFish(fish){
    //1) update our state
    // this.state.fishes.fish1 = fish;
    const fishes = {
      ...this.state.fishes
    };
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //2) set state
    this.setState({fishes: fishes})
  }

  //crUd
  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  //cruD
  removeFish(key){
    const fishes = {...this.state.fishes};
    // delete fishes[key];
    //bc of firebase we have to do it the way we do below instead:
    fishes[key] = null;
    this.setState({fishes});
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes,
    })
  }

  addToOrder(key){
    //take a copy of the state
    const order = {...this.state.order}; //object spread is ...
    //update or add the new number of fish ordered
    //order.fish1 =
    order[key] = order[key] + 1 || 1;
    //update our state
    this.setState({ order });
  }

//cruD - after writing this, hook it up to a button.
  removeFromOrder(key){
    const order = {...this.state.order};
    //this time we can use 'delete' because we arent using firebase, everythign was stored in local storage for order.
    delete order[key];
    this.setState({ order });
  }

  //.map line, key = {key} is for react, index = {key} is for me to get that information.
  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {
            Object
            .keys(this.state.fishes)
            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
          }
        </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.params.storeId}
          />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
}

export default App;

//state is always attached to app component...the parent of all three components.
