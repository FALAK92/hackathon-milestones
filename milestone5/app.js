// get references to the form and display area
var Form = document.getElementById('resume');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadpdfButton = document.getElementById('download-pdf');
// Handle form submission
Form.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload
    // collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // save form data in local storage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
    // Generate the resume content dynamically
    var resumeHTML = "\n    <h2><b>Editable Resume</b></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    \n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n\n    \n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p> \n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URl with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    // Handle PDF download
    downloadpdfButton.addEventListener('click', function () {
        window.print(); //This will open the print dialog and allow the user to save as PDf
    });
    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', function () {
        var urlparams = new URLSearchParams(window.location.search);
        var username = urlparams.get('username');
        if (username) {
            var savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                var resumeData_1 = JSON.parse(savedResumeData);
                document.getElementById('username').value = username;
                document.getElementById('name').value = resumeData_1.name;
                document.getElementById('email').value = resumeData_1.email;
                document.getElementById('phone').value = resumeData_1.phone;
                document.getElementById('education').value = resumeData_1.education;
                document.getElementById('experience').value = resumeData_1.experience;
                document.getElementById('skills').value = resumeData_1.skills;
            }
            ;
        }
        ;
    });
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }
    else {
        console.error('The resume display element is missing.');
    }
});
