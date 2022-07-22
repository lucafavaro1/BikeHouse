// Controller to create an appointment and send a mail via SendGrid.
// @route /createAppointment

const sgMail = require("@sendgrid/mail");
const config = require("../config");

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
      to: req.body.user.email,
      subject: req.body.subject,
      text:
        "Thank you for your Booking!" +
        "\n\n" +
        "Dear " +
        req.body.user.name +
        ",\n" +
        "Your appointment with a BikeHouse specialist has been successfully booked. We look forward to talking with you!" +
        "\n\n" +
        "Best regards," +
        "\n" +
        "Your BikeHouse Team",
      attachments: [attachment],
    };
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
