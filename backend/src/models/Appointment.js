const mongoose = require("mongoose");

// define fields and values that schema should contain

const appointmentModel = (fromEmail, fromName, toEmail, toName, subject,text, attachment) => {
  // template, substitutions, attachment, replyTo
  from = {
    email: fromEmail,
    name: fromName,
  },
  
  to = {
    email: toEmail,
    name: toName,
  },
  subject= subject,
  text=text
  // template_id = EmailType? EmailType[template] : null,

  // dynamic_template_data = substitutions? substitutions : null,

  attachments = [{
                  content: base64Content,
                  filename: "invite.ics",
                  type: "text/calendar",
                  // disposition: "attachment"
                }]

  // reply_to = replyTo?
  //           {
  //             email: replyTo,
  //             name: 'Reply',
  //           }:
  //           null
}
// const appointmentSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// });

// name of collection + schema that represents that model
// const FeedbackModel = mongoose.model("feedback", FeedbackSchema);

module.exports = appointmentModel;