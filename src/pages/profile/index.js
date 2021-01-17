import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { DashboardLayout } from "../../components/layout";
import { Edit, Warning } from "../../assets/svg";
import styles from "../styles.module.scss";

const Profile = () => {
  return (
    <DashboardLayout bg="#fff">
      <div className={styles.profile}>
        <div className={styles.profileEdit}>
          <Edit />
          <span>Edit Profile</span>
        </div>
        <div className={styles.profileWarning}>
          <div className={styles.profileWarningLeft}>
            <div className={styles.profileWarningLeftTop}>
              <Warning />
              <span>Verify Email</span>
            </div>
            <span className={styles.profileWarningLeftSub}>
              <span className={styles.link}> Open Gmail </span> to access the
              link sent to mail@gmail.com
            </span>
          </div>
          <div className={styles.profileWarningRight}>Resend Email</div>
        </div>
        <div className={styles.profilePersonal}>
          <div className={styles.profilePersonalTop}>
            <div className={styles.profilePersonalTopLeft}>JD</div>
            <div className={styles.profilePersonalTopRight}>
              <span className={styles.main}>Upload Profile picture</span>
              <span className={styles.sub}>
                Supported file format: PNG, JPG.
              </span>
              <span className={styles.link}>Upload</span>
            </div>
          </div>
          <div className={styles.profilePersonalEntry}>
            <span>Email</span>
            <span>Mail@gmail.com</span>
          </div>
          <div className={styles.profilePersonalEntry}>
            <span>Name</span>
            <span>John Doe</span>
          </div>
          <div className={styles.profilePersonalEntry}>
            <span>Password</span>
            <span>*********</span>
          </div>
        </div>
        <div className={styles.profileTwoFactor}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Two Step Authentication</span>
              <span className={styles.sub}>
                Enable two step authentication and keep your account extra
                secure
              </span>
            </div>
            <div className={styles.profileSectionRight}>Enable</div>
          </div>
        </div>
        <div className={styles.profilePreference}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Email Preferences</span>
              <span className={styles.sub}>
                Manage the email alerts you wish to receive
              </span>
            </div>
          </div>
          <div className={styles.profilePreferenceContent}>
            <div className={styles.profilePreferenceContentEntry}>
              <div className={styles.profilePreferenceContentEntryCheck} />
              <div className={styles.profilePreferenceContentEntryText}>
                <span className={styles.main}>Successful Payments</span>
                <span className={styles.sub}>
                  Receive alerts on every completed transaction
                </span>
              </div>
            </div>
            <div className={styles.profilePreferenceContentEntry}>
              <div className={styles.profilePreferenceContentEntryCheck} />
              <div className={styles.profilePreferenceContentEntryText}>
                <span className={styles.main}>Login Attempt</span>
                <span className={styles.sub}>
                  Receive alerts on every login session/attempt
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileBank}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Bank Accounts</span>
              <span className={styles.sub}>
                Add a primary bank account and trade easily{" "}
              </span>
            </div>
          </div>
          <div className={styles.profileBankContent}>
            <Input
              placeholder="e.g Access Bank"
              label="Bank Name"
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
            />
            <Input
              placeholder="e.g 0123456789"
              label="Account Number"
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
            />
            <Input
              label="BVN"
              placeholder="e.g 0123456789"
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
            />
          </div>
        </div>
        <div className={styles.profileSecurity}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Security</span>
              <span className={styles.sub}>Protect your account</span>
            </div>
          </div>
          <div className={styles.profileSecurityContent}>
            <Input
              placeholder="e.g Access Bank"
              label="Reset Password"
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <Button className={styles.deleteButton} text="Delete account" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
