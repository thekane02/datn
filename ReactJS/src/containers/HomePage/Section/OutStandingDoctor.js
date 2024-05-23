import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors(4);
  }

  handleViewDetailDoctor = (e, doctor) => {
    e.preventDefault();
    window.location = `/detail-doctor/${doctor.id}`;
  };

  handleOnClickSeeMoreDoctor = (e) => {
    e.preventDefault();
    window.location = `/list-oustanding-doctor`;
  };

  handleLoadMore = async () => {
    let total = this.state.arrDoctors.length + 4;
    this.props.loadTopDoctors(total);
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrDoctors = arrDoctors
    //   .concat(arrDoctors)
    //   .concat(arrDoctors)
    //   .concat(arrDoctors)
    //   .concat(arrDoctors);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button
              className="btn-section"
              onClick={(e) => this.handleOnClickSeeMoreDoctor(e)}
            >
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>

          <div className="row">
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="col-lg-3 col-auto my-10">
                    <div
                      className="card-bs-custom pointer"
                      onClick={(e) => this.handleViewDetailDoctor(e, item)}
                    >
                      <figure
                        className="bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      ></figure>
                      <div className="card-body">
                        <h3 className="mb-5 font-weight-normal pointer specialty-name fs-15">
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </h3>
                        <div className="fs-15">
                          {item.Doctor_Infor &&
                          item.Doctor_Infor.specialtyData &&
                          item.Doctor_Infor.specialtyData.name
                            ? item.Doctor_Infor.specialtyData.name
                            : ""}
                        </div>
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
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>
                            {item.Doctor_Infor &&
                            item.Doctor_Infor.specialtyData &&
                            item.Doctor_Infor.specialtyData.name
                              ? item.Doctor_Infor.specialtyData.name
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctor(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
