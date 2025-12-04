const form = document.querySelector("#updateForm");
const updateBtn = form.querySelector("button[type='submit']");

form.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('input', function () {
        updateBtn.removeAttribute("disabled");
    });
});
