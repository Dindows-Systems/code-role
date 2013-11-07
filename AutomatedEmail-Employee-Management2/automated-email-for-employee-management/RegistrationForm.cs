using System;
using System.IO;
using System.Windows.Forms;

namespace automated_email_for_employee_management
{
    public partial class RegistrationForm : Form
    {
        public RegistrationForm()
        {
            InitializeComponent();
        }

        private void btn_save_Click(object sender, EventArgs e)
        {
            if (tbxName.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter Your Name");
                return;
            }

            if (tbxEmail.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter Your Mail Address");
                return;
            }

            if (!tbxEmail.Text.Equals(string.Empty))
            {
                try
                {
                    new System.Net.Mail.MailAddress(this.tbxEmail.Text);
                }
                catch (Exception ex)
                {

                    MessageBox.Show("Email Not Valid" + ex);
                    return;
                }
            }

            if (tbxPhone.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter Your Phone Number");
                return;
            }
            if (!tbxPhone.Text.Equals(string.Empty))
            {

                string[] numbers = { tbxPhone.Text };

                //string sPattern = @"01[5-9][0-9]{8}$";
                const string sPattern = @"((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}";

                foreach (string s in numbers)
                {
                    // System.Console.Write("{0,14}", s);

                    if (!System.Text.RegularExpressions.Regex.IsMatch(s, sPattern))
                    {
                        MessageBox.Show("Not a valid Phone Number");
                        return;
                    }
                }
            }
            if (tbxDesignation.Text.Equals(string.Empty))
            {
                MessageBox.Show("Please Enter Your Designation");
                return;
            }

            if (!tbxName.Text.Equals(string.Empty) && !tbxEmail.Text.Equals(string.Empty) && !tbxPhone.Text.Equals(string.Empty) && !tbxDesignation.Text.Equals(string.Empty))
            {
                try
                {
                    using (StreamWriter sw = File.CreateText(@"D:\info.txt"))
                    {
                        sw.WriteLine(tbxName.Text);
                        sw.WriteLine(tbxEmail.Text);
                        sw.WriteLine(tbxPhone.Text);
                        sw.WriteLine(tbxDesignation.Text);
                    }
                    MessageBox.Show("Registered Successfully");
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
