

// get references to the form and display area

const Form =document.getElementById('resume') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer =document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement =document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadpdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
Form.addEventListener('submit' ,(event:Event) =>{
    event.preventDefault(); //prevent page reload

    // collect input values

    const username =(document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
// save form data in local storage with the username as the key
    const resumeData ={
        name,
        email,
        phone,
        education,
        experience,
        skills,
    };
    localStorage.setItem(username,JSON.stringify(resumeData)); //saving the data locally

// Generate the resume content dynamically
    const resumeHTML = `
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    
    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>

    
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p> 
    `;
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
// Generate a shareable URl with the username only
    const shareableURL = 
    `${window.location.origin}?username=${encodeURIComponent(username)}`;

// Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;

    // Handle PDF download
    downloadpdfButton.addEventListener('click', () =>{
        window.print(); //This will open the print dialog and allow the user to save as PDf
    });

    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', () =>{
        const urlparams = new URLSearchParams(window.location.search);
        const username = urlparams.get('username');
        if(username){
            const savedResumeData = localStorage.getItem(username);
            if(savedResumeData){
              const resumeData = JSON.parse(savedResumeData);
              (document.getElementById('username') as HTMLInputElement).value = username;
              (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
              (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
              (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
              (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
              (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
              (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;
            };
        };
        
    });
    

    if(resumeDisplayElement){
        resumeDisplayElement.innerHTML = resumeHTML;
    }else{
        console.error('The resume display element is missing.');
    }
});