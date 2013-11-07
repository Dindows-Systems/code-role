namespace automated_email_for_employee_management
{
    partial class RegistrationForm
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
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.tbxDesignation = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.tbxPhone = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.tbxEmail = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.tbxName = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.btn_save = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.panel1);
            this.groupBox1.Location = new System.Drawing.Point(29, 23);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(600, 378);
            this.groupBox1.TabIndex = 3;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Register For AutoMail";
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.tbxDesignation);
            this.panel1.Controls.Add(this.label4);
            this.panel1.Controls.Add(this.tbxPhone);
            this.panel1.Controls.Add(this.label3);
            this.panel1.Controls.Add(this.tbxEmail);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Controls.Add(this.tbxName);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.btn_save);
            this.panel1.Location = new System.Drawing.Point(26, 46);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(552, 282);
            this.panel1.TabIndex = 1;
            // 
            // tbxDesignation
            // 
            this.tbxDesignation.Location = new System.Drawing.Point(122, 155);
            this.tbxDesignation.Name = "tbxDesignation";
            this.tbxDesignation.Size = new System.Drawing.Size(261, 20);
            this.tbxDesignation.TabIndex = 3;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(50, 158);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(63, 13);
            this.label4.TabIndex = 1;
            this.label4.Text = "Designation";
            // 
            // tbxPhone
            // 
            this.tbxPhone.Location = new System.Drawing.Point(122, 129);
            this.tbxPhone.Name = "tbxPhone";
            this.tbxPhone.Size = new System.Drawing.Size(261, 20);
            this.tbxPhone.TabIndex = 2;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(50, 132);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(38, 13);
            this.label3.TabIndex = 1;
            this.label3.Text = "Phone";
            // 
            // tbxEmail
            // 
            this.tbxEmail.Location = new System.Drawing.Point(122, 103);
            this.tbxEmail.Name = "tbxEmail";
            this.tbxEmail.Size = new System.Drawing.Size(261, 20);
            this.tbxEmail.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(50, 106);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(32, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "Email";
            // 
            // tbxName
            // 
            this.tbxName.Location = new System.Drawing.Point(122, 77);
            this.tbxName.Name = "tbxName";
            this.tbxName.Size = new System.Drawing.Size(261, 20);
            this.tbxName.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(50, 80);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(35, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Name";
            // 
            // btn_save
            // 
            this.btn_save.Location = new System.Drawing.Point(256, 196);
            this.btn_save.Name = "btn_save";
            this.btn_save.Size = new System.Drawing.Size(127, 42);
            this.btn_save.TabIndex = 4;
            this.btn_save.Text = "Save";
            this.btn_save.UseVisualStyleBackColor = true;
            this.btn_save.Click += new System.EventHandler(this.btn_save_Click);
            // 
            // RegistrationForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(659, 431);
            this.Controls.Add(this.groupBox1);
            this.Name = "RegistrationForm";
            this.Text = "RegistrationForm";
            this.groupBox1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TextBox tbxDesignation;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox tbxPhone;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox tbxEmail;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox tbxName;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btn_save;
    }
}