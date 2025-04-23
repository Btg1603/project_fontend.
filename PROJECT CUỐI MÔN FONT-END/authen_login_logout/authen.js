const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



let users=[];

document.getElementById('registerForm').addEventListener('submit', function (e) {
	e.preventDefault();

	const firstName = document.getElementById('firstName').value.trim();
	const lastName = document.getElementById('lastName').value.trim();
	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmPassword').value;

	let isValid = true;



	document.querySelectorAll('.error').forEach(e => e.innerText = '');


	if (!firstName) {
		document.getElementById('firstNameError').innerText = 'First Name không được để trống';
		isValid = false;
	}

	
	if (!lastName) {
		document.getElementById('lastNameError').innerText = 'Last Name không được để trống';
		isValid = false;
	}


	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		document.getElementById('emailError').innerText = 'Email không đúng định dạng';
		isValid = false;
	} else {
		const users = JSON.parse(localStorage.getItem('users') || '[]');
		const isEmailExists = users.some(user => user.email === email);
		if (isEmailExists) {
			document.getElementById('emailError').innerText = 'Email đã tồn tại';
			isValid = false;
		}
	}

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
	if (!passwordRegex.test(password)) {
		document.getElementById('passwordError').innerText = 'Password phải có ít nhất 8 ký tự, gồm in hoa, in thường, và số';
		isValid = false;
	}

	if (password !== confirmPassword) {
		document.getElementById('confirmPasswordError').innerText = 'Confirm Password phải giống Password';
		isValid = false;
	}

	
	if (isValid) {
		const newUser = { firstName, lastName, email, password };
		users.push(newUser);
		localStorage.setItem('users', JSON.stringify(users));
		alert('Đăng ký thành công!');
		localStorage.setItem('authMode', 'login');
		window.location.href ='/authen_login_logout/';
	}
});



document.getElementById('loginForm').addEventListener('submit', function (e) {
	e.preventDefault();
});

