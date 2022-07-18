<Row>
            <form>
              <div className="form-group row col-12">
                <div className="col-md-6">
                  <input
                    required
                    name="firstname"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    required
                    name="lastname"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <textarea
                  required
                  name="message"
                  className="form-control message"
                  placeholder="Message"
                />
              </div>

              <button
                className="btn btn-md btn-block btn-success"
                type="submit"
              >
                Send Message
              </button>
            </form>
            </Row> 
