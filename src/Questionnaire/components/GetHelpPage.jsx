import React from 'react';
import PageTemplate from '../../common/components/PageTemplate';

class GetHelpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thankyou: false };

    this.onClickOK = this.onClickOK.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  onClickOK() {
    this.setState({ thankyou: true });
  }
  render() {
    let content;
    if(this.state.thankyou == true) {
      content = <div>Thank you!</div>
    } else {
      content = (
        <div>
          <h3>Please contact one of the therapists:</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="radio">
                  <label>
                    <input type="radio" name="therapist" defaultChecked={true}/>Lauren Carson
                  </label>
                </div>
              </li>
              <li className="list-group-item">
                <div className="radio">
                  <label>
                    <input type="radio" name="therapist"/>
                    Jordan Warden
                  </label>
                </div>
              </li>
              <li className="list-group-item">
                <div className="radio">
                  <label>
                    <input type="radio" name="therapist"/>Stephanie Orly
                  </label>
                </div>
              </li>
            </ul>
            <button className="btn btn-primary" onClick={this.onClickOK}>OK!</button>
          </div>
        );
    }
    return (
      <PageTemplate>
        {content}
      </PageTemplate>
    )
  }
};

export default GetHelpPage;