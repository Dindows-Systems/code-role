namespace automated_email_for_employee_management
{
    partial class Home
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
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.configurationToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.registrationToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.configureMailingAddressToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.btnSendMail = new System.Windows.Forms.Button();
            this.lblMessage = new System.Windows.Forms.Label();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.configurationToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(678, 24);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // configurationToolStripMenuItem
            // 
            this.configurationToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.registrationToolStripMenuItem,
            this.configureMailingAddressToolStripMenuItem});
            this.configurationToolStripMenuItem.Name = "configurationToolStripMenuItem";
            this.configurationToolStripMenuItem.Size = new System.Drawing.Size(61, 20);
            this.configurationToolStripMenuItem.Text = "Settings";
            // 
            // registrationToolStripMenuItem
            // 
            this.registrationToolStripMenuItem.Name = "registrationToolStripMenuItem";
            this.registrationToolStripMenuItem.Size = new System.Drawing.Size(215, 22);
            this.registrationToolStripMenuItem.Text = "Registration";
            this.registrationToolStripMenuItem.Click += new System.EventHandler(this.registrationToolStripMenuItem_Click);
            // 
            // configureMailingAddressToolStripMenuItem
            // 
            this.configureMailingAddressToolStripMenuItem.Name = "configureMailingAddressToolStripMenuItem";
            this.configureMailingAddressToolStripMenuItem.Size = new System.Drawing.Size(215, 22);
            this.configureMailingAddressToolStripMenuItem.Text = "Configure Mailing Address";
            this.configureMailingAddressToolStripMenuItem.Click += new System.EventHandler(this.configureMailingAddressToolStripMenuItem_Click);
            // 
            // btnSendMail
            // 
            this.btnSendMail.Location = new System.Drawing.Point(266, 162);
            this.btnSendMail.Name = "btnSendMail";
            this.btnSendMail.Size = new System.Drawing.Size(135, 69);
            this.btnSendMail.TabIndex = 1;
            this.btnSendMail.Text = "Send Mail";
            this.btnSendMail.UseVisualStyleBackColor = true;
            this.btnSendMail.Click += new System.EventHandler(this.btnSendMail_Click);
            // 
            // lblMessage
            // 
            this.lblMessage.AutoSize = true;
            this.lblMessage.Font = new System.Drawing.Font("Microsoft Sans Serif", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblMessage.ForeColor = System.Drawing.Color.Green;
            this.lblMessage.Location = new System.Drawing.Point(64, 278);
            this.lblMessage.Name = "lblMessage";
            this.lblMessage.Size = new System.Drawing.Size(64, 25);
            this.lblMessage.TabIndex = 2;
            this.lblMessage.Text = "label1";
            // 
            // Home
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(678, 354);
            this.Controls.Add(this.lblMessage);
            this.Controls.Add(this.btnSendMail);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Home";
            this.Text = "Home";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem configurationToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem registrationToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem configureMailingAddressToolStripMenuItem;
        private System.Windows.Forms.Button btnSendMail;
        private System.Windows.Forms.Label lblMessage;
    }
}