import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import DetailViewConfig from "./DataDetailConfig"
// import { getProfessionalDetails } from "../../../redux/actions/professionalUsers"
import { connect } from "react-redux"

class ListView extends React.Component {
//   componentDidMount() {
//     this.props.getProfessionalDetails(this.props.match.params.professional_id)
//   }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Professional Details"
          //   breadCrumbParent="Data List"
          //   breadCrumbActive="List View"
        />
        <Row>
          <Col sm="12">
            <DetailViewConfig />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default connect(null, { getProfessionalDetails })(ListView)