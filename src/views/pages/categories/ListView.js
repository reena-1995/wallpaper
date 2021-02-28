import React from "react"
import BreadCrumbs from "@components/breadcrumbs"
import { Row, Col } from "reactstrap"
import ListViewConfig from "./DataListConfig"

class ListView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="User"
          // breadCrumbParent="Data List"
          // breadCrumbActive="List View"
        />
        <Row>
          <Col sm="12">
            <ListViewConfig />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ListView
