import React, { Component } from "react"
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Media,
  Card,
  CardBody,
} from "reactstrap"
import { Star, Mail, Check, MapPin, Phone, X } from "react-feather"
//import Spinner from "../../../components/@vuexy/spinner/Fallback-spinner"
import { connect } from "react-redux"

class DataDetailConfig extends Component {
  componentDidMount() {
    //this.props.handleGetUsers();
  }
  render() {
    return (
      <Card>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <CardBody>
            <Row className="mx-0" col="12">
              <Col className="pl-0" sm="12">
                <Media className="d-sm-flex d-block">
                  <Media left>
                    <Media
                      className="rounded mr-2"
                      object
                      src="http://api-admin-dev.queall.com/assets/images/avatar/avatar.png"
                      //alt="Professional Users"
                      height="112"
                      width="112"
                    />
                  </Media>
                  <div className="w-100">
                    <h2>{this.props.professional_detail.user_name}</h2>
                    <div>
                      <Star fill="#FBC000" color="#fff" />
                      <Star fill="#FBC000" color="#fff" />
                      <Star fill="#FBC000" color="#fff" />
                      <Star fill="#FBC000" color="#fff" />
                      <Star fill="#797F91" color="#fff" />
                    </div>
                    <Row className="d-flex my-50">
                      <Col md="6" className="d-flex">
                        <Mail size="20" className="mr-50" />
                        <a
                          href={`mailto:${this.props.professional_detail.user_email}`}
                        >
                          {this.props.professional_detail.user_email}
                        </a>
                        {this.props.professional_detail
                          .user_is_email_visible ? (
                          <div
                            className="ml-3 d-flex"
                            style={{
                              color: "green",
                            }}
                          >
                            <Check size="20" />
                            Allow
                          </div>
                        ) : (
                          <div
                            style={{
                              color: "red",
                            }}
                            className="ml-3 d-flex"
                          >
                            <X size="20" />
                            Not allowed
                          </div>
                        )}
                      </Col>
                      <Col md="6" className=" d-flex">
                        <Phone size="20" className="mr-50" />
                        <a href="tel:+353 1 554 7888">+353 1 554 7888</a>
                        {this.props.professional_detail
                          .user_is_phone_no_visible ? (
                          <div
                            className="ml-3 d-flex"
                            style={{
                              color: "green",
                            }}
                          >
                            <Check size="20" />
                            Allow
                          </div>
                        ) : (
                          <div
                            style={{
                              color: "red",
                            }}
                            className="ml-3 d-flex"
                          >
                            <X size="20" />
                            Not allowed
                          </div>
                        )}
                      </Col>
                    </Row>
                    <div className="my-50 d-flex align-items-center">
                      <MapPin size="20" className="mr-50" />
                      {this.props.professional_detail.user_address}
                    </div>
                    <div className="text-dark mb-1">
                      {this.props.professional_detail.user_profile_summary}
                    </div>
                  </div>
                </Media>
              </Col>
            </Row>
          </CardBody>
        )}
      </Card>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    professional_detail: state.professionalUsers.details,
    loading: state.professionalUsers.loading,
  }
}

export default connect(mapStateToProps)(DataDetailConfig)