const mongoose = require('mongoose');
const leaveSchema = mongoose.Schema({

	// requested_by: {
	// 	id: {
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref: "Post"
    //},
    // employeeName: String,
		// employeeData: String
  //},
	employeeName: {
		type: String,
		required: true
	},
	start_date: {
		type: String,
		required: true
	},
	end_date: {
		type: String,
		required: true
	},
	requested_at: {
		type: Date,
		default: Date.now
	},
	leave_type: {
			type: String,
      required: true
	},
	approval_status: {
			type: String,
			enum: ['PENDING', 'APPROVED', 'REJECTED'],
			default: 'PENDING'
	},
});

module.exports = mongoose.model('Leave', leaveSchema);
