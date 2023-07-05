import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'



function GenerateReport(patientEmail) {
  html2canvas(document.querySelector("#invoiceCapture"), { 
    scale: 2 // Increase the scale to 2x
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 950],
      compression: true // enable compression
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
      
  });
}

const ReportModal = (props) => {
  return (
    <div>
      <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
        <div id="invoiceCapture">
          <div className='bg-secondary text-white text-center lh-sm'>
            <div className='pt-3 pb-3'>
              <h2 className='mb-1 fw-bold'>Lab Report NO:{props.info.reportID || ''}</h2><br />
              <h5 className='pt-0'>Suwa Medical Laboratory</h5>
            </div>
          </div>

          <div className='p-4'>
            
            <Row>
              <Col>
                <h4 className='fw-bold p-3'>Patient Details</h4>
                Patient name: {props.info.patientName || ''}<br/><br/>
                Patient Contact No: {props.info.patientCont || ''}<br/><br/>
                Patient Email: {props.info.patientEmail || ''}<br/>
              </Col>
              <Col className='mt-5'>
                Today Date: {new Date().toLocaleDateString()}<br/><br/>
                Date: {props.info.reportDate || ''}<br/><br/>
                Time: {props.info.reportTime || ''}<br/>
              </Col>
              
            </Row>
            <hr/>
            <Row>
              <Col>
                <h4 className='fw-bold p-3'>Lab Assistant Details</h4>
                Assistant Name: {props.info.assisName || ''}<br /><br/>
                Assistant Email: {props.info.assisEmail || ''}<br />
              </Col>
            </Row>
            <hr/>
            <Row className='p-3'>
            <h4 className='fw-bold pb-2'>Lab Test Details</h4>
              <table class="table table-bordered ">
                <tr>
                  <th>Lab Test</th>
                  <th>Test Result</th>
                  <th>Test Status</th>
                  <th>Technology</th>
                </tr>
                <tr>
                  <td>{props.info.patientTest || ''}</td>
                  <td>{props.info.testResult || ''}</td>
                  <td>{props.info.testStatus || ''}</td>
                  <td>{props.info.Technology || ''}</td>
                </tr>
              </table>

            </Row>
            <hr/>

            <Row>
              <h4 className='fw-bold p-3'>Interpretation</h4>
              <div className='border border-secondary  p-3 ml-3 mr-3'>
                <h6 class="font-monospace">{props.info.Interpretation || ''}</h6>
              </div>
            </Row>
            <hr/>

            <Row>
              <h4 className='fw-bold p-3'>Comment</h4>
              <div className='border border-secondary  p-3 ml-3 mr-3'>
                <h6 class="font-monospace">{props.info.comment || ''}</h6>
              </div>
            </Row>

            <hr/>
            <div className='text-center'>
             <h7 class="font-monospace text-muted">Suwa Medical laboratory - Lab report</h7>
             </div>
            <hr/>
          </div>
          

          {/* {props.info.patientName || ''}<br />
          {props.info.patientCont || ''}<br />
          {props.info.patientEmail || ''}<br />
          {props.info.patientTest || ''}<br />
          {props.info.assisName || ''}<br />
          {props.info.assisEmail || ''}<br />
          {props.info.reportID || ''}<br />
          {props.info.reportDate || ''}<br />
          {props.info.reportTime || ''}<br />
          {props.info.testResult || ''}<br />
          {props.info.Interpretation || ''}<br />
          {props.info.testStatus || ''}<br />
          {props.info.comment || ''}<br />
          {props.info.Technology || ''}<br /> */}
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
              {/* <Button variant="primary" className="d-block w-100" >
                <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" onClick={() => GenerateReport(props.info.patientEmail)}/>Send Invoice
              </Button> */}
            </Col>
            <Col md={6}>
              <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateReport}>
                <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
}

export default ReportModal;

