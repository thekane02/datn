import React, { Component } from "react";
import { connect } from "react-redux";

import "./MedicalFacility.scss";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

import * as ReactDOM from "react-dom";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic({ limit: 4 });
    if (res && res.data) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (e, clinic) => {
    e.preventDefault();
    window.location = `/detail-clinic/${clinic.id}`;
  };
  handleSeeMoreMedicalFacility = (e) => {
    e.preventDefault();
    window.location = `/list-medical-facility`;
  };

  handleLoadMore = async () => {
    let total = this.state.dataClinics.length + 4;
    let res = await getAllClinic({ limit: total });
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  };

  render() {
    let { dataClinics } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div className="section-share section-medical-facility">
            <div className="section-container">
              <div className="section-header">
                <span className="title-section">
                  <FormattedMessage id="homepage.outstanding-medical-facility" />
                </span>
                <button
                  className="btn-section"
                  onClick={(e) => this.handleSeeMoreMedicalFacility(e)}
                >
                  <FormattedMessage id="homepage.more-infor" />
                </button>
              </div>

              <div className="row">
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div className="col-lg-3 col-auto my-10">
                        <div
                          className="card-bs-custom pointer"
                          onClick={(e) => this.handleViewDetailClinic(e, item)}
                        >
                          <figure
                            className="bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                          ></figure>
                          <div className="card-body">
                            <h3 className="mb-5 font-weight-normal pointer specialty-name fs-15">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary my-15"
                  onClick={() => this.handleLoadMore()}
                >
                  {this.props.language == "en" ? "Load more" : "Tải thêm"}
                </button>
              </div>

              {/* <div className="section-body">
                <Slider {...this.props.settings}>
                  {dataClinics &&
                    dataClinics.length > 0 &&
                    dataClinics.map((item, index) => {
                      return (
                        <div
                          className="section-customize clinic-child"
                          key={index}
                          onClick={() => this.handleViewDetailClinic(item)}
                        >
                          <div
                            className="bg-image section-medical-facility"
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                          ></div>
                          <div className="clinic-name">{item.name}</div>
                        </div>
                      );
                    })}
                </Slider>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
