namespace automated_email_for_employee_management
{
    partial class ConfigureMailingAddress
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.label2 = new System.Windows.Forms.Label();
            this.tbxPassword = new System.Windows.Forms.TextBox();
            this.lblPassword = new System.Windows.Forms.Label();
            this.tbxMail = new System.Windows.Forms.TextBox();
            this.lblNetworkCredentialMail = new System.Windows.Forms.Label();
            this.tbxTo = new System.Windows.Forms.TextBox();
            this.lblTo = new System.Windows.Forms.Label();
            this.btn_save = new System.Windows.Forms.Button();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.label2);
            this.panel1.Controls.Add(this.tbxPassword);
            this.panel1.Controls.Add(this.lblPassword);
            this.panel1.Controls.Add(this.tbxMail);
            this.panel1.Controls.Add(this.lblNetworkCredentialMail);
            this.panel1.Controls.Add(this.tbxTo);
            this.panel1.Controls.Add(this.lblTo);
            this.panel1.Controls.Add(this.btn_save);
            this.panel1.Location = new System.Drawing.Point(33, 39);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(709, 237);
            this.panel1.TabIndex = 2;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.Red;
            this.label2.Location = new System.Drawing.Point(511, 102);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(183, 15);
            this.label2.TabIndex = 6;
            this.label2.Text = "Only Gmail Address is valid now.";
            // 
            // tbxPassword
            // 
            this.tbxPassword.Location = new System.Drawing.Point(235, 125);
            this.tbxPassword.Name = "tbxPassword";
            this.tbxPassword.Size = new System.Drawing.Size(261, 20);
            this.tbxPassword.TabIndex = 2;
            this.tbxPassword.UseSystemPasswordChar = true;
            // 
            // lblPassword
            // 
            this.lblPassword.AutoSize = true;
            this.lblPassword.Location = new System.Drawing.Point(50, 132);
            this.lblPassword.Name = "lblPassword";
            this.lblPassword.Size = new System.Drawing.Size(180, 13);
            this.lblPassword.TabIndex = 1;
            this.lblPassword.Text = "Password of the Above Mail Address";
            // 
            // tbxMail
            // 
            this.tbxMail.Location = new System.Drawing.Point(235, 99);
            this.tbxMail.Name = "tbxMail";
            this.tbxMail.Size = new System.Drawing.Size(261, 20);
            this.tbxMail.TabIndex = 1;
            // 
            // lblNetworkCredentialMail
            // 
            this.lblNetworkCredentialMail.AutoSize = true;
            this.lblNetworkCredentialMail.Location = new System.Drawing.Point(50, 106);
            this.lblNetworkCredentialMail.Name = "lblNetworkCredentialMail";
            this.lblNetworkCredentialMail.Size = new System.Drawing.Size(160, 13);
            this.lblNetworkCredentialMail.TabIndex = 1;
            this.lblNetworkCredentialMail.Text = "Network Credential Mail Address";
            // 
            // tbxTo
            // 
            this.tbxTo.Location = new System.Drawing.Point(235, 73);
            this.tbxTo.Name = "tbxTo";
            this.tbxTo.Size = new System.Drawing.Size(261, 20);
            this.tbxTo.TabIndex = 0;
            // 
            // lblTo
            // 
            this.lblTo.AutoSize = true;
            this.lblTo.Location = new System.Drawing.Point(50, 80);
            this.lblTo.Name = "lblTo";
            this.lblTo.Size = new System.Drawing.Size(103, 13);
            this.lblTo.TabIndex = 1;
            this.lblTo.Text = "Mailing Address (To)";
            // 
            // btn_save
            // 
            this.btn_save.Location = new System.Drawing.Point(369, 162);
            this.btn_save.Name = "btn_save";
            this.btn_save.Size = new System.Drawing.Size(127, 42);
            this.btn_save.TabIndex = 4;
            this.btn_save.Text = "Save";
            this.btn_save.UseVisualStyleBackColor = true;
            this.btn_save.Click += new System.EventHandler(this.btn_save_Click);
            // 
            // ConfigureMailingAddress
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(754, 374);
            this.Controls.Add(this.panel1);
            this.Name = "ConfigureMailingAddress";
            this.Text = "ConfigureMailingAddress";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TextBox tbxPassword;
        private System.Windows.Forms.Label lblPassword;
        private System.Windows.Forms.TextBox tbxMail;
        private System.Windows.Forms.Label lblNetworkCredentialMail;
        private System.Windows.Forms.TextBox tbxTo;
        private System.Windows.Forms.Label lblTo;
        private System.Windows.Forms.Button btn_save;
        private System.Windows.Forms.Label label2;
    }
}