
import nodemail from 'nodemailer';

export async function mailer(email: string, subject: string, text: string) {

	try {
		const transport = nodemail.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			//require Tls true
			auth: {
				user: "iamgaurav0786@gmail.com",
				pass: "mrzhxcrhjokkstwe",
			},
		});
		var mailOptions = {
			from: "iamgaurav0786@gmail.com",
			to: email,
			subject: subject,
			text: text
		};
		var mail_response: any = await transport.sendMail(mailOptions);
		// console.log(mail_response, "mailerr side");
		if(mail_response){
			return mail_response
		}

	} catch (error:any) {
		console.log("error:",error.message);
		return {mailError:error}

	}


}