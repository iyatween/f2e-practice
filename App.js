import React from 'react';

class SayHello extends React.Component {
  render() {
    const userData = this.props.userData;
    return (
      <div>Hello {userData.myID}</div>
    );
  }
}

class UserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myID: '' };
  }
  componentDidMount() {
    fetch('https://httpbin.org/uuid')
      .then(response => response.json())
      .then(data => this.setState({ myID: data.uuid }));
  }
  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}

function withUserData(Component) {
  return class extends React.Component {
    render() {
      return (
        <UserData render={userData => (
          <Component userData={userData} />
        )}/>
      );
    }
  }
}

const App = withUserData(SayHello);
export default App;