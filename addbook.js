const form = document.getElementById("forum");
const errorContainer = document.getElementById("errors");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	let errors = [];
	const els = document.getElementsByClassName("error-hint");

	for (const e of [...els]) {
		e.remove();
	}

	console.log(els.length);

	const f = Object.values(form);

	for (const input of f) {
		input.classList.remove("error");

		let error = null;

		switch (input.id) {
			case "fname":
				error = validateTytul(input.value);
				break;
			case "pname":
				error = validateISBN(input.value);
				break;
			case "ename":
				error = validateIloscEgzemplarzy(input.value);
				break;
			default:
				break;
		}
		if (error !== null) {
			console.log(error);

			input.classList.add("error");
			errors.push(error);

			const errorHint = document.createElement("span");
			errorHint.innerText = error;
			errorHint.classList.add("error-hint");
			input.after(errorHint);
		} else {
			input.classList.remove("error");
		}
	}

	console.log(errors);

	if (errors.length <= 0) {
		form.submit();
	} else {
		errorContainer.classList.add("active");
	}
});

function validateTytul(fname) {
	const isNotEmpty = tytul.length > 0;
	const isNotBig = tytul.length <= 128;

	const isValid = isNotEmpty && isNotBig;

	if (!isValid) {
		return "Tytuł jest nieprawidłowy";
	}

	return null;
}

function validateISBN(pname) {
	const isISBN = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm.test(kodisbn);

	isValid = isISBN;

	if (!isValid) {
		return "Kod ISBN jest nieprawidłowy";
	}

	return null;
}

function validateIloscEgzemplarzy(ename) {
	const isNotEmpty = iloscegzemplarzy.length > 0;

	const isValid = isNotEmpty;

	if (!isValid) {
		return "Nie podałeś liczby egzemplarzy";
	}

	return null;
}