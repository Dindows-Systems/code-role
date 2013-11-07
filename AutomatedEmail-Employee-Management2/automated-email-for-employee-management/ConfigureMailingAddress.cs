using System;
using System.IO;
using System.Windows.Forms;

namespace automated_email_for_employee_management
{
    public partial class ConfigureMailingAddress : Form
    {
        public ConfigureMailingAddress()
        {
            InitializeComponent();
        }

        private void btn_save_Click(object sender, EventArgs e)
        {
            if (tbxTo.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter Your Mailing Address");
                return;
            }
            if (!tbxTo.Text.Equals(string.Empty))
            {
                try
                {
                    new System.Net.Mail.MailAddress(tbxTo.Text);
                }
                catch (Exception ex)
                {

                    MessageBox.Show("Email Not Valid");
                    return;
                }
            }
            if (tbxMail.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter valid Credential Mailing Address");
                return;
            }
            if (!tbxMail.Text.Equals(string.Empty))
            {
                try
                {
                    new System.Net.Mail.MailAddress(tbxMail.Text);
                }
                catch (Exception ex)
                {

                    MessageBox.Show("Email Not Valid");
                    return;
                }
            }

            if (tbxPassword.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter Password of Above Mail Address");
                return;
            }

            if (!tbxTo.Text.Equals(string.Empty) && !tbxMail.Text.Equals(string.Empty) && !tbxPassword.Text.Equals(string.Empty))
            {
                try
                {
                    using (StreamWriter sw = File.CreateText(@"D:\CredentialInfo.txt"))
                    {
                        sw.WriteLine(tbxTo.Text);
                        sw.WriteLine(tbxMail.Text);
                        sw.WriteLine(tbxPassword.Text);
                    }
                    MessageBox.Show("Information Saved Successfully");
                    this.Close();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error");
                }
            }
        }
    }
}
