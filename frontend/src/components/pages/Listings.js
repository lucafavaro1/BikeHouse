import "../css/Listings.css";
import { Accordion, Button, Form, FormCheck } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

function Listings() {
  var colors = [
    { name: 'Red', id: 1 },
    { name: 'Green', id: 2 },
    { name: 'Blue', id: 3 },
    { name: 'Yellow', id: 4 }]

  return (
    <div className="listings">
      <div className="row">

        <div className="col-sm-2 filtersPanel">
          <p className="filtersTitle">Filters</p>
          <Accordion alwaysOpen="true" defaultActiveKey="0">

            <Accordion.Item eventKey="0">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
                <div className="row justify-content-center">
                  <div className="form-group col-sm-5">
                    <label for="minPrice">Min (&euro;)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      step="10"
                      defaultValue="0"
                      id="minPrice"
                      name="minPrice"
                      placeholder="min"></input>
                  </div>
                  <div className="form-group col-sm-5">
                    <label for="maxPrice">Max (&euro;)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      step="10"
                      defaultValue="1000"
                      id="maxPrice"
                      name="maxPrice"
                      placeholder="max"></input>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Frame Size</Accordion.Header>
              <Accordion.Body>
                <div className="row justify-content-center">
                  <div className="form-group col-sm-6">
                    <label for="minFrame">Min (cm)</label>
                    <input
                      className="textField"
                      type="number"
                      min="40"
                      max="70"
                      defaultValue="40"
                      id="minFrame"
                      name="minFrame"
                      placeholder="min"></input>
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="maxFrame">Max (cm)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      max="70"
                      defaultValue="70"
                      id="maxFrame"
                      name="maxFrame"
                      placeholder="max"></input>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Color</Accordion.Header>
              <Accordion.Body>
                <Multiselect
                  options={colors} // Options to display in the dropdown
                  placeholder="..."
                  displayValue="name" // Property name to display in the dropdown options
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Gender</Accordion.Header>
              <Accordion.Body>
                <Form.Select>
                  <option>Any</option>
                  <option>Female</option>
                  <option>Male</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Condition</Accordion.Header>
              <Accordion.Body>
                <Form className="text-left">
                  <Form.Check
                    inline
                    label="Brand New"
                    name="condition5"
                    type="checkbox"
                    id={"condition-brandNew"}
                  />
                  <br></br>
                  <Form.Check
                    inline
                    label="Good"
                    name="condition4"
                    type="checkbox"
                    id={"condition-good"}
                  />
                  <br></br>
                  <Form.Check
                    inline
                    label="Used"
                    name="condition3"
                    type="checkbox"
                    id={"condition-used"}
                  />
                  <br></br>
                  <Form.Check
                    inline
                    label="Poor"
                    name="condition2"
                    type="checkbox"
                    id={"condition-poor"}
                  />
                  <br></br>
                  <Form.Check
                    inline
                    label="Spare Parts"
                    name="condition1"
                    type="checkbox"
                    id={"condition-spare"}
                  />
                  <br></br>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Location</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Front Gears</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>Rear Gears</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>Brake Type</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet.
              </Accordion.Body>
            </Accordion.Item>


            <Accordion.Item eventKey="9">
              <Accordion.Header>Frame Material</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
              <Accordion.Header>Verification Level</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="fixed-bottom col-sm-2 applyBtnCol">
            <Button className="applyBtn">
              Apply
            </Button>
          </div>

        </div>

        <div className="col">

        </div>
      </div>
    </div >
  );
}

export default Listings;
