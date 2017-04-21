import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {



  goToStore(event){
    event.preventDefault();
    console.log("you changed the url");
    //First grab text from box
    console.log(this.storeInput.value);
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    //Second transition from '/' to '/store/:storeid'
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    // return <p>Every single component you build you have to always include a render method</p>
    // return React.createElement('p', {className: 'testing'}, 'I love you')

    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      {/*this is a comment*/}
        <h2>Please enter a store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}}/>
        <button type="submit"> Visit Store </button>
      </form>
    )
  }

}//every single component you build, you have to always include a render method.

//Context below: once you add router in, if you go to react console in the browser, and search for storepicker, you will see Context added. 4 methods are listed, we will use transitionto.
StorePicker.contextTypes = {
  router: React.PropTypes.object
}


export default StorePicker;
