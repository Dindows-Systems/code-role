using System;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Windows.Forms;

namespace automated_email_for_employee_management
{
    public partial class auto_mail : Form
    {
        string _name, _mail, _phone, _des, _toMail, _credentialMail, _credentialPassword;
        int _createfile = 0;
        readonly SqlConnection _con = new SqlConnection(@"Data Source=PALASH\SQLEXPRESS;Initial Catalog=automated-email;User ID=sa;Password=test");
        readonly SqlCommand _cmd = new SqlCommand();
        public auto_mail()
        {
            InitializeComponent();
        }

        private void auto_mail_Load(object sender, EventArgs e)
        {
            
            if (CreateFile() != 0)
            {
                TextReader tw = new StreamReader(@"D:\info.txt");
                if ((_name = tw.ReadLine()) != null)
                {
                    try
                    {

                        //_name = tw.ReadLine();
                        _mail = tw.ReadLine();
                        _phone = tw.ReadLine();
                        _des = tw.ReadLine();

                        // Mail Already Sent or Not

                        TextReader date = new StreamReader(@"D:\date.txt");
                        {
                            DateTime today = Convert.ToDateTime(date.ReadLine());
                            if (today < Convert.ToDateTime(DateTime.Now.ToShortDateString()))
                            {
                                send_mail();
                                
                                insert_database();
                                date.Close();
                                TextWriter todaydate = new StreamWriter(@"D:\date.txt");
                                todaydate.WriteLine(DateTime.Now.ToShortDateString());
                                todaydate.Close();
                                // Send Mail
                                lblMessage.Text = "Mail Sent Successfully and Information Save in Database";
                            }
                            else
                            {
                                MessageBox.Show("Mail Already Sent");
                            }
                            date.Close();
                            tw.Close();
                        }
                    }
                    catch (Exception ex)
                    {

                        MessageBox.Show("Info Retrive Error !!!");
                    }
                }
                else
                {
                    MessageBox.Show("You are not register !!! Please Register");
                    tw.Close();
                }

            }
            else
            {

                MessageBox.Show("Problem in Creating File!!!");
            }
        }
        void send_mail()
        {
            var smtpClient = new SmtpClient();
            var message = new MailMessage();
            if (!File.Exists(@"D:\desme_logo.gif"))
            {
                const string localFilename = @"D:\desme_logo.gif";
                using (var client = new WebClient())
                {
                    client.DownloadFile("https://dl.dropbox.com/u/29122962/desme_logo.gif", localFilename);
                }
            }
            else
            {
                const string fileName = @"D:\desme_logo.gif";
                var myimage = new LinkedResource(fileName);

                // Create HTML view
                AlternateView htmlMail = AlternateView.CreateAlternateViewFromString(
                    @".........................." +
                    "<br />" +
                    "Thanks" +
                    "<br />" +
                    "<br />" +
                    "<br />" +
                    "<table border='1' cellpadding='0' cellspacing='0' style='width:350px;' width='350'>" +
                    "<br />" +
                    "<tbody>" +
                    "<tr>" +
                    "<td colspan='2' style='height:1px;'>" +
                    "<p style='margin-left:3.0pt;'>" +
                    "<img alt='' border='0' height='73' src='cid:companylogo' width='239' />" +
                    "</p>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td>" +
                    "<p style='margin-left:3.0pt;'>" +
                    "<strong>"
                    + _name + "</strong>" +
                    "<br />"
                    + _des + "</p>" +
                    "</td>" +
                    "<td rowspan='2' style='width:148px;'>" +
                    "<p align='right'>" +
                    "<a href='http://maps.yahoo.com/py/maps.py?Pyt=Tmap&amp;addr=150+N.+Michigan+Ave.&amp;csz=Chicago,+IL+60601&amp;country=us'><strong>desme Inc.</strong><br />" +
                    "150 N. Michigan Ave<br />Suite 2800<br />Chicago, IL 60601 </a><br /><br />phone: 888 354 0696<br />	fax: 877 395 1772<br />	mobile: "
                    + _phone + "</p>" +
                    "</td></tr><tr><td>" +
                    "<p style='margin-left:3.0pt;'><u><a href='mailto:"
                    + _mail + "' target='_blank'>" + _mail + "</a></u></p></td></tr></tbody></table><p>&nbsp;</p>"
                    , null, "text/html");
                myimage.ContentId = "companylogo";
                htmlMail.LinkedResources.Add(myimage);
                message.AlternateViews.Add(htmlMail);
            }
            try
            {
                TextReader tw = new StreamReader(@"D:\CredentialInfo.txt");
                _toMail = tw.ReadLine();
                _credentialMail = tw.ReadLine();
                _credentialPassword = tw.ReadLine();
                message.From = new MailAddress(_mail);
                if (_toMail != null) message.To.Add(_toMail);
                message.Subject = "Entry Time ( " + DateTime.Now.ToShortDateString() + " ) " + DateTime.Now.ToShortTimeString(); ;
                message.BodyEncoding = Encoding.UTF8;
                message.Priority = MailPriority.Normal;
                var cred = new NetworkCredential(_credentialMail, _credentialPassword);
                var mailClient = new SmtpClient("smtp.gmail.com", 587);
                mailClient.EnableSsl = true;
                mailClient.UseDefaultCredentials = false;
                mailClient.Credentials = cred;
                mailClient.Send(message);
                MessageBox.Show("Entry Mail Sent Successfully");
            }
            catch (SmtpException smtpEx)
            {
                MessageBox.Show("Error in Sending Entry Mail");
            }
        }

        void insert_database()
        {
            try
            {
                _con.Open();
                _cmd.Connection = _con;
                _cmd.CommandText = @"INSERT INTO MailInfo (Name,Email,Phone,Designation,MailDate,MailTime) VALUES ('" + _name + "','" + _mail + "','" + _phone + "','" + _des + "','" + DateTime.Now.ToShortDateString() + "','" + DateTime.Now.ToShortTimeString() + "')";
                _cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Inserting Error in database " + ex);
            }

        }

        int CreateFile()
        {
            if (!File.Exists(@"D:\date.txt"))
            {

                try
                {
                    using (File.Create(@"D:\date.txt"))
                    {
                    }
                    TextWriter dateS = new StreamWriter(@"D:\date.txt");
                    dateS.WriteLine(DateTime.Now.ToShortDateString());
                    dateS.Close();

                    _createfile = 1;
                }
                catch (Exception ex)
                {
                    _createfile = 0;
                }

            }

            if (!File.Exists(@"D:\info.txt"))
            {

                try
                {
                    using (File.Create(@"D:\info.txt"))
                    {
                    }
                    _createfile = 1;
                }
                catch (Exception ex)
                {
                    _createfile = 0;
                }
            }
            if (File.Exists(@"D:\info.txt") && File.Exists(@"D:\date.txt"))
            {
                _createfile = 1;
            }

            return _createfile;
        }

        private void registrationToolStripMenuItem_Click(object sender, EventArgs e)
        {
            var registrationForm = new RegistrationForm();
            registrationForm.ShowDialog();
        }

        private void configureMailingAddressToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ConfigureMailingAddress configureMailingAddress = new ConfigureMailingAddress();
            configureMailingAddress.ShowDialog();
        }
    }
}
