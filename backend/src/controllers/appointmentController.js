const AppointmentModel = require("../models/Appointment");
const sgMail = require("@sendgrid/mail");
const config = require("../config");

// @desc Post Appointment
// @route POST /Appointment/create

const createAppointment = async (req, res) => {
  console.log("request for appointment");
  if (Object.keys(req.body).length === 0) {
    // no JSON body
    return res
      .status(400)
      .json({ error: "Bad Request", message: "The request body is empty" });
  }

  try {
    sgMail.setApiKey(config.SENDGRID_API_KEY);
  } catch (err) {
    console.log("setAPI Error");
    res.status(404).json(err);
  }

  try {
    const value = req.body.cal;
    const attachment = {
      filename: "invite.ics",
      name: "invite.ics",
      content: Buffer.from(value).toString("base64"),
      disposition: "attachment",
      type: "text/calendar; method=REQUEST",
    };

    const appointment = {
      from: req.body.sender,
      to: {
        email: req.body.user.email,
        name: req.body.user.name,
      },
      subject: req.body.subject,
      text: "Hello {req.body.user.name}",
      attachments: [attachment],
      template_id: "d-6c1f4e6bd3bf44108b096c6fc0974523",
    };
    // const newAppointment = appointment;
    console.log("see body here", appointment);
    await sgMail.send(appointment).then(() => {
      console.log("Email sent");
      return res.status(200).json("Email sent");
    });
  } catch (err) {
    console.log("sendMail Error");
    res.status(404).json(err);
  }
};

module.exports = {
  createAppointment,
};
