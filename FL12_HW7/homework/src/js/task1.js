let userEmail = prompt('Enter your email', 'your@mail.com');
userEmail = userEmail ? userEmail.trim() : '';

const MIN_PASS_LENGTH = 5;
const MIN_NEW_PASS_LENGTH = 6;
const passwords = {
  'user@gmail.com': 'UserPass',
  'admin@gmail.com': 'AdminPass'
};

if (!userEmail.length) {
  alert('Canceled.');
} else if (userEmail.length < MIN_PASS_LENGTH) {
  alert("I don't know any emails having name length less than 5 symbols");
} else if (userEmail !== 'user@gmail.com' && userEmail !== 'admin@gmail.com') {
  alert('I don’t know you');
} else {
  let userPassword = prompt('Enter your password', '');
  userPassword = userPassword ? userPassword.trim() : '';

  if (!userPassword.length) {
    alert('Canceled.');
  } else if (userPassword !== passwords[userEmail]) {
    alert('Wrong password');
  } else {
    const changePassword = confirm('Do you want to change your password?');

    if (!changePassword) {
      alert('You have failed the change.');
    } else {
      let userOldPassword = prompt('Enter your old password', '');
      userOldPassword = userOldPassword ? userOldPassword.trim() : '';

      if (!userOldPassword.length) {
        alert('Canceled.');
      } else if (userOldPassword !== passwords[userEmail]) {
        alert('Wrong password');
      } else {
        let userNewPassword = prompt('Enter your new password', '');
        userNewPassword = userNewPassword ? userNewPassword.trim() : '';

        if (!userNewPassword.length) {
          alert('Canceled.');
        } else if (userNewPassword.length < MIN_NEW_PASS_LENGTH) {
          alert('It’s too short password. Sorry.');
        } else {
          let userNewPasswordConfirm = prompt('Re-enter your new password', '');
          userNewPasswordConfirm = userNewPasswordConfirm ? userNewPasswordConfirm.trim() : '';

          if (userNewPasswordConfirm !== userNewPassword) {
            alert('You wrote the wrong password.');
          } else {
            alert('You have successfully changed your password.');
          }
        }
      }
    }
  }
}
