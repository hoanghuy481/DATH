import React , { Component } from 'react';


class NotFoundPage extends Component {
    render(){
        return (
            <section className="page-section cta">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <div className="cta-inner text-center rounded">
                                <h2 className="section-heading mb-5">
                                    Oops! That page can’t be found.
                                </h2>
                                <p className="address mb-5">
                                    It looks like nothing was found at this location. Maybe try a search?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          );
    }
}

export default NotFoundPage;

