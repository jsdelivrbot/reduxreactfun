import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';


class Inventory extends React.Component{

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user })
      }
    })
  }

 //crUd
  handleChange(e, key){
    const fish = this.props.fishes[key];

    //copy the fish and then update it with new data. (...fish is how you copy), e.target.name - is the property we are updating, and e.target.value is what we are updating. this is called a computed property.
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
     }

    // console.log(e.target.name, e.target.value);
    // console.log(updatedFish);
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider){
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  logout(){
    base.unauth();
    this.setState({
      uid: null
    })
  }

  authHandler(err, authData){
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    //grab the store information..base.database connects us to firebase
    const storeRef = base.database().ref(this.props.storeId);

    //query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      //claim it as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    });
  }

  renderLogin(){
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate("github")}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate("facebook")}>Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate("twitter")}>Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key){
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>

      <select type="text" name="status" value={fish.value} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold out!</option>
      </select>

        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>

          <button onClick={(e) => this.props.removeFish(key)}> Remove Fish</button>
      </div>
    )
  }

  render(){
    const logout = <button onClick={this.logout}>Log Out</button>

    //check if they are or arent logged in - if they arent then this function checks if there is a user id, and if no then it renders the login.
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    //Next, once they are logged in - Check if they are the owner of the current store:
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you arent the owner of the store</p>
          {logout}
        </div>
      )
    }

    return(
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;
