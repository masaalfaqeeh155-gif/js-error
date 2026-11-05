const bookMarkForm = document.forms["bookMarkform"];

let sites = [];

if (localStorage.getItem("sites") != null) {
    sites = JSON.parse(localStorage.getItem("sites"));
}

// Validation
const validator = new JustValidate('[name="bookMarkform"]');

validator
    .addField('[name="name"]', [
        {
            rule: "required",
            errorMessage: "Name is required",
        },
        {
            rule: "minLength",
            value: 3,
            errorMessage: "Minimum 3 characters",
        },
        {
            rule: "maxLength",
            value: 15,
            errorMessage: "Maximum 15 characters",
        },
    ])
    .addField('[name="url"]', [
        {
            rule: "required",
            errorMessage: "URL is required",
        },
    ])
    .addField('[name="email"]', [
        {
            rule: "required",
            errorMessage: "Email is required",
        },
        {
            rule: "email",
            errorMessage: "Enter a valid email",
        },
    ])
    .addField('[name="password"]', [
        {
            rule: "required",
            errorMessage: "Password is required",
        },
        {
            rule: "minLength",
            value: 6,
            errorMessage: "Minimum 6 characters",
        },
    ]);

validator.onSuccess(() => {
    const site = {
        name: bookMarkForm.name.value,
        url: bookMarkForm.url.value,
        email: bookMarkForm.email.value,
        password: bookMarkForm.password.value,
    };

    sites.push(site);

    localStorage.setItem("sites", JSON.stringify(sites));

    Swal.fire({
        title: "Saved Successfully",
        icon: "success",
    });

    displaySites();

    bookMarkForm.reset();
});

function displaySites() {
    const result = sites
        .map((site, index) => {
            return `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${site.name}</td>
                    <td>${site.url}</td>
                    <td>${site.email}</td>
                    <td>${site.password}</td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="removeSite(${index})">
                            Delete
                        </button>
                        <a class="btn btn-info" href="details.html?ID=${index}">
                            Details
                        </a>
                    </td>
                </tr>
            `;
        })
        .join("");

    document.querySelector(".data").innerHTML = result;
}

function removeSite(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            sites.splice(index, 1);

            localStorage.setItem("sites", JSON.stringify(sites));

            displaySites();

            Swal.fire({
                title: "Deleted!",
                text: "The record has been deleted.",
                icon: "success",
            });
        }
    });
}

displaySites();
